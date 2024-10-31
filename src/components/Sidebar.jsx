import React, { useState } from "react";
import burgerMenu from "../assets/images/menu.svg";
// import { FaHome, FaUser, FaCog, FaEnvelope, FaBars } from 'react-icons/fa';

export default function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isOpen, setIsOpen] = useState(false); // Zustand für das Burger-Menü

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const toggleBurgerMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="">
            {/* Burger-Menü, das bei kleinen Bildschirmgrößen sichtbar ist */}
            <button
                onClick={toggleBurgerMenu}
                className="lg:hidden p-4 text-white focus:outline-none"
            >
                <img src={burgerMenu} alt="Burger Menu" />
            </button>

            {/* Sidebar */}
            <div
                className={`${isOpen ? "flex" : "hidden"} lg:flex flex-col ${
                    isCollapsed ? "w-16" : "md:w-64"
                } h-screen transition-width duration-300 bg-navBG text-white ${
                    isOpen && "top-0 left-0 w-full sm:full"
                }`}
            >
                <button
                    className="text-white focus:outline-none mb-4"
                    onClick={toggleSidebar}
                >
                    {isCollapsed ? "→" : "←"}
                </button>

                {/* Sidebar-Navigation */}
                <nav className="flex-1">
                    <ul className="space-y-4">
                        <li className="flex flex-col ">
                            {!isCollapsed && (
                                <>
                                    <span className="ml-4 mb-4">Filter</span>
                                    <li className="flex items-center pl-4">
                                        <input
                                            type="checkbox"
                                            id="typ1"
                                            name="typ"
                                            className="mr-2 size-4"
                                        />
                                        <label htmlFor="typ1">Benzin</label>
                                    </li>
                                </>
                            )}
                        </li>
                        <li className="flex items-center">
                            {!isCollapsed && <span className="ml-4">TYP</span>}
                        </li>
                        <li className="flex items-center">
                            {!isCollapsed && (
                                <span className="ml-4">Personen</span>
                            )}
                        </li>
                        <li className="flex items-center">
                            {!isCollapsed && (
                                <span className="ml-4">Price</span>
                            )}
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}
