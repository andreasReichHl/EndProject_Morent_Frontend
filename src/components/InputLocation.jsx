import React, { useState, useEffect } from "react";
import houseSvg from "../assets/images/house.svg";
import locationIcon from "../assets/images/location.svg";
import "../index.css";
import ListStoreElement from "./ListStoreElement";
import deleteSvg from "../assets/images/delete.svg";

export default function InputLocation({
  headline,
  setLocation,
  setId,
  setVisibility,
  isVisibility,
  setidErrorMessage,
  locationName,
}) {
  const [isActive, setIsActive] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [dataList, setDataList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isSelected, setIsSelected] = useState(false);

  const handleFocus = () => setIsActive(true);
  const handleBlur = () => setIsActive(false);

  const handleSelect = (id, city) => {
    setIsSelected(true);
    setSelectedItem({ id, city });
    setLocation(city);
    setId(id);
    setInputValue(city);
    setIsActive(false);
    // Speichern in sessionStorage
    sessionStorage.setItem("selectedLocation", city);
    sessionStorage.setItem("selectedId", id);
  };

  const handleVisibility = () => setVisibility(false);

  const fetchData = async (searchTerm) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/store/geosearch?city=${encodeURIComponent(
          searchTerm
        )}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setLoading(false);

      if (data && data.length > 0) {
        setDataList(data);
        setErrorMessage("");
      } else {
        setDataList([]);
        setErrorMessage("Keine Ergebnisse gefunden.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Fetch error:", error);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    fetchData(value); // Fetch ausführen basierend auf der Benutzereingabe
  };

  useEffect(() => {
    if (locationName) {
      setInputValue(locationName); // Initialisiere inputValue mit locationName
      fetchData(locationName);
    }
  }, [locationName]);

  const handleClearInput = () => {
    setInputValue("");
    setId(null); // ID zurücksetzen
    setLocation(""); // Standort zurücksetzen
    setSelectedItem(null); // Ausgewähltes Element zurücksetzen
    setIsSelected(false); // Status zurücksetzen
    setDataList([]); // Vorherige Daten löschen
    setErrorMessage(""); // Fehlermeldung zurücksetzen
    sessionStorage.removeItem("selectedLocation"); // Wert aus sessionStorage entfernen
    sessionStorage.removeItem("selectedId"); // ID aus sessionStorage entfernen
  };

  return (
    <div className="">
      <h3 className="md:text-lg pl-2">{headline}</h3>
      <div className="flex flex-col">
        <div className="flex flex-col md:pt-4 md:h-20">
          <div className="flex items-center border p-1 md:p-3 rounded-lg">
            <img
              src={inputValue || locationName ? houseSvg : locationIcon}
              alt="icon"
              className="w-5 h-5"
            />
            <input
              type="text"
              placeholder="Bitte eingeben"
              className="ml-3 p-1 md:text-md flex-grow no-b focus:outline-none  bg-white bg-opacity-0"
              value={inputValue}
              onFocus={handleFocus}
              onBlur={(e) => {
                if (!e.currentTarget.parentNode.contains(e.relatedTarget)) {
                  handleBlur();
                }
              }}
              onChange={handleInputChange}
            />
            {(inputValue || locationName) && ( // Button anzeigen, wenn inputValue oder locationName nicht leer sind
              <button
                type="button"
                className="ml-2 p-1 text-white rounded"
                onClick={handleClearInput}
              >
                <img src={deleteSvg} alt="Clear input" />
              </button>
            )}
          </div>

          {isActive && (
            <div
              className="absolute mt-16 min-w-72 w-1/3 bg-white border border-gray-300 rounded-lg h-96 shadow-lg z-50"
              onMouseDown={(e) => e.preventDefault()}
            >
              {!isVisibility && headline === "Rückgabe" && (
                <div>
                  <button className="p-5" onClick={handleVisibility}>
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
                  <ListStoreElement
                    key={item.storeId}
                    name={item.name}
                    city={item.address.city}
                    address={item.address.street}
                    zipcode={item.address.zipCode}
                    houseNumber={item.address.houseNumber}
                    country={item.address.country}
                    distance={item.distance}
                    onSelect={() =>
                      handleSelect(item.storeId, item.address.city)
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
