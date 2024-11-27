import { jwtDecode } from "jwt-decode";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext, useAuth } from "../hooks/AuthProvider";
import logo from "/src/assets/images/logo.svg";
import AdminPanelLogo from "/src/assets/images/vuesax/bold/setting-2.svg";

export default function Navbar() {
  const { isLoggedIn, logOut } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [firstLetter, setLetter] = useState("");
  const navigate = useNavigate();
  const auth = useAuth();
  const [imageProfile, setImageProfile] = useState(null);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const submitUserRequest = async () => {
      const token = sessionStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_BACKEND}/api/v1/user`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // Token im Header senden
              },
            }
          );

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
    if (userData && userData.profilePictureUrl)
      setImageProfile(userData.profilePictureUrl);
  }, [userData]);

  const handleLogout = () => {
    setIsAdmin(false);
    auth.logout();
    navigate("/");
  };

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      if (
        decodedToken.scope == "ADMIN" ||
        decodedToken.scope == "MANAGER" ||
        decodedToken.scope == "ACCOUNTANT"
      )
        setIsAdmin(true);
      else setIsAdmin(false);
    }
  }, [token]);

  return (
    <div className="navbar bg-navBG bg-opacity-40 pr-5">
      <div className="flex-1">
        <Link to={"/"} className="text-costumBlue text-2xl ml-2">
          {/* <img className="ml-2 w-24" src={logo} alt="logo" /> */}
          MORENT
        </Link>
      </div>
      <div className="flex-none">
        {!isLoggedIn && (
          <>
            <Link
              className="pr-1 pl-3 py-2  font-medium text-base text-gray-500 hover:text-gray-700 underline"
              to="/signUp"
            >
              Registrieren
            </Link>
            <p className="font-bold text-base text-gray-500">|</p>
            <Link
              className="pl-1 pr-3 py-2 mr-6  font-medium text-base text-gray-500 hover:text-gray-700 underline"
              to="/login"
            >
              Anmelden
            </Link>
          </>
        )}
        {isAdmin && (
          <Link
            className="btn btn-ghost mr-4 hover:bg-opacity-50"
            to="/admin-panel/bookings"
          >
            <img src={AdminPanelLogo} alt="settingLogo" />
          </Link>
        )}

        {isLoggedIn && (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="avatar">
              <div
                className="w-12 h-12 rounded-full 
               p-1"
              >
                {isLoggedIn &&
                  (imageProfile ? (
                    <img
                      alt="User Profile"
                      src={imageProfile}
                      className="w-full h-full rounded-full"
                    />
                  ) : (
                    <span className="text-2xl bg-slate-400 rounded-full text-white font-light w-10 h-10 flex items-center justify-center outline hover:outline-costumBlue">
                      {firstLetter || "Z"}
                    </span>
                  ))}
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow border-white"
            >
              <li>
                <Link to="/user/profil">Profil</Link>
              </li>
              {/* {!isLoggedIn && (
                <li>
                  <Link to="/login">Log In</Link>
                </li>
              )} */}
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
        )}
      </div>
    </div>
  );
}
