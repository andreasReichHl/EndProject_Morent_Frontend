import "../index.css";
import locationIcon from "../assets/images/location.svg";
import React, { useState } from "react";
import ListStoreElement from "./ListStoreElement";

export default function InputLocation({ headline, setLocation }) {
    const [isActive, setIsActive] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [dataList, setDataList] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const handleFocus = () => {
        setIsActive(true);
    };

    const handleBlur = () => {
        setIsActive(false);
    };

    const handleSelect = (id, name) => {
        setSelectedItem({ id, name });
        setLocation({ id, name });
        setInputValue(name);
        setIsActive(false); // Setze isActive auf false, wenn ein Element ausgewählt wird
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value); // Setze den Eingabewert
        setLoading(true);
        // Führe den Fetch-Aufruf aus
        fetch(
            `https://api.example.com/search?query=${encodeURIComponent(value)}`
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setLoading(false)
                if (data && data.length > 0) {
                    setDataList(data); // Setze die Daten im Zustand
                    setErrorMessage(""); // Leere die Fehlermeldung
                } else {
                    setDataList([]); // Setze die Daten auf ein leeres Array
                    setErrorMessage("Keine Ergebnisse gefunden."); // Setze die Fehlermeldung
                }
            })
            .catch((error) => {
                setLoading(false)
                console.error("Error fetching data:", error);
                setErrorMessage("Fehler beim Laden der Daten."); // Setze die Fehlermeldung
            });
    };

    const elementList = [
        { id: 1, name: "Morent", city: "Lübeck", distance: "23 km" },
        { id: 2, name: "Autohaus", city: "Berlin", distance: "120 km" },
        { id: 3, name: "CarRent", city: "Hamburg", distance: "60 km" },
        { id: 4, name: "QuickCars", city: "München", distance: "500 km" },
        { id: 5, name: "DriveEasy", city: "Frankfurt", distance: "220 km" },
        { id: 6, name: "RentMe", city: "Köln", distance: "450 km" },
        { id: 7, name: "SpeedyRental", city: "Düsseldorf", distance: "320 km" },
        { id: 8, name: "GoCar", city: "Stuttgart", distance: "410 km" },
        { id: 9, name: "EconoRent", city: "Leipzig", distance: "270 km" },
        { id: 10, name: "UrbanDrive", city: "Nürnberg", distance: "180 km" },
        { id: 11, name: "CityCar", city: "Hannover", distance: "130 km" },
    ];

    return (
        <div className="col-start-1 col-end-3">
            <h3 className="text-lg pl-2">{headline}</h3>
            <div className="flex flex-col">
                <div className="flex flex-col sm:pt-4 h-20">
                    <div className="flex items-center border p-3 rounded-lg">
                        <img
                            src={locationIcon}
                            alt="house"
                            className="w-6 h-6"
                        />
                        <input
                            type="text"
                            placeholder="Bitte eingeben"
                            className="ml-3 p-1 text-md flex-grow no-b focus:outline-none"
                            value={inputValue}
                            onFocus={handleFocus}
                            onBlur={(e) => {
                                if (
                                    !e.currentTarget.parentNode.contains(
                                        e.relatedTarget
                                    )
                                ) {
                                    handleBlur();
                                }
                            }}
                            onChange={handleInputChange}
                        />
                    </div>

                    {isActive && (
                        <div
                            className="absolute mt-16 w-1/3 bg-white border border-gray-300 rounded-lg h-96 shadow-lg"
                            onMouseDown={(e) => e.preventDefault()}
                        >
                            {isLoading ? ( // Überprüfe, ob die Daten geladen werden
                                <div className="flex items-center justify-center h-full">
                                    <span className="loading" />
                                </div>
                            ) : errorMessage ? ( // Überprüfe, ob es eine Fehlermeldung gibt
                                <div className="flex items-center justify-center h-full text-gray-500">
                                    {errorMessage}
                                </div>
                            ) : (
                                dataList.map((item) => (
                                    <ListStoreElement
                                        key={item.id}
                                        name={item.name}
                                        onSelect={() =>
                                            handleSelect(item.id, item.name)
                                        }
                                    />
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
