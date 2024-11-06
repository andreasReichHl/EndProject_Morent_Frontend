import { useState, useEffect } from "react";
import "./style.css";

export default function BillingInfo({
    title,
    info,
    step,
    userData,
    setUserData,
    setFormComplete,
}) {
    const [birthDate, setBirthDate] = useState({
        day: "",
        month: "",
        year: "",
    });

    const [errorMessages, setErrorMessages] = useState({
        birthDate: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        street: "",
        houseNumber: "",
        zipCode: "",
        city: "",
        country: "",
    });

    useEffect(() => {
        if (userData.birthDate) {
            const [year, month, day] = userData.birthDate.split("-");
            setBirthDate({
                day: day || "",
                month: month || "",
                year: year || "",
            });
        }
    }, [userData.birthDate]);

    const handleDateChange = (e) => {
        const { name, value } = e.target;
        setBirthDate((prev) => ({ ...prev, [name]: value }));

        const updatedDate = { ...birthDate, [name]: value };

        if (updatedDate.day && updatedDate.month && updatedDate.year) {
            setUserData({
                ...userData,
                birthDate: `${updatedDate.year}-${updatedDate.month}-${updatedDate.day}`,
            });
            setErrorMessages((prev) => ({ ...prev, birthDate: "" }));
        } else {
            setErrorMessages((prev) => ({
                ...prev,
                birthDate: "Bitte alle Felder des Geburtsdatums ausfüllen",
            }));
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name in userData.address) {
            setUserData((prevData) => ({
                ...prevData,
                address: { ...prevData.address, [name]: value },
            }));
        } else {
            setUserData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }

        if (value.trim() === "") {
            setErrorMessages((prev) => ({
                ...prev,
                [name]: `Bitte das Feld ausfüllen`,
            }));
        } else {
            setErrorMessages((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    const dayOptions = Array.from({ length: 31 }, (_, i) => i + 1);
    const monthOptions = Array.from({ length: 12 }, (_, i) => i + 1);
    const currentYear = new Date().getFullYear();
    const yearOptions = Array.from({ length: 100 }, (_, i) => currentYear - i);

    useEffect(() => {
        if (userData.address) {
            const updatedAddress = { ...userData.address };
            Object.keys(updatedAddress).forEach((key) => {
                if (updatedAddress[key] === "Unbekannt") {
                    updatedAddress[key] = "";
                }
            });
            setUserData((prevData) => ({
                ...prevData,
                address: updatedAddress,
            }));
        }
    }, []);

    useEffect(() => {
        const isFormComplete = [
            birthDate.day,
            birthDate.month,
            birthDate.year,
            userData.firstName,
            userData.lastName,
            userData.phoneNumber,
            userData.address?.street,
            userData.address?.houseNumber,
            userData.address?.zipCode,
            userData.address?.city,
            userData.address?.country,
        ].every(Boolean);

        setFormComplete(isFormComplete);
    }, [birthDate, userData]);

    return (
        <section className="border p-6 rounded-md shadow-md mb-4 flex flex-col">
            <div className="flex justify-between mb-4">
                <div>
                    <h2 className="text-2xl">{title}</h2>
                    <h3 className="mb-4">{info}</h3>
                </div>
                <p className="text-gray-400 text-sm">{step}</p>
            </div>
            <div className="grid lg:grid-cols-2 gap-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 col-span-2">
                    <div>
                        <p className="pb-1">Vorname</p>
                        <input
                            value={userData.firstName || ""}
                            disabled={userData.firstName}
                            type="text"
                            name="firstName"
                            placeholder="Vorname"
                            className="border rounded-md p-2 text-md w-full"
                            onChange={handleChange}
                        />
                        {errorMessages.firstName && (
                            <p className="errorMessage">
                                {errorMessages.firstName}
                            </p>
                        )}
                    </div>
                    <div>
                        <p className="pb-1">Nachname</p>
                        <input
                            value={userData.lastName || ""}
                            disabled={userData.lastName}
                            type="text"
                            name="lastName"
                            placeholder="Nachname"
                            className="border rounded-md p-2 text-md w-full"
                            onChange={handleChange}
                        />
                        {errorMessages.lastName && (
                            <p className="errorMessage">
                                {errorMessages.lastName}
                            </p>
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 col-span-2 gap-4">
                    <div>
                        <p className="pb-1">Geburtsdatum</p>
                        <div className="flex space-x-2">
                            <select
                                name="day"
                                value={birthDate.day}
                                onChange={handleDateChange}
                                className="border rounded-md p-2 px-6 text-md"
                            >
                                <option value="">Tag</option>
                                {dayOptions.map((day) => (
                                    <option
                                        key={day}
                                        value={String(day).padStart(2, "0")}
                                    >
                                        {String(day).padStart(2, 0)}
                                    </option>
                                ))}
                            </select>
                            <select
                                name="month"
                                value={birthDate.month}
                                onChange={handleDateChange}
                                className="border rounded-md p-2 px-6 text-md"
                            >
                                <option value="">Monat</option>
                                {monthOptions.map((month) => (
                                    <option
                                        key={month}
                                        value={String(month).padStart(2, "0")}
                                    >
                                        {String(month).padStart(2, 0)}
                                    </option>
                                ))}
                            </select>
                            <select
                                name="year"
                                value={birthDate.year}
                                onChange={handleDateChange}
                                className="border rounded-md p-2 px-6 text-md"
                            >
                                <option value="">Jahr</option>
                                {yearOptions.map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {errorMessages.birthDate && (
                            <p className="errorMessage">
                                {errorMessages.birthDate}
                            </p>
                        )}
                    </div>
                    <div>
                        <p className="pb-1">Telefonnummer/Mobilnummer</p>
                        <input
                            value={userData.phoneNumber || ""}
                            type="text"
                            name="phoneNumber"
                            placeholder="Telefonnummer"
                            className="border rounded-md p-2 text-md w-full"
                            onChange={handleChange}
                        />
                        {errorMessages.phoneNumber && (
                            <p className="errorMessage">
                                {errorMessages.phoneNumber}
                            </p>
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 col-span-2">
                    <div>
                        <p className="pb-1">Straße</p>
                        <input
                            value={userData.address?.street || ""}
                            type="text"
                            name="street"
                            placeholder="Straße"
                            className="border rounded-md p-2 text-md w-full"
                            onChange={handleChange}
                        />
                        {!userData.address?.street && (
                            <p className="errorMessages">
                                {errorMessages.street}
                            </p>
                        )}
                    </div>
                    <div>
                        <p className="pb-1">Hausnummer</p>
                        <input
                            value={userData.address?.houseNumber || ""}
                            type="text"
                            name="houseNumber"
                            placeholder="Hausnummer"
                            className="border rounded-md p-2 text-md w-full"
                            onChange={handleChange}
                        />
                        {!userData.address?.houseNumber && (
                            <p className="errorMessages">
                                {errorMessages.houseNumber}
                            </p>
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 col-span-2">
                    <div>
                        <p className="pb-1">PLZ</p>
                        <input
                            value={userData.address?.zipCode || ""}
                            type="text"
                            name="zipCode"
                            placeholder="PLZ"
                            className="border rounded-md p-2 text-md w-full"
                            onChange={handleChange}
                        />
                        {!userData.address?.zipCode && (
                            <p className="errorMessage">
                                {errorMessages.zipCode}
                            </p>
                        )}
                    </div>
                    <div>
                        <p className="pb-1">Stadt</p>
                        <input
                            value={userData.address?.city || ""}
                            type="text"
                            name="city"
                            placeholder="Stadt"
                            className="border rounded-md p-2 text-md w-full"
                            onChange={handleChange}
                        />
                        {!userData.address?.city && (
                            <p className="errorMessages">
                                {errorMessages.city}
                            </p>
                        )}
                    </div>
                </div>
                <div>
                    <p className="pb-1">Land</p>
                    <input
                        value={userData.address?.country || ""}
                        type="text"
                        name="country"
                        placeholder="Land"
                        className="border rounded-md p-2 text-md w-full"
                        onChange={handleChange}
                    />
                    {!userData.address?.country && (
                        <p className="errorMessages">{errorMessages.country}</p>
                    )}
                </div>
            </div>
        </section>
    );
}
