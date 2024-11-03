// PickupReturnCard.js
export default function PickupReturnCard({ title, info, step }) {
    return (
        <section className="border rounded-md p-6 shadow-md my-4">
            <div className="flex justify-between mb-4">
                <div>
                    <h2 className="text-2xl">{title}</h2>
                    <h3 className="mb-4">{info}</h3>
                </div>
                <p className="text-gray-400 text-sm">{step}</p>
            </div>
            <div className="mb-4">
                <label htmlFor="pickupLocation" className="block font-medium">
                    Abholort
                </label>
                <input
                    type="text"
                    name="pickupLocation"
                    id="pickupLocation"
                    placeholder="Abholort eingeben"
                    className="border rounded-md p-2 text-md w-full mt-1"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="pickupDate" className="block font-medium">
                    Abholdatum
                </label>
                <input
                    type="date"
                    name="pickupDate"
                    id="pickupDate"
                    className="border rounded-md p-2 text-md w-full mt-1"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="pickupTime" className="block font-medium">
                    Abholzeit
                </label>
                <input
                    type="time"
                    name="pickupTime"
                    id="pickupTime"
                    className="border rounded-md p-2 text-md w-full mt-1"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="returnDate" className="block font-medium">
                    Rückgabedatum
                </label>
                <input
                    type="date"
                    name="returnDate"
                    id="returnDate"
                    className="border rounded-md p-2 text-md w-full mt-1"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="returnTime" className="block font-medium">
                    Rückgabezeit
                </label>
                <input
                    type="time"
                    name="returnTime"
                    id="returnTime"
                    className="border rounded-md p-2 text-md w-full mt-1"
                />
            </div>
        </section>
    );
}
