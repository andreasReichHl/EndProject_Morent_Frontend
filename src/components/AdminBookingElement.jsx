import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminBookingElement({ booking }) {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  const handleHandover = () => {
    navigate("/handover");
  };

  return (
    <>
      {booking && (
        <div
          onClick={() => {
            setIsActive((old) => !old);
          }}
        >
          {!isActive && (
            <>
              <div className="bg-white px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out border border-gray-200 mb-2">
                <div className="flex flex-row justify-between gap-12 items-center">
                  <p className="text-gray-700">
                    {booking.userLastName} {booking.userFirstName},{" "}
                    {booking.dateOfBirth}
                  </p>
                  <h2 className="text-xl font-semibold  text-blue-700">
                    {booking.bookingNumber}
                  </h2>
                </div>
              </div>
            </>
          )}
          {isActive && (
            <>
              <div className="bg-white px-6 py-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out border border-gray-200 mb-4">
                {/* User details */}
                <div className="flex flex-row justify-between items-center mb-4">
                  <div>
                    <p className="text-gray-700 font-medium">
                      {booking.userLastName} {booking.userFirstName}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {booking.dateOfBirth}
                    </p>
                  </div>
                  <h2 className="text-xl font-semibold text-blue-700">
                    {booking.bookingNumber}
                  </h2>
                </div>

                {/* Store details */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <p className="text-gray-600">Store:</p>
                    <p className="text-gray-800">
                      {booking.storeName}, {booking.storeCity}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-600">Drop-off Store:</p>
                    <p className="text-gray-800">
                      {booking.dropOffStoreName}, {booking.dropOffStoreCity}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-600">Pick-Up Date:</p>
                    <p className="text-gray-800">{booking.pickUpDate}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-600">Drop-Off Date:</p>
                    <p className="text-gray-800">{booking.dropOffDate}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-600">Status:</p>
                    <p className="text-gray-800">{booking.status}</p>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <p className="text-gray-700">Total Price:</p>
                    <p className=" text-blue-700">
                      ${booking.totalPrice.toFixed(2)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleHandover}
                  className=" px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-300 transition duration-200 ease-in-out self-end"
                >
                  Handover
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
