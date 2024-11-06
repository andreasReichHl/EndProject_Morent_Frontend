import "../index.css";
import locationIcon from "../assets/images/location.svg";

import React, { useEffect, useState } from "react";
import InputLocation from "./InputLocation";
import { useNavigate } from "react-router-dom";
import plussSvg from "../assets/images/pluss.svg";

export default function SearchLandingPage({ setAutos }) {
  const history = sessionStorage.getItem("locationId")
    ? JSON.parse(sessionStorage.getItem("locationId"))
    : {};

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
        setLoading(false);
        return response.json();
      })
      .then((data) => {
        sessionStorage.setItem("locationId", JSON.stringify(locationData));
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
    <div className="searchBox bg-white bg-opacity-80 rounded-md p-6 shadow-lg mb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-2">
        <div className="">
          <InputLocation
            headline={isDropOffInput ? "Abholung" : "Abholung & Rückgabe"}
            setLocation={setPickUpLocation}
            setId={setPickUpId}
            locationName={pickUpLocation}
          />
          <p className="text-red-500 text-sm pt-2 absolute -z-9">
            {idErrorMessage}
          </p>
        </div>
        {isDropOffInput ? (
          <div className="">
            <InputLocation
              headline={"Rückgabe"}
              setLocation={setdropOffLocation}
              setId={setDropOffId}
              setVisibility={setDropOffInput}
              isVisibilty={isDropOffInput}
              setidErrorMessage={setidErrorMessage}
              locationName={dropOffLocation}
            />
          </div>
        ) : (
          <div className="md:pt-14 md:p-5 p-2 text-gray-500">
            <button className="flex items-center" onClick={handleVisibility}>
              <img src={plussSvg} alt="pluss" className="mr-2" />
              Anderer Rückgabeort
            </button>
          </div>
        )}
        <div className="">
          <h3 className="lg:text-lg">Abholung</h3>
          <div className="flex flex-col">
            <div className="flex flex-col md:h-20 md:pt-4">
              <div className="flex items-center border md:p-3 p:1 rounded-lg ">
                <input
                  type="date"
                  placeholder="Bitte eingeben"
                  className="ml-3 p-1 text-md flex-grow no-b focus:outline-none w-full bg-white bg-opacity-0"
                  value={pickUpDate}
                  onChange={(e) => setPickUpDate(e.target.value)}
                />
              </div>
              <p className="text-red-500 text-sm pt-2">{wrongDateMessage}</p>
            </div>
          </div>
        </div>
        <div className="">
          <h3 className="md:text-lg">Rückgabe</h3>
          <div className="flex flex-col ">
            <div className="flex flex-col md:pt-4 h-20">
              <div className="flex items-center border md:p-3 p:1 rounded-lg">
                <input
                  type="date"
                  placeholder="Bitte eingeben"
                  className="ml-3 p-1 text-md flex-grow no-b focus:outline-none w-full bg-white bg-opacity-0"
                  value={dropOffDate}
                  onChange={(e) => setDropOffUpDate(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-end justify-center pb-2 col-span-1 md:col-span-2 xl:col-span-1">
          <button
          className="max-w-96 bg-costumBlue text-white  rounded-lg p-4 px-7 mt-2 disabled:bg-slate-500 disabled:cursor-not-allowed"
            onClick={checkSubmit}
          >
            {isLoading ? <span className="loading" /> : "Autos anzeigen"}
          </button>
        </div>
      </div>
    </div>
  );
}
