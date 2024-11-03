import { useEffect, useState } from "react";
import AutoCard from "./components/AutoCard";
import LocationDate from "./components/LocationDate";
import Sidebar from "./components/Sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { data } from "autoprefixer";
import SearchLandingPage from "./components/SearchLandingPage";

function App() {
    const location = useLocation();

    const [isLoading, setLoading] = useState(false);
    const [responseData, setResponseData] = useState(null);
    const navigate = useNavigate();
    const [autos, setAutos] = useState([]);

    useEffect(() => {
        const storedAutos = JSON.parse(sessionStorage.getItem("autos"));
        setAutos(storedAutos);
    }, []);

    {!autos && navigate("/")}

    useEffect(() => {
        handleSubmit();
    }, []);

    const handleSubmit = () => {
        setLoading(true);

        fetch("http://localhost:8080/api/v1/vehicles/count", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: sessionStorage.getItem("locationId"),
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

    if (!autos) {
        return (
            <h1 className="text-red-500 text-center">
                No booking data available.
            </h1>
        );
    }

    return (
        <>
            <div className="flex flex-col sm:flex-row">
                <Sidebar bookingData={autos} filter={responseData} />

                <div className="flex flex-col flex-grow">
                    <div className="px-5 mt-1">
                        <SearchLandingPage />
                        {/* <LocationDate bookingData={autos} /> */}
                    </div>

                    {/* <div className="flex flex-wrap gap-10 p-4"> */}
                    {/* changed layout from flex to grid */}
                    <div className="grid lg:grid-cols-3 p-4 gap-4">
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
