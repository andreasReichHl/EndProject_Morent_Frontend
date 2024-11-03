import { useState, useEffect } from "react";

export default function AdminVehicleElement({vehicleId}) {
  const [isLoading, setIsLoading] = useState("");
  const [error, setError] = useState(null);
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    fetchVehicleData();
  }, [vehicleId]);

  async function fetchVehicleData() {
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND}/api/v1/vehicles/exemplar/${vehicleId}`,
        {
          method: "GET",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        }
      );
      if (!response.ok) throw new Error("Error fetching data");
      const data = await response.json();
      if (data) setVehicle(data);
      console.log(data);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  if (error) return <p>No vehicle data available</p>;
  if (isLoading) return <p>... fetching data</p>;

  return (
    <>
      {vehicle && (
        <div className="p-6 w-full max-w-4xl mx-auto bg-blue-50 rounded-lg shadow-lg border border-blue-200">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">
            Vehicle Details
          </h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <p>
              <span className="font-semibold">Vehicle ID:</span> {vehicle.id}
            </p>
            <p>
              <span className="font-semibold">Brand & Model:</span>{" "}
              {vehicle.vehicle.brand} {vehicle.vehicle.model}
            </p>
            <p>
              <span className="font-semibold">Car Type:</span> {vehicle.vehicle.carType}
            </p>
            <p>
              <span className="font-semibold">Seats:</span> {vehicle.vehicle.seats}
            </p>
            <p>
              <span className="font-semibold">Engine Capacity:</span>{" "}
              {vehicle.vehicle.engineCapacity} cc
            </p>
            <p>
              <span className="font-semibold">Fuel Type:</span> {vehicle.vehicle.fuelType}
            </p>
            <p>
              <span className="font-semibold">Automatic:</span>{" "}
              {vehicle.vehicle.isAutomatic ? "Yes" : "No"}
            </p>
            <p>
              <span className="font-semibold">Consumption:</span> {vehicle.vehicle.consumption} L/100km
            </p>
            <p>
              <span className="font-semibold">Price per Day:</span>{" "}
              €{vehicle.pricePerDay.toFixed(2)}
            </p>
            <p>
              <span className="font-semibold">Mileage:</span> {vehicle.mileage} km
            </p>
            <p>
              <span className="font-semibold">Status:</span> {vehicle.status}
            </p>
            <p>
              <span className="font-semibold">Construction Year:</span> {vehicle.ConstYear}
            </p>
            <p>
              <span className="font-semibold">Created At:</span> {new Date(vehicle.createAt).toLocaleDateString()}
            </p>
            <div className="col-span-2">
              <h3 className="font-semibold mt-4">Damages:</h3>
              {vehicle.Damages.length > 0 ? (
                <table className="w-full mt-2 bg-white border border-gray-300">
                  <thead>
                    <tr className="bg-gray-200 text-left">
                      <th className="p-2 border">Position</th>
                      <th className="p-2 border">Description</th>
                      <th className="p-2 border">Reported At</th>
                      <th className="p-2 border">Repaired</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vehicle.Damages.map((damage, index) => (
                      <tr key={index} className="border-t">
                        <td className="p-2 border">{damage.position}</td>
                        <td className="p-2 border">{damage.description}</td>
                        <td className="p-2 border">
                          {new Date(damage.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-2 border">
                          {damage.isRepaired ? "Yes" : "No"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No reported damages</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}