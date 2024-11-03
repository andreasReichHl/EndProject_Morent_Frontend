import React, { useState } from "react";
import burgerMenu from "../assets/images/menu.svg";
import arrow from "../assets/images/arrow.svg";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ filter }) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [price, setPrice] = useState(100);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    setIsOpen(false);
  };

  const toggleBurgerMenu = () => {
    setIsOpen(!isOpen);
    setIsCollapsed(false);
  };

  const seatOptions = [
    { label: "2 Sitze", value: 2 },
    { label: "4 Sitze", value: 4 },
    { label: "5 Sitze", value: 5 },
    { label: "7 Sitze", value: 7 },
  ];

  const [selectedFuelTypes, setSelectedFuelTypes] = useState([]);
  const [selectedVehicleTypes, setSelectedVehicleTypes] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleCheckboxChange = async (category, value) => {
    let selected, setSelected;

    if (category === "fuel") {
      selected = selectedFuelTypes;
      setSelected = setSelectedFuelTypes;
    } else if (category === "vehicle") {
      selected = selectedVehicleTypes;
      setSelected = setSelectedVehicleTypes;
    } else if (category === "seat") {
      selected = selectedSeats;
      setSelected = setSelectedSeats;
    }

    const updatedSelection = selected.includes(value)
      ? selected.filter((item) => item !== value)
      : [...selected, value];

    setSelected(updatedSelection);

    const locationData = JSON.parse(sessionStorage.getItem("locationId"));

    setTimeout(async () => {
      const locationData = JSON.parse(sessionStorage.getItem("locationId"));

      const newFilterData = {
        startDate: locationData.startDate,
        storeId: locationData.storeId,
        endDate: locationData.endDate,
        fuelType: category === "fuel" ? updatedSelection : selectedFuelTypes,
        carType:
          category === "vehicle" ? updatedSelection : selectedVehicleTypes,
        seats: category === "seat" ? updatedSelection : selectedSeats,
        pricePerDay: price,
      };

      try {
        const response = await fetch(
          "http://localhost:8080/api/v1/vehicles/exemplars?pageNo=0&recordCount=10",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newFilterData),
          }
        );
        const data = await response.json();
        navigate("/home", { state: data });
        console.log("API Response:", data);
        console.log(newFilterData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }, 0); // Kleines Timeout, um sicherzustellen, dass Zustand aktualisiert wird
  };

  return (
    <div>
      <button
        onClick={toggleBurgerMenu}
        className="w-16 lg:w-0 lg:hidden pl-4 pt-4 text-white focus:outline-none"
      >
        <img src={burgerMenu} alt="Burger Menu" />
      </button>

      <div
        className={`${isOpen ? "flex" : "hidden"} lg:flex flex-col ${
          isCollapsed ? "w-16" : "md:w-64"
        } h-screen transition-width duration-300  bg-white text-black ${
          isOpen && "fixed top-0 left-0 w-full sm:full z-50"
        }`}
      >
        <button
          className="text-black focus:outline-none h-20 pl-5"
          onClick={toggleSidebar}
        >
          {isCollapsed ? (
            <img src={burgerMenu} alt="menu" />
          ) : (
            <img src={arrow} alt="arrow" />
          )}
        </button>

        <nav className="flex-1">
          <ul className="space-y-4">
            {/* Fuel Types */}
            <li className="flex flex-col">
              {!isCollapsed && (
                <>
                  <span className="ml-4 mb-4">Kraftstoffart</span>
                  {filter.fuelType.map((fuel) => (
                    <div
                      key={fuel.value}
                      className="flex items-center mb-2 pl-8"
                    >
                      <input
                        type="checkbox"
                        id={fuel.value}
                        name="fuelType"
                        checked={selectedFuelTypes.includes(fuel.value)}
                        onChange={() =>
                          handleCheckboxChange("fuel", fuel.value)
                        }
                        className="mr-2"
                      />
                      <label htmlFor={fuel.value}>
                        {fuel.label} ({fuel.count})
                      </label>
                    </div>
                  ))}
                </>
              )}
            </li>

            {/* Vehicle Types */}
            <li className="flex flex-col">
              {!isCollapsed && (
                <>
                  <span className="ml-4 mb-4">Fahrzeugtyp</span>
                  {filter.cartypes.map((type) => (
                    <div
                      key={type.value}
                      className="flex items-center mb-2 pl-8"
                    >
                      <input
                        type="checkbox"
                        id={type.value}
                        name="vehicleType"
                        checked={selectedVehicleTypes.includes(type.value)}
                        onChange={() =>
                          handleCheckboxChange("vehicle", type.value)
                        }
                        className="mr-2"
                      />
                      <label htmlFor={type.value}>
                        {type.label} ({type.count})
                      </label>
                    </div>
                  ))}
                </>
              )}
            </li>

            {/* Seat Options */}
            <li className="flex flex-col">
              {!isCollapsed && (
                <>
                  <span className="ml-4 mb-4">Sitzplätze</span>
                  {seatOptions.map((seat) => (
                    <div
                      key={seat.value}
                      className="flex items-center mb-2 pl-8"
                    >
                      <input
                        type="checkbox"
                        id={`seat-${seat.value}`}
                        name="seatOptions"
                        checked={selectedSeats.includes(seat.value)}
                        onChange={() =>
                          handleCheckboxChange("seat", seat.value)
                        }
                        className="mr-2"
                      />
                      <label htmlFor={`seat-${seat.value}`}>{seat.label}</label>
                    </div>
                  ))}
                </>
              )}
            </li>

            {/* Price Slider */}
            <li className="flex flex-col">
              {!isCollapsed && (
                <>
                  <span className="ml-4 mb-4">Preis</span>
                  <div className="flex flex-col pl-4 pr-4">
                    <div className="flex justify-between">
                      <span className="">0 €</span>
                      <span className="ml-4">{price} €</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="150"
                      step="5"
                      value={price}
                      onChange={handlePriceChange}
                      className="w-full"
                    />
                  </div>
                </>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
