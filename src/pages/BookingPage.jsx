import { useState } from "react";
import BillingInfo from "../components/Billing/BillingInfo";
import ConfirmationInfo from "../components/Billing/ConfirmationInfo";
import PaymentInfo from "../components/Billing/PaymentInfo";
import PickupReturnCard from "../components/Billing/PickupReturnCard";
import RentalSummary from "../components/Billing/RentalSummary";

export default function BookingPage() {
    const [isLoading, setLoading] = useState(false);

    return (
        <div className="grid lg:grid-cols-3 gap-4 p-10">
            <div className="lg:col-span-2 space-y-4">
                <BillingInfo
                    title="Rechnungsangaben"
                    info="Bitte die fehlenden Angaben eintragen"
                    step="Schritt 1-4"
                />
                <PickupReturnCard
                    title="Mietinformationen"
                    info="Bitte die fehlenden Angaben eintragen"
                    step="Schritt 2-4"
                />
                <PaymentInfo
                    title="Zahlungsinformationen"
                    info="Bitte wählen Sie eine Zahlungsmethode aus"
                    step="Schritt 3-4"
                />
                <ConfirmationInfo
                    title="Bestätigungen"
                    info="Bitte bestätigen Sie die folgenden Optionen"
                    step="Schritt 4-4"
                />
            </div>
            <div className="lg:col-span-1">
                <RentalSummary
                    title="Mietzusammenfassung"
                    info="Hier ist eine Zusammenfassung Ihrer Miete"
                    thumbnailUrl="https://via.placeholder.com/150" // Beispielbild-URL
                    pricePerDay={45} // Beispiel Preis pro Tag
                    tax={5} // Beispiel Steuerbetrag
                    additionalFee={10} // Beispiel Zusatzpauschale
                />
            </div>
            <div className="flex items-center justify-center lg:col-span-2">
                <button
                    className="w-full bg-costumBlue text-white rounded-lg p-4 disabled:bg-slate-500 disabled:cursor-not-allowed"
                    onClick="{checkSubmit}"
                >
                    {isLoading ? (
                        <span className="loading" />
                    ) : (
                        "Buchung bestätigen"
                    )}
                </button>
            </div>
        </div>
    );
}
