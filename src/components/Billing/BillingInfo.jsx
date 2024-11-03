export default function BillingInfo({ title, info, step }) {
    return (
        <section className="border p-6 rounded-md shadow-md mb-4 flex flex-col">
            <div className="flex justify-between mb-4">
                <div>
                    <h2 className="text-2xl">{title}</h2>
                    <h3 className="mb-4">{info}</h3>
                </div>
                <p className="text-gray-400 text-sm">{step}</p>
            </div>
            {/* Responsive grid layout */}
            <div className="grid lg:grid-cols-2 gap-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 col-span-2">
                    <div>
                        <p>Vorname</p>
                        <input
                            type="text"
                            name="firstname"
                            id="firstname"
                            placeholder="Vorname"
                            className="border rounded-md p-2 text-md w-full"
                        />
                    </div>
                    <div>
                        <p>Nachname</p>
                        <input
                            type="text"
                            name="lastname"
                            id="lastname"
                            placeholder="Nachname"
                            className="border rounded-md p-2 text-md w-full"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1  lg:grid-cols-2 col-span-2">
                    <div>
                        <p>Telefonnummer/Mobilnummer</p>
                        <input
                            type="text"
                            name="phone"
                            id="phone"
                            placeholder="Telefonnummer"
                            className="border rounded-md p-2 text-md w-full"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 col-span-2">
                    <div>
                        <p>Straße</p>
                        <input
                            type="text"
                            name="street"
                            id="street"
                            placeholder="Straße"
                            className="border rounded-md p-2 text-md w-full"
                        />
                    </div>
                    <div>
                        <p>Hausnummer</p>
                        <input
                            type="text"
                            name="houseNumber"
                            id="houseNumber"
                            placeholder="Hausnummer"
                            className="border rounded-md p-2 text-md w-full"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 col-span-2">
                    <div>
                        <p>PLZ</p>
                        <input
                            type="text"
                            name="zipcode"
                            id="zipcode"
                            placeholder="PLZ"
                            className="border rounded-md p-2 text-md w-full"
                        />
                    </div>
                    <div>
                        <p>Stadt</p>
                        <input
                            type="text"
                            name="city"
                            id="city"
                            placeholder="Stadt"
                            className="border rounded-md p-2 text-md w-full"
                        />
                    </div>
                </div>

                <div>
                    <p>Land</p>
                    <input
                        type="text"
                        name="country"
                        id="country"
                        placeholder="Land"
                        className="border rounded-md p-2 text-md w-full"
                    />
                </div>
            </div>
        </section>
    );
}
