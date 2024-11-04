import React, { useState } from "react";
import "../popup.css";

function PopUpPages() {
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    // Funktion zum Anzeigen des Pop-ups
    const showPopup = () => {
        setIsPopupVisible(true);
    };

    // Funktion zum Schließen des Pop-ups
    const closePopup = () => {
        setIsPopupVisible(false);
    };

    return (
        <div className="App">
            <button onClick={showPopup} className="show-popup-btn">
                Pop-up anzeigen
            </button>

            {isPopupVisible && (
                <div className="overlay">
                    <div className="popup">
                        <p>Dies ist eine wichtige Nachricht!</p>
                        <button onClick={closePopup} className="close-btn">
                            Schließen
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PopUpPages;
