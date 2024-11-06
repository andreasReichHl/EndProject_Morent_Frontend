import picturePlaceholder from "../assets/images/Golf.png";
// bookingId,
// bookingNumber,
// userFirstName,
// userLastName,
// LodateOfBirth,
// storeName,
// storeCity,
// dropOffStoreName,
// dropOffStoreCity,
// LopickUpDate,
// LodropOffDate,
// Bookinstatus,
// BigtotalPrice

export default function DashboardCard({
    key,
    bookingNumber,
    storeName,
    storeCity,
    dropOffStoreName,
    dropOffStoreCity,
    pickUpDate,
    dropOffDate,
    status,
    totalPrice,
    filterStatus,
}) {
    const formatDate = (dateString) => {
        return moment(dateString).format("DD.MM.YYYY"); // Gibt das Datum im Format "Tag.Monat.Jahr" zurück
    };
    return (
        <div className="card bg-base-100 w-96 shadow-lg">
            {" "}
            <h2 className="font-semibold text-lg mt-4 text-center">{`Buchungsnummer: ${bookingNumber}`}</h2>
            <figure className="px-10 pt-10">
                <img
                    src={picturePlaceholder} // Hier könnten Sie auch ein Bild aus den Props verwenden
                    alt="car"
                    className="rounded-xl"
                />
            </figure>
            <div className="p-7">
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                        <p>Abholort:</p>
                        <p>{`${storeName}, ${storeCity}`}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Rückgabeort:</p>
                        <p>{`${dropOffStoreName}, ${dropOffStoreCity}`}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Abholdatum:</p>
                        <p>{`${pickUpDate}`}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Rückgabedatum: </p>
                        <p>{`${dropOffDate}`}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Status:</p>
                        <p>{`${status}`}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Gesamtpreis:</p>
                        <p>{`${totalPrice.toFixed(2)} €`}</p>
                    </div>
                </div>
                <div className="flex justify-between items-end mt-5">
                    <button className="w-40 bg-costumBlue text-white rounded-lg p-3 disabled:bg-slate-500 disabled:cursor-not-allowed mt-5">
                        {filterStatus === "current"
                            ? "Stornieren"
                            : filterStatus === "expired"
                            ? "Löschen"
                            : " Details anzeigen"}
                    </button>
                    <p className="underline">Bewertung abgeben</p>
                </div>
            </div>
        </div>
    );
}
