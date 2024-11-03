import React, { useContext } from "react";
import { AuthContext } from "../hooks/AuthProvider"; // Stelle sicher, dass dieser Pfad korrekt ist

export default function ButtonRent() {
    const { isLoggedIn } = useContext(AuthContext);

    const handleRent = () => {
        if (!isLoggedIn) {
            alert("Bitte loggen Sie sich ein, um eine Buchung vorzunehmen.");
            return;
        }

        // Logik zum Buchen
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