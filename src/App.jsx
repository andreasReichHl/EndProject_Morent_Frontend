import { useState } from "react";
import AutoCard from "./components/AutoCard";
import LocationNav from "./components/LocationNav";
import LocationDate from "./components/LocationDate";
import Sidebar from "./components/Sidebar";

function App() {
    return (
        <>
            {/* <h1 className="text-8xl pb-24 mb-96">HOME</h1> */}
            <div className="flex flex-col sm:flex-row">
                {/* Sidebar links */}
                <Sidebar />

                {/* Hauptinhalt rechts */}
                <div className="flex flex-col flex-grow">
                    {/* LocationDate Komponente oben */}
                    <div>
                        <LocationDate />
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
