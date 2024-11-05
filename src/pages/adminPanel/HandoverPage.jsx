import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import AdminBookingElement from "../../components/AdminBookingElement";
import AdminVehicleElement from "../../components/AdminVehicleInfoElement";
import AdminSendHandver from "../../components/AdminSendHandover";

export default function HandoverPage() {
  const [isLoading, setIsLoading] = useState("");
  const [error, setError] = useState(null);
  const [booking, setBooking] = useState(null);
  const location = useLocation();
  const { bookingId } = location.state || {};

  useEffect(() => {
    fetchBookingData();
  }, [bookingId]);

  async function fetchBookingData() {
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND}/api/v1/booking/admin/${bookingId}`,
        {
          method: "GET",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        }
      );
      if (!response.ok) throw new Error("Error fetching data");
      const data = await response.json();
      if (data) setBooking(data);
      console.log(data);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  if (error) return <p>No booking data available</p>;
  if (isLoading) return <p>... fetching data</p>;

  return (
    <>
      {booking && (
        <div className="p-12 w-full">
          <h2 className="text-5xl font-semibold mb-4 text-center">
            Rückgabe Panel
          </h2>
          <AdminBookingElement booking={booking} />
          <AdminVehicleElement vehicleId={booking.vehicleId} />
          {booking.status !== "COMPLETED" && <AdminSendHandver bookingId={booking.bookingId} />}
        </div>
      )}
    </>
  );
}
