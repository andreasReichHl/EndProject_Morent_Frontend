import { useState } from "react";
import LocationNav from "./LocationNav";

export default function LocationDate(props) {
    const [pickup, setPickup] = useState("");
    const [dropOff, setDropOff] = useState("");

    const location = [
        {
            headline: "Abholung",
            onChange: setPickup,
        },
        {
            headline: "Rückgabe",
            onChange: setDropOff,
        },
    ];

    return (
        <div className="flex flex-col lg:flex-row gap-2 md:gap-10 sm:p-2 md:p-5 p-2">
            {location.map((location, index) => (
                <LocationNav
                    key={index}
                    headline={location.headline}
                    onChange={(e) => location.onChange(e.target.value)}
                />
            ))}
        </div>
    );
}
