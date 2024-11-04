import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../hooks/AuthProvider";

export default function Navbar() {
    const { isLoggedIn } = useContext(AuthContext);
    return (
        <div className="navbar bg-navBG bg-opacity-40">
            <div className="flex-1">
                <Link to={"/home"}><img className="ml-2 w-32" src="src/assets/images/logo.svg" /></Link>
                {/* <a className="btn btn-ghost text-3xl text-blue-700">MORENT</a> */}
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
                                    A
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
                        <li>
                            <Link to="/signUp">Registrieren</Link>
                        </li>
                        {!isLoggedIn && (
                            <li>
                                <Link to="/login">Log In</Link>
                            </li>
                        )}
                        {isLoggedIn && (
                            <li>
                                <a>Logout</a>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}
