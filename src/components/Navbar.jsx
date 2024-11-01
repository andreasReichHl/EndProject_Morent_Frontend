import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <div className="navbar bg-navBG bg-opacity-40">
            <div className="flex-1">
                <a className="btn btn-ghost text-3xl text-blue-700">MORENT</a>
            </div>
            <div className="flex-none">
                <img
                    src="src/assets/images/vuesax/bold/vuesax/bold/notification.svg"
                    alt="notification"
                    className=" mx-4"
                />

                <img
                    src="src/assets/images/vuesax/bold/setting-2.svg"
                    alt="settingBtn"
                    className="  mx-4"
                />

                <div className="dropdown dropdown-end">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle avatar"
                    >
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src="/src/assets/images/user.jpeg@3x.svg"
                            />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                    >
                        <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li>
                            <a>Settings</a>
                        </li>
                        <li>
                            <Link to="/login">Log In</Link>
                        </li>
                        <li>
                            <Link to="/signUp">Log In</Link>
                        </li>
                        <li>
                            <a>Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
