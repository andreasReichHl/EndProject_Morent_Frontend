import { useEffect, useState } from "react";
import AutoCard from "./components/AutoCard";
import LocationDate from "./components/LocationDate";
import Sidebar from "./components/Sidebar";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const autos = location.state || {};
  const [isLoading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);

  /*   const bookingData = {
    storeId: booking.pickupLocation,
    startDate: booking.pickupDate,
    endDate: booking.dropOffDate,
  }; */

  /* useEffect(() => {
    handleSubmit();
  }, []);

  const handleSubmit = () => {
    setLoading(true);

    console.log(bookingData);
    fetch("http://localhost:8080/api/v1/vehicles/exemplar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData), // Buchungsdaten in den Body einfügen
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        setLoading(false);
        return response.json();
      })
      .then((data) => {
        setResponseData(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error during submission:", error);
        // Hier kannst du eine Fehlermeldung anzeigen, falls nötig
      });
  }; */

  console.log(responseData);

  if (!autos) {
    return (
      <h1 className="text-red-500 text-center">No booking data available.</h1>
    );
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row">
        <Sidebar bookingData={autos} />

        <div className="flex flex-col flex-grow">
          <div>
            <LocationDate bookingData={autos} />
          </div>

          <h1>autosssss</h1>
          <div className="flex flex-wrap gap-10 p-4">
            {autos.map((auto, index) => (
              <AutoCard key={auto.id || index} auto={auto} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
