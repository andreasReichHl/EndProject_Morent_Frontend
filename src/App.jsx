import { useContext, useEffect, useState } from "react";
import AutoCard from "./components/AutoCard";
import Sidebar from "./components/Sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import SearchLandingPage from "./components/SearchLandingPage";
import { AuthContext } from "./hooks/AuthProvider";

function App() {
    const location = useLocation();
    const [isLoading, setLoading] = useState(false);
    const [responseData, setResponseData] = useState(null);
    const navigate = useNavigate();
    const [autos, setAutos] = useState([]);
    const { isLoggedIn } = useContext(AuthContext);
    const [favorites, setFavorites] = useState(null);
    const [onFavoriteChange, setFavoriteChange] = useState(false);

    useEffect(() => {
        const storedAutos = JSON.parse(sessionStorage.getItem("autos"));
        setAutos(storedAutos);
    }, []);

    {
        !autos && navigate("/");
    }

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

    useEffect(() => {
        handleHeartClick();
    }, [autos]);

    useEffect(() => {
        handleHeartClick();
    }, [autos, onFavoriteChange]);

    const handleHeartClick = async () => {
        if (!isLoggedIn) {
            // Optional: Aktion durchführen, wenn der Nutzer nicht eingeloggt ist
            console.log(
                "Bitte loggen Sie sich ein, um Favoriten hinzuzufügen."
            );
            return;
        }

        try {
            const response = await fetch(
                "http://localhost:8080/api/v1/favorite",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${sessionStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Fehler beim Laden der Favoriten.");
            }

            const result = await response.json();
            setFavorites(result);
        } catch (error) {
            console.error("Fehler beim Laden der Favoriten:", error);
        }
    };

    return (
        <>
            {/* <PopUpPages /> */}
            <div className="flex flex-col sm:flex-row">
                <Sidebar bookingData={autos} filter={responseData} />

                <div className="flex flex-col flex-grow">
                    <div className="px-5 mt-1">
                        <SearchLandingPage setAutos={setAutos} />

                        {/* <LocationDate bookingData={autos} /> */}
                    </div>

                    {/* <div className="flex flex-wrap gap-10 p-4"> */}
                    {/* changed layout from flex to grid */}
                    <div className="grid lg:grid-cols-3 p-4 gap-4">
                        {autos.map((auto, index) => (
                            <AutoCard
                                key={auto.id || index}
                                auto={auto}
                                favorites={favorites}
                                setFavoriteChange={setFavoriteChange}
                                onFavoriteChange={onFavoriteChange}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
export default App;
