import React, { useState, useEffect } from "react";
import golf from "/src/assets/images/Golf.png";

export default function RentalSummary({
  title,
  info,
  step,
  pricePerDay,
  additionalFee,
  totalPrice,
  totalDays,
  isFee,
  carId,
}) {
  const [taxRate, setTaxRate] = useState(19);
  // Berechnung des Gesamtbetrags
  const tax = (totalPrice / 100) * taxRate;
  const totalPriceOfDays = totalDays * pricePerDay;
  const [vehicledetails, setVehicleDetails] = useState(null);

  useEffect(() => {
    const submitBookingRequest = async () => {
      if (carId) {
        try {
          const response = await fetch(
            "http://localhost:8080/api/v1/vehicles/exemplar/" + carId,
            {
              method: "GET",
            }
          );

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const result = await response.json();
          setVehicleDetails(result);
          console.log(result);
        } catch (error) {
          console.error("Error during get VehicleDetails:", error);
        }
      }
    };
    submitBookingRequest();
  }, []);

  return (
    <section className="border p-6 rounded-md shadow-md mb-4">
      <div className="">
        <div>
          <div className="flex justify-between mb-4 flex-col">
            <div>
              <h2 className="text-2xl">{title}</h2>
              <h3 className="mb-4">{info}</h3>
            </div>
            <p className="text-gray-400 text-sm">{step}</p>
          </div>

          <div className="flex flex-col">
            <div className="mt-4 flex items-center">
              <img
                src={vehicledetails?.vehicle?.imageUrl || golf}
                alt="Mietobjekt Vorschau"
                className="w-56 h-36 object-cover rounded-md mr-4"
              />
              <div>
                {" "}
                <div>
                  <p className="text-2xl font-medium mb-5">
                    {vehicledetails?.vehicle?.brand +
                      " " +
                      vehicledetails?.vehicle?.model}
                  </p>
                </div>
                <div class="rating rating-xs">
                  <input
                    type="radio"
                    name="rating-5"
                    class="mask mask-star-2 bg-yellow-500"
                    disabled
                  />
                  <input
                    type="radio"
                    name="rating-5"
                    class="mask mask-star-2 bg-yellow-500"
                    checked="checked"
                    disabled
                  />
                  <input
                    type="radio"
                    name="rating-5"
                    class="mask mask-star-2 bg-yellow-500"
                    disabled
                  />
                  <input
                    type="radio"
                    name="rating-5"
                    class="mask mask-star-2 bg-yellow-500"
                    disabled
                  />
                  <input
                    type="radio"
                    name="rating-5"
                    class="mask mask-star-2 bg-yellow-500"
                    disabled
                  />
                </div>
              </div>
            </div>
            <div>
              <p className="my-5 text-right">{pricePerDay} € / Tag</p>
            </div>
          </div>
          <hr className="my-2" />
          <div>
            <p className="flex justify-between p-2">
              <p>{totalDays} Tage </p>{" "}
              <strong>{totalPriceOfDays.toFixed(2)} €</strong>
            </p>{" "}
            {isFee && (
              <p className="flex justify-between p-2">
                <p>Zusatzpauschale:</p>{" "}
                <strong>{additionalFee.toFixed(2)} €</strong>
              </p>
            )}
            <p className="flex justify-between p-2">
              <p>inkl. {taxRate}%</p> <strong>{tax.toFixed(2)} €</strong>
            </p>
            <hr className="my-2" />
            <p className="flex justify-between p-2">
              <strong>Gesamtpreis:</strong>{" "}
              <strong>{totalPrice.toFixed(2)} €</strong>
            </p>
            <hr className="my-2" />
            <div className="p-6 rounded-md space-y-4">
              <h2 className="text-xl font-semibold">Ihre Buchungsübersicht:</h2>
              <ul className="space-y-2 list-disc list-inside">
                <li>Haftpflichtversicherung</li>
                <li>24/7 Pannenhilfe</li>
                <li>Wintertaugliche Bereifung</li>
                <li>
                  {totalDays * 500} km sind inklusive, danach kostet jeder
                  zusätzliche Kilometer <strong>0,36 €</strong>
                </li>
              </ul>
              <div className="mt-4">
                <p>
                  <strong>Buchungsoption:</strong> Flexibel bleiben - Beim
                  Abholen zahlen, jederzeit vor der Abholzeit kostenlos
                  stornierbar und umbuchbar
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
