import { useContext, useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../hooks/AuthProvider";
import { useAuth } from "../hooks/AuthProvider";
import { jwtDecode } from "jwt-decode";
import logo from "/src/assets/images/logo.svg";
import userAvatar from "/src/assets/images/user.jpeg@3x.svg";

export default function Navbar() {
  const { isLoggedIn, logOut } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [firstLetter, setLetter] = useState("");
  const navigate = useNavigate();
  const auth = useAuth();
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const submitUserRequest = async () => {
      const token = sessionStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch("http://localhost:8080/api/v1/user", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Token im Header senden
            },
          });

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const result = await response.json();
          setUserData(result);
        } catch (error) {
          console.error("Error during booking:", error);
        }
      }
    };
    submitUserRequest();
  }, [isLoggedIn]);

  useEffect(() => {
    if (userData && userData.firstName) {
      let letter = userData.firstName.substring(0, 1); // Korrigiert: substring statt subString
      letter = letter.toUpperCase();
      setLetter(letter);
    }
  }, [userData]);

  const handleLogout = () => {
    auth.logout();
    navigate("/");
  };

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      if (
        decodedToken.scope !== "Admin" ||
        decodedToken.scope !== "Manager" ||
        decodedToken.scope !== "Accountant"
      )
        setIsAdmin(true);
      else setIsAdmin(false);
    }
  }, [token]);

  return (
    <div className="navbar bg-navBG bg-opacity-40 pr-5">
      <div className="flex-1">
        <Link to={"/"}>
          <img className="ml-2 w-24" src={logo} alt="logo" />
        </Link>
      </div>
      <div className="flex-none">
        {!isLoggedIn && (
          <Link className="btn btn-ghost mr-4 hover:bg-opacity-50" to="/signUp">
            Registrieren
          </Link>
        )}
        {isAdmin && (
          <Link
            className="btn btn-ghost mr-4 hover:bg-opacity-50"
            to="/admin-panel/bookings"
          >
            Admin Panel
          </Link>
        )}

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 h-10 rounded-full bg-white p-1">
              {isLoggedIn ? (
                <span className="text-2xl bg-slate-400 rounded-full text-white font-light w-8 h-8 flex items-center justify-center">
                  {firstLetter || "Z"}
                </span>
              ) : (
                <img
                  alt="User avatar"
                  src={userAvatar}
                  className="w-full h-full rounded-full"
                />
              )}
            </div>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/user/profil">Profil</Link>
            </li>
            {!isLoggedIn && (
              <li>
                <Link to="/login">Log In</Link>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <Link to="/user/dashboard">Dashboard</Link>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
