import React, { useContext } from "react";
import { AuthContext } from "../hooks/AuthProvider"; // Stelle sicher, dass dieser Pfad korrekt ist
import { useNavigate } from "react-router-dom";

export default function ButtonRent() {
    const { isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleRent = () => {
        if (!isLoggedIn) {
            navigate("/login");
            return;
        }
        navigate("/booking");
        console.log("Buchung wird durchgeführt...");
    };

    return (
        <div>
            <button
                onClick={handleRent}
                className="btn bg-blue-700 text-white px-7 py-2 rounded-md hover:bg-blue-800 transition duration-200"
            >
                Buchen
            </button>
        </div>
    );
}
