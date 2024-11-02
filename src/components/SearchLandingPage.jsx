import "../index.css";
import locationIcon from "../assets/images/location.svg";

import React, { useEffect, useState } from "react";
import InputLocation from "./InputLocation";
import { json, useNavigate } from "react-router-dom";
import plussSvg from "../assets/images/pluss.svg";

export default function SearchLandingPage() {
    const [pickUpDate, setPickUpDate] = useState("");
    const [dropOffDate, setDropOffUpDate] = useState("");
    const [pickUpLocation, setPickUpLocation] = useState("");
    const [pickUpId, setPickUpId] = useState("");
    const [dropOffLocation, setdropOffLocation] = useState("");
    const [dropOffId, setDropOffId] = useState("");
    const [isDropOffInput, setDropOffInput] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [wrongDateMessage, setWrongDateMessage] = useState("");
    const [isDateOk, setDateOk] = useState(false);
    const [idErrorMessage, setidErrorMessage] = useState(false);
    const [isLocationOk, setLocationOk] = useState(false);
    const [carType, setCarType] = useState([]);
    const [fuelType, setFuelType] = useState([]);
    const [seats, setSeats] = useState([]);
    const [pricePerDay, setPricePerDay] = useState(1000.0);

    const navigate = useNavigate();

    function isDateInPast(pickUpDate, dropOffDate) {
        if (!pickUpDate && !dropOffDate) {
            setWrongDateMessage("Bitte beide Daten angeben");
            setDateOk(false);
            return;
        }

        const pickUp = new Date(pickUpDate);
        const dropOff = new Date(dropOffDate);
        const today = new Date();

        today.setHours(0, 0, 0, 0);
        pickUp.setHours(0, 0, 0, 0);
        dropOff.setHours(0, 0, 0, 0);

        if (pickUp < today) {
            setWrongDateMessage("Abholdatum liegt in der Vergangenheit");
            setDateOk(false);
        } else if (dropOff < pickUp) {
            setWrongDateMessage(
                "Rückgabedatum darf nicht vor Abholdatum liegen"
            );
            setDateOk(false);
        } else {
            setWrongDateMessage("");
            setDateOk(true);
        }
    }

    function checkLocationsId() {
        if (pickUpId && !isDropOffInput) {
            setidErrorMessage("");
            setLocationOk(true);
            if (!isDropOffInput) {
                setDropOffId(pickUpId);
            }
        } else if (pickUpId && isDropOffInput) {
            setLocationOk(false);
            setidErrorMessage("Bitte wählen einen Rückgabeort aus");
        } else {
            setLocationOk(false);
            setidErrorMessage("Bitte wählen einen Abholort");
        }
    }

    const bookingData = {
        startDate: pickUpDate,
        storeId: pickUpId,
        endDate: dropOffId,
        carType,
        fuelType,
        seats,
        pricePerDay,
    };

    const handleVisibility = () => {
        setDropOffInput(true);
    };

    useEffect(() => {
        if (isLocationOk && isDateOk) {
            handleSubmit();
        }
    }, [isLocationOk, isDateOk]);

    const checkSubmit = () => {
        isDateInPast(pickUpDate);
        checkLocationsId();

        if (isLocationOk && isDateOk) {
            handleSubmit();
        }
    };

    const handleSubmit = () => {
        const locationData = {
            startDate: pickUpDate,
            storeId: pickUpId,
            endDate: dropOffDate,
            dropOffId: dropOffId,
        };

        setLoading(true);
        fetch(
            "http://localhost:8080/api/v1/vehicles/exemplars?pageNo=0&recordCount=10",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bookingData), // Buchungsdaten in den Body einfügen
            }
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                setLoading(false);
                return response.json();
            })
            .then((data) => {
                // Navigiere zur Home-Seite und übergebe die Buchungsdaten
                sessionStorage.setItem(
                    "locationId",
                    JSON.stringify(locationData)
                );
                navigate("/home", { state: data });
            })
            .catch((error) => {
                setLoading(false);
                console.error("Error during submission:", error);
                // Hier kannst du eine Fehlermeldung anzeigen, falls nötig
            });
    };

    return (
        <div className="">
            <div className="searchBox bg-white rounded-md mx-16 p-10 grid grid-cols-9 gap-6 mt-10">
                <div className="col-start-1 col-end-3">
                    <InputLocation
                        headline={
                            isDropOffInput ? "Abholung" : "Abholung & Rückgabe"
                        }
                        setLocation={setPickUpLocation}
                        setId={setPickUpId}
                    />
                    <p className="text-red-500 text-sm pt-2 absolute -z-9">
                        {idErrorMessage}
                    </p>
                </div>
                {isDropOffInput ? (
                    <div className="col-start-3 col-end-5">
                        <InputLocation
                            headline={"Rückgabe"}
                            setLocation={setdropOffLocation}
                            setId={setDropOffId}
                            setVisibility={setDropOffInput}
                            isVisibilty={isDropOffInput}
                            setidErrorMessage={setidErrorMessage}
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
                            Anderer Rückgabeort
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
                            <p className="text-red-500 text-sm pt-2">
                                {wrongDateMessage}
                            </p>
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
                        onClick={checkSubmit}
                    >
                        {isLoading ? <span className="loading" /> : "Weiter"}
                    </button>
                </div>
            </div>
        </div>
    );
}
