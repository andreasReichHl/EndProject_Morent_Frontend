import "../index.css";
import locationIcon from "../assets/images/location.svg";

import React, { useEffect, useState } from "react";
import InputLocation from "./InputLocation";
import { json } from "react-router-dom";
import plussSvg from "../assets/images/pluss.svg";

export default function SearchLandingPage() {
    const [pickUpDate, setPickUpDate] = useState("");
    const [dropOffDate, setDropOffUpDate] = useState("");
    const [pickUpLocation, setPickUpLocation] = useState("");
    const [pickUpId, setPickUpId] = useState("");
    const [dropOffLocation, setdropOffLocation] = useState("");
    const [dropOffId, setDropOffId] = useState("");
    const [isDropOffInput, setDropOffInput] = useState(false);

    const bookingData = {
        pickUpDate: pickUpDate,
        dropOffDate: dropOffDate,
        pickUpId: pickUpId,
        dropOffId: dropOffId,
    };

    const handleVisibility = () => {
        setDropOffInput(true);
    };

    const handleSubmit = () => {
        if (isDropOffInput == false) {
            setDropOffId(pickUpId);
        }

        console.log(bookingData);
        // fetch("https://api.example.com/bookings", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(bookingData), // Buchungsdaten in den Body einfügen
        // })
        //     .then((response) => {
        //         if (!response.ok) {
        //             throw new Error("Network response was not ok");
        //         }
        //         return response.json();
        //     })
        //     .then((data) => {
        //         // Navigiere zur Home-Seite und übergebe die Buchungsdaten
        //         navigate("/home", { state: { booking: data } });
        //     })
        //     .catch((error) => {
        //         console.error("Error during submission:", error);
        //         // Hier kannst du eine Fehlermeldung anzeigen, falls nötig
        //     });
    };

    return (
        <div className="">
            <div className="searchBox bg-white rounded-md mx-16 p-10 grid grid-cols-9 gap-6 mt-10">
                <div className="col-start-1 col-end-3">
                    <InputLocation
                        headline={"Abholung Station"}
                        setLocation={setPickUpLocation}
                        setId={setPickUpId}
                    />
                </div>

                {isDropOffInput ? (
                    <div className="col-start-3 col-end-5">
                        <InputLocation
                            headline={"Rückgabe Station"}
                            setLocation={setdropOffLocation}
                            setId={setDropOffId}
                            setVisibility={setDropOffInput}
                            isVisibilty={isDropOffInput}
                        />
                    </div>
                ) : (
                    <div className="col-start-3 col-end-5 pt-16 pl-5 text-gray-500">
                        <button
                            className="flex items-center"
                            onClick={handleVisibility}
                        >
                            <img
                                src={plussSvg}
                                alt="pluss"
                                className="mr-4 t"
                            />
                            Rückgabeort hinzufügen
                        </button>
                    </div>
                )}
                <div className="col-start-5 col-end-7">
                    <h3 className="text-lg">Abholung</h3>
                    <div className="flex flex-col">
                        <div className="flex flex-col sm:pt-4 h-20">
                            <div className="flex items-center border p-3 rounded-lg">
                                <input
                                    type="date"
                                    placeholder="Bitte eingeben"
                                    className="ml-3 p-1 text-md flex-grow no-b focus:outline-none w-full"
                                    onChange={(e) =>
                                        setPickUpDate(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-start-7 col-end-9">
                    <h3 className="text-lg">Rückgabe</h3>
                    <div className="flex flex-col ">
                        <div className="flex flex-col sm:pt-4 h-20">
                            <div className="flex items-center border p-3 rounded-lg">
                                <input
                                    type="date"
                                    placeholder="Bitte eingeben"
                                    className="ml-3 p-1 text-md flex-grow no-b focus:outline-none w-full"
                                    onChange={(e) =>
                                        setDropOffUpDate(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-start-9 col-end-10 flex items-center justify-center">
                    <button
                        className="w-full bg-costumBlue text-white rounded-lg p-4 mt-9 disabled:bg-slate-500 disabled:cursor-not-allowed"
                        disabled={!pickUpDate || !dropOffDate || !pickUpId}
                        onClick={handleSubmit}
                    >
                        Weiter
                    </button>
                </div>
            </div>
        </div>
    );
}
