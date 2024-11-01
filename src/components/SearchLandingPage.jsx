import "../index.css";
import locationIcon from "../assets/images/location.svg";

import React, { useEffect, useState } from "react";
import InputLocation from "./InputLocation";

export default function SearchLandingPage() {
    const [isActive, setIsActive] = useState(false); // Zustand für den aktiven Status

    const handleFocus = () => {
        setIsActive(true); // Setze den Status auf aktiv, wenn das Feld fokussiert ist
    };

    const handleBlur = () => {
        setIsActive(false); // Setze den Status auf nicht aktiv, wenn das Feld nicht mehr fokussiert ist
    };

    const [pickupLocation, setPickupLocation] = useState({
        location: "",
        pickUpId: "",
    });
    const [dropOffLocation, setdropOffLocation] = useState({
        location: "",
        dropOffId: "",
    });

    useEffect(() => {
        if (!dropOffLocation) {
            setdropOffLocation(pickupLocation);
        }
    }, []);

    console.log(pickupLocation);
    console.log(dropOffLocation);
    return (
        <div className="">
            <div className="searchBox bg-white rounded-md mx-16 p-10 grid grid-cols-9 gap-6 mt-10">
                <div className="col-start-1 col-end-3">
                    <InputLocation
                        headline={"Abholung Station"}
                        setLocation={setPickupLocation}
                    />
                </div>{" "}
                <div className="col-start-3 col-end-5">
                    <h3 className="text-lg">Abholung</h3>
                    <div className="flex flex-col">
                        <div className="flex flex-col sm:pt-4 h-20">
                            <div className="flex items-center border p-3 rounded-lg">
                                <input
                                    type="date"
                                    placeholder="Bitte eingeben"
                                    className="ml-3 p-1 text-md flex-grow no-b focus:outline-none w-full"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-start-5 col-end-7">
                    <InputLocation
                        headline={"Rückgabe Station"}
                        setLocation={setdropOffLocation}
                    />
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
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-start-9 col-end-10 flex items-center justify-center">
                    <button
                        className="w-full bg-costumBlue text-white rounded-lg p-4 mt-9 disabled:bg-slate-500 disabled:cursor-not-allowed"
                        disabled={pickupLocation || dropOffLocation}
                    >
                        Weiter
                    </button>
                </div>
            </div>
        </div>
    );
}
