import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../hooks/AuthProvider";

export default function Navbar() {
    const { isLoggedIn, logOut } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [firstLetter, setLetter] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const submitUserRequest = async () => {
            const token = sessionStorage.getItem("token");
            if (token) {
                try {
                    const response = await fetch(
                        "http://localhost:8080/api/v1/user",
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
    }, [userData]);

    const handleLogout = () => {
        logOut();
        navigate("/login");
    };

    return (
        <div className="navbar bg-navBG bg-opacity-40 pr-5">
            <div className="flex-1">
                {/* <Link to={"/home"}>
                    <img
                        className="ml-2 w-32"
                        src="src/assets/images/logo.svg"
                    />
                </Link> */}
                <a className="btn btn-ghost text-3xl text-blue-700">MORENT</a>
            </div>
            <div className="flex-none">
                <div className="text-1xl underline">
                    {!isLoggedIn && <Link to="/signUp">Registrieren</Link>}
                </div>
                <img
                    src="src/assets/images/vuesax/bold/vuesax/bold/notification.svg"
                    alt="notification"
                    className=" mx-4"
                />

                <div className="dropdown dropdown-end">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle avatar"
                    >
                        <div className="w-10 h-10 rounded-full bg-white p-1">
                            {isLoggedIn ? (
                                <span className="absolute text-2xl bg-slate-400 rounded-full text-white font-light w-8 h-8 flex items-center justify-center">
                                    {firstLetter ? firstLetter : "Z"}
                                </span>
                            ) : (
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="/src/assets/images/user.jpeg@3x.svg"
                                />
                            )}
                        </div>
                    </div>

                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                    >
                        <li>
                            <Link to="/profil">Profil</Link>
                        </li>
                        {!isLoggedIn && (
                            <li>
                                <Link to="/login">Log In</Link>
                            </li>
                        )}
                        {isLoggedIn && (
                            <li>
                                <Link to="/dashboard">Dashbord</Link>
                            </li>
                        )}
                        {isLoggedIn && (
                            <li>
                                <a onClick={handleLogout}>Logout</a>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}
