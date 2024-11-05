import "../index.css";
import locationIcon from "../assets/images/location.svg";

import React, { useEffect, useState } from "react";
import InputLocation from "./InputLocation";
import { json, useNavigate } from "react-router-dom";
import plussSvg from "../assets/images/pluss.svg";


export default function SearchLandingPage({setAutos}) {

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

    useEffect(() => {
        const storedData = sessionStorage.getItem("locationId");
        if (storedData) {
            const history = JSON.parse(storedData);
            setPickUpDate(history.startDate || "");
            setDropOffUpDate(history.endDate || "");
            setPickUpLocation(history.pickUpLocation || "");
            setdropOffLocation(history.dropOffLocation || "");
            setDropOffId(history.dropOffId || "");
            setPickUpId(history.storeId || "");
            setLocationOk(!!history.dropOffId);
        }
    }, []);

    const navigate = useNavigate();

    function isDateInPast(pickUpDate, dropOffDate) {
        if (!pickUpDate && !dropOffDate) {
            setWrongDateMessage("Bitte beide Daten angeben");
            setDateOk(false);
            return;
        }


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
      setWrongDateMessage("Rückgabedatum darf nicht vor Abholdatum liegen");
      setDateOk(false);
    } else {
      setWrongDateMessage("");
      setDateOk(true);
    }
  }

  function checkLocationsId() {
    if (pickUpId) {
      setidErrorMessage("");

      if (isDropOffInput) {
        if (dropOffId) {
          setLocationOk(true);
        } else {
          setLocationOk(false);
          setidErrorMessage("Bitte wählen einen Rückgabeort aus");
        }
      } else {
        setDropOffId(pickUpId);
        setLocationOk(true);
      }
    } else {
      setLocationOk(false);
      setidErrorMessage("Bitte wählen Sie einen Abholort aus");
    }
  }

  const bookingData = {
    startDate: pickUpDate,
    storeId: pickUpId,
    endDate: dropOffDate,
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
    isDateInPast(pickUpDate, dropOffDate);
    checkLocationsId();

    if (isLocationOk && isDateOk && pickUpId && dropOffId) {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const locationData = {
      startDate: pickUpDate,
      storeId: pickUpId,
      endDate: dropOffDate,
      dropOffId: dropOffId,
      dropOffLocation: dropOffLocation,
      pickUpLocation: pickUpLocation,
    };

    setLoading(true);

    fetch("http://localhost:8080/api/v1/vehicles/exemplars", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

    }, [isLocationOk, isDateOk]);

    const checkSubmit = () => {
        isDateInPast(pickUpDate, dropOffDate);
        checkLocationsId();

        if (isLocationOk && isDateOk && pickUpId && dropOffId) {
            handleSubmit();
        }
    };

    const handleSubmit = () => {
        const locationData = {
            startDate: pickUpDate,
            storeId: pickUpId,
            endDate: dropOffDate,
            dropOffId: dropOffId,
            dropOffLocation: dropOffLocation,
            pickUpLocation: pickUpLocation,
        };

        setLoading(true);

        fetch("http://localhost:8080/api/v1/vehicles/exemplars", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bookingData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok -  get no exemplars");
                }
                setLoading(false);
                return response.json();
            })
            .then((data) => {
                sessionStorage.setItem(
                    "locationId",
                    JSON.stringify(locationData)
                );
                sessionStorage.setItem("autos", JSON.stringify(data));
                setAutos(data);
                navigate("/home", { state: data });
            })
            .catch((error) => {
                setLoading(false);
                console.error("Error during submission:", error);
            });
    };

    return (
        <div className="">
            <div className="searchBox bg-white rounded-md p-10 grid grid-cols-9 gap-6 shadow-lg">
                <div className="col-start-1 col-end-3">
                    <InputLocation
                        headline={
                            isDropOffInput ? "Abholung" : "Abholung & Rückgabe"
                        }
                        setLocation={setPickUpLocation}
                        setId={setPickUpId}
                        locationName={pickUpLocation}
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
                            locationName={dropOffLocation}
                        />
                        {/* <button

                            className="text-red-500 underline mt-2"
                            onClick={resetDropOffLocation}
                        >
                            Löschen
                        </button> */}
          </div>
        ) : (
          <div className="col-start-3 col-end-5 pt-16 pl-5 text-gray-500">
            <button className="flex items-center" onClick={handleVisibility}>
              <img src={plussSvg} alt="pluss" className="mr-4 t" />
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
                  value={pickUpDate}
                  onChange={(e) => setPickUpDate(e.target.value)}
                />
              </div>
              <p className="text-red-500 text-sm pt-2">{wrongDateMessage}</p>
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
                  value={dropOffDate}
                  onChange={(e) => setDropOffUpDate(e.target.value)}
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
            {isLoading ? <span className="loading" /> : "Autos anzeigen"}
          </button>
        </div>
      </div>
    </div>
  );
}
