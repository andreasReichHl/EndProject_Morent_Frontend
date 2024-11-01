import "../index.css";
import locationIcon from "../assets/images/location.svg";
import React, { useEffect, useState } from "react";
import ListStoreElement from "./ListStoreElement";

export default function InputLocation({
    headline,
    setLocation,
    setId,
    setVisibility,
    isVisibility,
}) {
    const [isActive, setIsActive] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [dataList, setDataList] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleFocus = () => {
        setIsActive(true);
    };

    const handleBlur = () => {
        setIsActive(false);
    };

    const handleSelect = (id, city) => {
        setSelectedItem({ id, city });
        setLocation(city);
        setId(id);
        setInputValue(city);
        setIsActive(false);
    };

    const handleVisibility = () => {
        setVisibility(false);
    };

    const handleInputChange = async (e) => {
        const value = e.target.value;
        setInputValue(value); // Setze den Eingabewert
        setLoading(true);

        try {
            // Führe den Fetch-Aufruf aus
            const response = await fetch(
                `http://localhost:8080/api/v1/store/geosearch?city=${encodeURIComponent(
                    value
                )}`
            );

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            setLoading(false);

            if (data && data.length > 0) {
                setDataList(data); // Setze die Daten im Zustand
                setErrorMessage(""); // Leere die Fehlermeldung
            } else {
                setDataList([]); // Setze die Daten auf ein leeres Array
                setErrorMessage("Keine Ergebnisse gefunden."); // Setze die Fehlermeldung
            }
        } catch (error) {
            setLoading(false);
        }
    };

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
                            {!isVisibility &&
                                headline === "Rückgabe Station" && (
                                    <div>
                                        <button
                                            className="p-5"
                                            onClick={handleVisibility}
                                        >
                                            Rückgabe an Abholstation
                                        </button>
                                    </div>
                                )}
                            {isLoading ? (
                                <div className="flex items-center justify-center h-full">
                                    <span className="loading" />
                                </div>
                            ) : errorMessage ? (
                                <div className="flex items-center justify-center h-full text-gray-500">
                                    {errorMessage}
                                </div>
                            ) : (
                                dataList.map((item) => (
                                    // elementList.map((item) => (
                                    <ListStoreElement
                                        key={item.storeId}
                                        name={item.name}
                                        city={item.address.city}
                                        address={item.address.Street}
                                        zipcode={item.address.zipCode}
                                        houseNumber={item.address.houseNumber}
                                        country={item.address.country}
                                        onSelect={() =>
                                            handleSelect(
                                                item.storeId,
                                                item.address.city
                                            )
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
