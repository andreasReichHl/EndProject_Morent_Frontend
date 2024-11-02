import { useEffect, useState } from "react";
import AutoCard from "./components/AutoCard";
import LocationDate from "./components/LocationDate";
import Sidebar from "./components/Sidebar";
import { useLocation } from "react-router-dom";

function App() {
    const location = useLocation();
    const booking = location.state.booking;
    const [isLoading, setLoading] = useState(false);
    const [responseData, setResponseData] = useState(null);

    const bookingData = {
        storeId: booking.pickupLocation,
        startDate: booking.pickupDate,
        endDate: booking.dropOffDate,
    };

    useEffect(() => {
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
    };

    console.log(responseData);

    return (
        <>
            {/* <h1 className="text-8xl pb-24 mb-96">HOME</h1> */}
            <div className="flex flex-col sm:flex-row">
                {/* Sidebar links */}
                <Sidebar bookingData={booking} />

                {/* Hauptinhalt rechts */}
                <div className="flex flex-col flex-grow">
                    {/* LocationDate Komponente oben */}
                    <div>
                        <LocationDate bookingData={booking} />
                    </div>

                    {/* AutoCard-Komponenten in flex-wrap Anordnung darunter */}
                    <div className="flex flex-wrap gap-10 p-4">
                        <AutoCard />
                        <AutoCard />
                        <AutoCard />
                        <AutoCard />
                        <AutoCard />
                        <AutoCard />
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
