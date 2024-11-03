import React, { useState } from "react";
import palypalSvg from "../Billing/img/paypal.svg";
import visaSvg from "../Billing/img/visa.svg";

export default function PaymentInfo({ title, info, step }) {
    const [paymentMethod, setPaymentMethod] = useState("cash");
    const [disablePayment, setDisablePayment] = useState(true);

    const handlePaymentChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    return (
        <section className="border p-6 rounded-md shadow-md mb-4">
            <div className="flex justify-between mb-4">
                <div>
                    <h2 className="text-2xl">{title}</h2>
                    <h3 className="mb-4">{info}</h3>
                </div>
                <p className="text-gray-400 text-sm">{step}</p>
            </div>
            <div className="flex flex-col gap-3">
                <div className="flex justify-between p-3 border bg-slate-100 rounded-md">
                    <div className="flex">
                        <input
                            disabled={disablePayment}
                            type="radio"
                            name="paymentMethod"
                            value="creditCard"
                            checked={paymentMethod === "creditCard"}
                            onChange={handlePaymentChange}
                        />
                        <p className="ml-2">Kreditkarte</p>
                    </div>
                    <div>
                        <img src={visaSvg} alt="visa logo" />
                    </div>
                </div>

                <div>
                    <div className="flex justify-between p-3 border bg-slate-100 rounded-md">
                        <div className="flex">
                            <input
                                disabled={disablePayment}
                                type="radio"
                                name="paymentMethod"
                                value="paypal"
                                checked={paymentMethod === "paypal"}
                                onChange={handlePaymentChange}
                            />
                            <p className="ml-2">PayPal</p>
                        </div>
                        <img src={palypalSvg} alt="paypal logo" />
                    </div>
                    {disablePayment && <p></p>}
                </div>

                <div className="flex justify-between p-3 border bg-slate-100 rounded-md">
                    <div className="flex">
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="cash"
                            checked={paymentMethod === "cash"}
                            onChange={handlePaymentChange}
                        />
                        <p className="ml-2">Barzahlung</p>
                    </div>
                </div>
                {disablePayment && (
                    <p>
                        Bei Ihrer ersten Buchung bieten wir Ihnen ausschließlich
                        die Möglichkeit zur Barzahlung an. Vielen Dank für Ihr
                        Verständnis!
                    </p>
                )}
            </div>
        </section>
    );
}
