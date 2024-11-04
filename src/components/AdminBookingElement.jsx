

export default function AdminBookingElement({ booking }) {

  return (
    <>
      {booking && (
        <div className="p-6 w-full max-w-4xl mx-auto bg-blue-50 rounded-lg shadow-lg border border-blue-200">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">
            Booking Details
          </h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <p >
              <span className="font-semibold">Booking Number:</span> {booking.bookingNumber}
            </p>
            <p >
              {booking.userFirstName} {booking.userLastName}, {booking.dateOfBirth}
            </p>
            <p>
              <span className="font-semibold">Store Name:</span>
              <span className="text-black">
                {" "}
                {booking.storeName} ({booking.storeCity})
              </span>
            </p>
            <p >
              <span className="font-semibold">Drop Off Store:</span>
              <span className="text-black">
                {" "}
                {booking.dropOffStoreName} ({booking.dropOffStoreCity})
              </span>
            </p>
            <p >
              <span className="font-semibold">Pick Up Date:</span>
              <span className="text-black"> {booking.pickUpDate}</span>
            </p>
            <p >
              <span className="font-semibold">Drop Off Date:</span>
              <span className="text-black"> {booking.dropOffDate}</span>
            </p>
            <p >
              <span className="font-semibold">Booking Status:</span>
              <span className="text-red-600"> {booking.status}</span>
            </p>
            <p>
              <span className="font-semibold">Total Price:</span>
              <span className="text-black">
                {" "}
                €{booking.totalPrice.toFixed(2)}
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
