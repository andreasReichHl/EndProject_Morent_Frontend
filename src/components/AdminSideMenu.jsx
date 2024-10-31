import { NavLink } from "react-router-dom";

export default function AdminSideMenu() {

    return (
        <div className="min-w-full h-full">
            <ul className="menu bg-base-200 text-base-content min-h-full w-full p-4 text-lg">
                <h2 className="mt-5 mb-10 text-2xl text-center">Admin Panel</h2>
               
                <li>
                    <NavLink
                        to="/admin-panel/stores"
                        className={({ isActive }) =>
                            isActive ? "text-xl font-extrabold" : undefined
                        }
                    >
                        Stores
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/admin-panel/vehicles"
                        className={({ isActive }) =>
                            isActive ? "text-xl font-bold" : undefined
                        }
                    >
                        Vehicles
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/admin-panel/bookings"
                        className={({ isActive }) =>
                            isActive ? "text-xl font-bold" : undefined
                        }
                    >
                        Bookings
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/admin-panel/users"
                        className={({ isActive }) =>
                            isActive ? "text-xl font-bold" : undefined
                        }
                    >
                        Users
                    </NavLink>
                </li>
            </ul>
        </div>
)
}