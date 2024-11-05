import { NavLink } from "react-router-dom";
import { useState } from "react";
import burgerMenu from "../assets/images/menu.svg";
import arrow from "../assets/images/arrow.svg";

export default function AdminSideMenu() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    setIsOpen(false);
  };

  const toggleBurgerMenu = () => {
    setIsOpen(!isOpen);
    setIsCollapsed(false);
  };

  return (
    <div>
      <button
        onClick={toggleBurgerMenu}
        className="w-16 lg:w-0 lg:hidden pl-4 pt-4 text-white focus:outline-none"
      >
        <img src={burgerMenu} alt="Burger Menu" />
      </button>

      <div

        className={`${isOpen ? "flex" : "hidden"} lg:flex lg:flex-col ${

          isCollapsed ? "w-16" : "md:w-64"
        } h-screen transition-width duration-300  bg-base-200 text-black ${
          isOpen && "fixed top-0 left-0 w-full sm:full z-50"
        }`}
      >
        <button
          className="text-black focus:outline-none h-20 pl-5"
          onClick={toggleSidebar}
        >
          {isCollapsed ? (
            <img src={burgerMenu} alt="menu" />
          ) : (
            <img src={arrow} alt="arrow" />
          )}
        </button>

        <ul className="menu bg-base-200 text-base-content min-h-full w-full p-4 text-lg">
          {!isCollapsed && (
            <>
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
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
