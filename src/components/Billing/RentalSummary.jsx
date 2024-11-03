import React from "react";

export default function RentalSummary({
    title,
    info,
    step,
    thumbnailUrl,
    pricePerDay,
    tax,
    additionalFee,
}) {
    // Berechnung des Gesamtbetrags
    const totalPrice = pricePerDay + tax + additionalFee;

    return (
        <section className="border p-6 rounded-md shadow-md mb-4">
            <div className="">
                <div className="flex justify-between mb-4">
                    <div>
                        <h2 className="text-2xl">{title}</h2>
                        <h3 className="mb-4">{info}</h3>
                    </div>
                    <p className="text-gray-400 text-sm">{step}</p>
                </div>
                <div className="mt-4 flex items-center">
                    <img
                        src={thumbnailUrl}
                        alt="Mietobjekt Vorschau"
                        className="w-20 h-20 object-cover rounded-md mr-4"
                    />
                    <div>
                        <div class="rating rating-xs">
                            <input
                                type="radio"
                                name="rating-5"
                                class="mask mask-star-2 bg-yellow-500"
                            />
                            <input
                                type="radio"
                                name="rating-5"
                                class="mask mask-star-2 bg-yellow-500"
                                checked="checked"
                            />
                            <input
                                type="radio"
                                name="rating-5"
                                class="mask mask-star-2 bg-yellow-500"
                            />
                            <input
                                type="radio"
                                name="rating-5"
                                class="mask mask-star-2 bg-yellow-500"
                            />
                            <input
                                type="radio"
                                name="rating-5"
                                class="mask mask-star-2 bg-yellow-500"
                            />
                        </div>
                    </div>
                    <div>
                        <p>
                            <strong>Preis pro Tag:</strong>{" "}
                            {pricePerDay.toFixed(2)} €
                        </p>
                        <p>
                            <strong>Steuer:</strong> {tax.toFixed(2)} €
                        </p>
                        <p>
                            <strong>Zusatzpauschale:</strong>{" "}
                            {additionalFee.toFixed(2)} €
                        </p>
                        <hr className="my-2" />
                        <p>
                            <strong>Gesamtpreis:</strong>{" "}
                            {totalPrice.toFixed(2)} €
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
