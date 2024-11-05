import { useEffect, useState } from "react";
import AdminBookingElement from "../../components/AdminBookingElementCard";

export default function BookingsPage() {
  const [bookingNumber, setBookingNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const [storeId, setStoreId] = useState(0);
  const [error, setError] = useState(null);
  const [bookingsList, setBookingsList] = useState([]);

  useEffect(() => {
    fetchData();
  }, [bookingNumber, firstName, lastName]);

  async function fetchData() {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND
        }/api/v1/booking/admin/search?bookingNumber=${bookingNumber}&firstName=${firstName}&lastName=${lastName}&storeId=${storeId}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        }
      );
      if (!response.ok) throw new Error("Something went wrong fetching data: error:", error);
      const data = await response.json();
      if (data) setBookingsList(data);
  
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="p-12 w-full ">
        <h2 className="text-5xl font-semibold mb-4 text-center">
          Buchungen Panel
        </h2>

        <section className="grid grid-cols-2 gap-6 bg-slate-100 bg-opacity-80 p-6 rounded-lg shadow-lg mb-6">
          <div>
            <div className="flex flex-col mb-3">
              <label className="text-sm font-medium text-gray-700 ">
                Buchungsnummer
              </label>
              <input
                className="mt-1 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                type="text"
                placeholder="ex: 2445BB5C-A56F-47"
                onChange={(e) => setBookingNumber(e.target.value)}
              />
            </div>
            <div className="flex flex-col ">
              <label className="text-sm font-medium text-gray-700 ´">
                Pick Up Store ID
              </label>
              <input
                className="mt-1 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                type="number"
                min={0}
                onChange={(e) => setStoreId(e.target.value)}
              />
            </div>
          </div>
          <div>
            <div className="flex flex-col mb-3">
              <label className="text-sm font-medium text-gray-700">
                Nachname
              </label>
              <input
                className="mt-1 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                type="text"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 ">
                Vorname
              </label>
              <input
                className="mt-1 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
          </div>
        </section>
        {error && <p>{error.message}</p>}
        {isLoading && <p>....fetching data</p>}
        {bookingsList &&
          bookingsList.map((b) => (
            <AdminBookingElement key={b.bookingId} booking={b} />
          ))}
      </div>
    </>
  );
}
