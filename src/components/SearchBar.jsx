import { useEffect, useState } from "react";
import penSvg from "../assets/images/pen.svg";

export default function SearchBar({ isSearchBar, setSearchBar }) {
    const [searchData, setSearchData] = useState({});

    useEffect(() => {
        const currentData = sessionStorage.getItem("locationId");

        if (currentData) {
            setSearchData(JSON.parse(currentData));
        }
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("de-DE", {
            day: "2-digit",
            month: "short",
        });
    };

    const handleClick = () => {
        setSearchBar(!isSearchBar);
    };

    return (
        <>
            <div
                className="bg-white rounded-lg shadow-sm px-10 py-4 w-max flex mt-4"
                onClick={handleClick}
            >
                <div className="flex gap-10">
                    <div className="text-lg">
                        <span>Abholung</span>
                        <div>
                            {searchData.pickUpLocation} |{" "}
                            {formatDate(searchData.startDate)}
                        </div>
                    </div>
                    <div>
                        <div className="text-lg">
                            <div>
                                <span>Rückgabe</span>
                            </div>
                            {searchData.dropOffLocation ||
                                searchData.pickUpLocation}{" "}
                            | {formatDate(searchData.endDate)}
                        </div>
                    </div>
                    <div className="flex items-center">
                        <img src={penSvg} alt="pen" />
                    </div>
                </div>
            </div>
        </>
    );
}
