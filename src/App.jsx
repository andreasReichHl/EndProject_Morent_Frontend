import { useState } from "react";
import AutoCard from "./components/AutoCard";
import LocationDate from "./components/LocationDate";
import Sidebar from "./components/Sidebar";
import { useLocation } from "react-router-dom";

function App() {
    const location = useLocation();
    const booking = location.state?.booking;

    const bookingData = {
        pickupLocation: booking.pickupLocation,
        dropOffLocation: booking.dropOffLocation,
        pickupDate: booking.pickupDate,
        dropOffDate: booking.dropOffDate,
    };

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
                        <LocationDate
                            bookingData={booking}
                        />
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
