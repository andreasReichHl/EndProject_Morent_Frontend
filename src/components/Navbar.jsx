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
        <Link to={"/"} className="text-costumBlue text-2xl ml-2 font-medium">
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
          <Link className=" mr-4" to="/admin-panel/bookings">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="hover:fill-costumBlue fill-gray-600"
            >
              <path d="M20.1 9.22006C18.29 9.22006 17.55 7.94006 18.45 6.37006C18.97 5.46006 18.66 4.30006 17.75 3.78006L16.02 2.79006C15.23 2.32006 14.21 2.60006 13.74 3.39006L13.63 3.58006C12.73 5.15006 11.25 5.15006 10.34 3.58006L10.23 3.39006C9.78 2.60006 8.76 2.32006 7.97 2.79006L6.24 3.78006C5.33 4.30006 5.02 5.47006 5.54 6.38006C6.45 7.94006 5.71 9.22006 3.9 9.22006C2.86 9.22006 2 10.0701 2 11.1201V12.8801C2 13.9201 2.85 14.7801 3.9 14.7801C5.71 14.7801 6.45 16.0601 5.54 17.6301C5.02 18.5401 5.33 19.7001 6.24 20.2201L7.97 21.2101C8.76 21.6801 9.78 21.4001 10.25 20.6101L10.36 20.4201C11.26 18.8501 12.74 18.8501 13.65 20.4201L13.76 20.6101C14.23 21.4001 15.25 21.6801 16.04 21.2101L17.77 20.2201C18.68 19.7001 18.99 18.5301 18.47 17.6301C17.56 16.0601 18.3 14.7801 20.11 14.7801C21.15 14.7801 22.01 13.9301 22.01 12.8801V11.1201C22 10.0801 21.15 9.22006 20.1 9.22006ZM12 15.2501C10.21 15.2501 8.75 13.7901 8.75 12.0001C8.75 10.2101 10.21 8.75006 12 8.75006C13.79 8.75006 15.25 10.2101 15.25 12.0001C15.25 13.7901 13.79 15.2501 12 15.2501Z" />
            </svg>
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
