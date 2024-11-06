import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../hooks/AuthProvider";
import heartRedSvg from "../assets/images/vuesax/linear/heartRed.svg";
import ButtonRent from "./ButtonRent";

export default function AutoCard({
    auto,
    favorites,
    setFavoriteChange,
    onFavoriteChange,
}) {
    const { isLoggedIn } = useContext(AuthContext);
    const [message, setMessage] = useState("");
    const [isFavorite, setFavorite] = useState(false);

    useEffect(() => {
        if (favorites && favorites.vehicleList) {
            let foundFavorite = false;

            favorites.vehicleList.forEach((vehicle) => {
                if (vehicle.vehicleId === auto.vehicle.id) {
                    foundFavorite = true;
                }
            });
            setFavorite(foundFavorite);
        }
    }, [favorites, auto]);

    const handleHeartClick = async () => {
        if (!isLoggedIn) {
            setMessage(
                "Bitte loggen Sie sich ein, um dieses Auto zu Ihrer Favoritenliste hinzuzufügen."
            );
            setTimeout(() => setMessage(""), 3000);
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:8080/api/v1/favorite?vehicleId=${auto.vehicle.id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${sessionStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Fehler beim Hinzufügen zu den Favoriten.");
            }

            // setFavorite(true);
            setFavoriteChange(!onFavoriteChange);
        } catch (error) {
            console.error("Fehler beim Hinzufügen zu den Favoriten:", error);
        }
    };

    return (
        <section className="card p-6 bg-white max-w-sm md:max-w-md shadow-lg w-full rounded-lg">
            <div className="flex flex-row justify-between items-center mb-4">
                <div>
                    <h2 className="font-bold text-lg mb-1">
                        {auto.vehicle.brand} {auto.vehicle.model}
                    </h2>
                    <p className="text-gray-600">{auto.vehicle.carType}</p>
                </div>
                <img
                    src={
                        isFavorite
                            ? heartRedSvg
                            : "src/assets/images/vuesax/linear/heart.svg"
                    }
                    alt="heart"
                    className="w-8 h-8 cursor-pointer opacity-90"
                    onClick={handleHeartClick}
                />
            </div>
            <img
                src={auto.vehicle.thumbnailUrl || "src/assets/images/Golf.png"}
                alt="auto"
                className="w-full object-cover rounded mb-5"
            />

            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <img
                        src="src/assets/images/fuel.svg"
                        alt="fuel"
                        className="w-5 h-5"
                    />
                    <p className="text-gray-700">{auto.vehicle.fuelType}</p>
                </div>
                <div className="flex items-center gap-2">
                    <img
                        src="src/assets/images/transmission.svg"
                        alt="steering"
                        className="w-5 h-5"
                    />
                    <p className="text-gray-700">
                        {auto.vehicle.isAutomatic ? "Automatic" : "Manual"}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <img
                        src="src/assets/images/sits.svg"
                        alt="sits"
                        className="w-5 h-5"
                    />
                    <p className="text-gray-700">{auto.vehicle.seats}</p>
                </div>
            </div>

            <div className="flex justify-between items-center">
                <p className="text-lg">
                    <span className="font-bold text-blue-700">
                        {auto.pricePerDay} € /
                    </span>{" "}
                    Tag
                </p>
                <ButtonRent carId={auto.id} />
            </div>

            {message && ( // Hinweis wird nur angezeigt, wenn die Nachricht nicht leer ist
                <div className="absolute mt-20 text-red-500 text-sm">
                    {message}
                </div>
            )}
        </section>
    );
}
