import { useState, useEffect } from "react";
import DashboardCard from "../components/DashboardCard";

export default function DashBoardUser() {
  const [bookings, setBookings] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all"); // Zustand für den Filterstatus

  useEffect(() => {
    const submitUserRequest = async () => {
      const token = sessionStorage.getItem("token");

      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND}/api/v1/booking`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setBookings(result);
      } catch (error) {
        console.error("Error during booking:", error);
      }
    };
    submitUserRequest();
  }, []);

  // Filterfunktion basierend auf filterStatus
  const getFilteredBookings = () => {
    const today = new Date();
    return bookings.filter((booking) => {
      const dropOffDate = new Date(booking.dropOffDate);
      if (filterStatus === "current") {
        return dropOffDate >= today;
      } else if (filterStatus === "expired") {
        return dropOffDate < today;
      }
      return true; // "all" zeigt alle Buchungen
    });
  };

  return (
    <>
      <div className="mx-32">
        <div className="flex text-lg py-10 justify-center gap-10">
          <button
            onClick={() => setFilterStatus("all")}
            style={{
              textDecoration: filterStatus === "all" ? "underline" : "none",
            }}
          >
            Alle Buchungen
          </button>
          <button
            onClick={() => setFilterStatus("current")}
            style={{
              textDecoration: filterStatus === "current" ? "underline" : "none",
            }}
          >
            Nur aktuelle Buchungen
          </button>
          <button
            onClick={() => setFilterStatus("expired")}
            style={{
              textDecoration: filterStatus === "expired" ? "underline" : "none",
            }}
          >
            Abgelaufene Buchungen
          </button>
        </div>
        <div className="flex  flex-wrap gap-6 justify-center">
          {getFilteredBookings().length > 0 ? (
            getFilteredBookings().map((booking) => (
              <DashboardCard
                key={booking.bookingId}
                bookingNumber={booking.bookingNumber}
                storeName={booking.storeName}
                storeCity={booking.storeCity}
                dropOffStoreName={booking.dropOffStoreName}
                dropOffStoreCity={booking.dropOffStoreCity}
                pickUpDate={booking.pickUpDate}
                dropOffDate={booking.dropOffDate}
                status={booking.status}
                totalPrice={booking.totalPrice}
                filterStatus={filterStatus}
              />
            ))
          ) : (
            // <div className="flex justify-center h-full items-center text-center">
            //     <p>Keine Buchungen verfügbar.</p>
            // </div>
            <div
              className="text-xl text-gray-400"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100vw", // Füllt die volle Höhe des Bildschirms
                height: "50vh", // Füllt die volle Höhe des Bildschirms
                textAlign: "center",
              }}
            >
              <p>Keine Buchungen verfügbar.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
