import { useEffect, useState } from "react";
import BillingInfo from "../components/Billing/BillingInfo";
import ConfirmationInfo from "../components/Billing/ConfirmationInfo";
import PaymentInfo from "../components/Billing/PaymentInfo";
import PickupReturnCard from "../components/Billing/PickupReturnCard";
import RentalSummary from "../components/Billing/RentalSummary";
import { useLocation, useNavigate } from "react-router-dom";
import backSvg from "../assets/images/vuesax/linear/back.svg";

export default function BookingPage() {
    const [isLoading, setLoading] = useState(false);
    const [bookingData, setBookingData] = useState(null);
    const [unpackedData, setUnpackedata] = useState(null);
    const [bookingRequest, setBookingRequest] = useState(null);
    const [userData, setUserData] = useState(null);
    const [isFormComplete, setFormComplete] = useState(false);
    const [isDirective, setDirective] = useState(false);
    const carState = useLocation();
    const [errorMessageTerm, setErrorMessagesTerm] = useState("");
    const [userProfileRequest, setUserProfileRequest] = useState(null);
    const [isSaveAddress, setSaveAddress] = useState(false);
    const carId = carState.state;
    const navigate = useNavigate();

    // first fetch for bookingdata

    useEffect(() => {
        const packedData = sessionStorage.getItem("locationId");
        if (packedData) {
            const data = JSON.parse(packedData);
            setUnpackedata(data);
            const bookingRequest = {
                vehicleExemplarId: carId,
                pickUpLocationId: data.storeId,
                pickUpDate: data.startDate,
                dropOffLocationId: data.dropOffId,
                planedDropOffDate: data.endDate,
            };
            setBookingRequest(bookingRequest);
        }
    }, [carId]);

    useEffect(() => {
        if (userData && userData.address) {
            const userProfileRequest = {
                firstName: userData.firstName,
                lastName: userData.lastName,
                birthDate: userData.birthDate,
                phoneNumber: userData.phoneNumber,
                street: userData.address.street,
                houseNumber: userData.address.houseNumber,
                zipCode: userData.address.zipCode,
                city: userData.address.city,
                country: userData.address.country,
            };
            setUserProfileRequest(userProfileRequest);
        }
    }, [userData]);

    useEffect(() => {
        const submitBookingRequest = async () => {
            if (bookingRequest) {
                try {
                    const response = await fetch(
                        "http://localhost:8080/api/v1/booking/info",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(bookingRequest),
                        }
                    );

                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    const result = await response.json();
                    setBookingData(result);
                } catch (error) {
                    console.error("Error during get Bookingdata:", error);
                }
            }
        };
        submitBookingRequest();
    }, [bookingRequest]);

    // get user data
    useEffect(() => {
        const submitUserRequest = async () => {
            const token = sessionStorage.getItem("token");
            if (bookingData) {
                try {
                    const response = await fetch(
                        "http://localhost:8080/api/v1/user",
                        {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );

                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    const result = await response.json();
                    setUserData(result);
                } catch (error) {
                    console.error("Error during booking:", error);
                }
            }
        };
        submitUserRequest();
    }, [bookingData]);

    const checkSubmit = async () => {
        if (isFormComplete && isDirective) {
            setLoading(true);
            setErrorMessagesTerm("");
            try {
                // Erster Request zum Aktualisieren der Benutzerdaten
                if (isSaveAddress) {
                    try {
                        const postResponse = await fetch(
                            "http://localhost:8080/api/v1/user/update",
                            {
                                method: "PUT",
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${sessionStorage.getItem(
                                        "token"
                                    )}`,
                                },
                                body: JSON.stringify(userProfileRequest),
                            }
                        );

                        if (!postResponse.ok) {
                            const errorData = await postResponse.json();
                            setErrorMessagesTerm(
                                errorData.message ||
                                    "Fehler beim Aktualisieren der Benutzerdaten"
                            );
                            console.error(
                                "Fehler beim Aktualisieren der Benutzerdaten"
                            );
                        } else {
                            const postResult = await postResponse.json();
                            console.log(
                                "Benutzerdaten erfolgreich aktualisiert:",
                                postResult
                            );
                        }
                    } catch (error) {
                        console.error(
                            "Fehler beim Aktualisieren der Benutzerdaten:",
                            error
                        );
                    }
                }

                // Zweiter Request zur Buchungsbestätigung
                try {
                    const putResponse = await fetch(
                        "http://localhost:8080/api/v1/booking",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${sessionStorage.getItem(
                                    "token"
                                )}`,
                            },
                            body: JSON.stringify(bookingRequest),
                        }
                    );

                    if (!putResponse.ok) {
                        const errorData = await putResponse.json();
                        setErrorMessagesTerm(
                            errorData.message ||
                                "Fehler bei der Buchungsbestätigung"
                        );
                        throw new Error("Fehler bei der Buchungsbestätigung");
                    }

                    const putResult = await putResponse.json();
                    console.log("Buchung erfolgreich:", putResult);
                    navigate("/user/dashboard");
                } catch (error) {
                    console.error(
                        "Fehler während des Buchungsprozesses:",
                        error
                    );
                }
            } finally {
                setLoading(false);
            }
        } else {
            console.log("Formular ist nicht vollständig oder nicht genehmigt.");
            setErrorMessagesTerm(
                "Bitte stellen Sie sicher, dass alle Formularfelder ausgefüllt und genehmigt sind."
            );
        }
    };

    return (
        <div>
            <img src="" alt="" />
            <div className="pl-10 pt-5">
                <button
                    className="flex gap-2 text-xl text-gray items-center"
                    onClick={() => navigate(-1)}
                >
                    <img src={backSvg} alt="return arrow" />
                    <span className="">Zurück</span>
                </button>
            </div>
            <div className="grid lg:grid-cols-3 gap-4 px-10 pb-10 pt-5">
                <div className="lg:col-span-2 space-y-4">
                    {userData && Object.keys(userData).length > 0 ? (
                        <BillingInfo
                            title="Rechnungsangaben"
                            info="Bitte die fehlenden Angaben eintragen"
                            step="Schritt 1-4"
                            userData={userData}
                            setUserData={setUserData}
                            setFormComplete={setFormComplete}
                            setSaveAddress={setSaveAddress}
                        />
                    ) : (
                        <p className="flex">
                            <span className="loading mr-4" />
                            Lade Benutzerdaten...
                        </p>
                    )}
                    {bookingData && Object.keys(bookingData).length > 0 ? (
                        <PickupReturnCard
                            title="Mietinformationen"
                            info="Bitte die fehlenden Angaben eintragen"
                            step="Schritt 2-4"
                            bookingData={bookingData}
                        />
                    ) : (
                        <p className="flex">
                            <span className="loading mr-4" /> Lade
                            Buchungsdaten...
                        </p>
                    )}
                    <PaymentInfo
                        title="Zahlungsinformationen"
                        info="Bitte wählen Sie eine Zahlungsmethode aus"
                        step="Schritt 3-4"
                    />
                    <ConfirmationInfo
                        title="Bestätigungen"
                        info="Bitte bestätigen Sie die folgenden Optionen"
                        step="Schritt 4-4"
                        setDirective={setDirective}
                        errorMessageTerm={errorMessageTerm}
                        isDirective={isDirective}
                    />
                </div>
                <div className="lg:col-span-1">
                    {bookingData && Object.keys(bookingData).length > 0 ? (
                        <RentalSummary
                            title="Mietzusammenfassung"
                            info="Hier ist eine Zusammenfassung Ihrer Miete"
                            pricePerDay={bookingData.pricePerDay}
                            additionalFee={bookingData.pauschale}
                            totalPrice={bookingData.totalPrice}
                            totalDays={bookingData.totalDays}
                            isFee={bookingData.hasExtraChargeChangingLocation}
                            carId={carId}
                        />
                    ) : (
                        <p className="flex">
                            <span className="loading mr-4" />
                            Lade Fahrzeugdaten...
                        </p>
                    )}
                </div>
                <div className="flex items-center justify-center lg:col-span-2">
                    <button
                        className="w-full bg-costumBlue text-white rounded-lg p-4 disabled:bg-slate-500 disabled:cursor-not-allowed"
                        onClick={checkSubmit}
                        disabled={!isDirective}
                    >
                        {isLoading ? (
                            <span className="loading" />
                        ) : (
                            "Buchung bestätigen"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
