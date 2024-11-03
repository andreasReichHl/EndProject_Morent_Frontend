import React, { useContext } from "react";
// Angenommen, du hast einen Authentifizierungskontext
import { AuthContext } from "../hooks/AuthProvider"; // Pfad zu deinem Auth-Kontext

export default function ButtonRent() {
    const { isLoggedIn } = useContext(AuthContext); // Verwende den Auth-Kontext, um den Anmeldestatus zu prüfen

    const handleRent = () => {
        if (!isLoggedIn) {
            // Hier kannst du den Benutzer zu einer Login-Seite umleiten oder eine Fehlermeldung anzeigen
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
