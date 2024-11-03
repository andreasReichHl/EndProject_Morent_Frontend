import React, { useState } from "react";

export default function ConfirmationInfo({ title, info, step }) {
    const [isInfoMailConfirmed, setIsInfoMailConfirmed] = useState(false);
    const [isTermsConfirmed, setIsTermsConfirmed] = useState(false);

    const handleInfoMailChange = (event) => {
        setIsInfoMailConfirmed(event.target.checked);
    };

    const handleTermsChange = (event) => {
        setIsTermsConfirmed(event.target.checked);
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
            <div className="mt-4">
                <div className="flex flex-col gap-4">
                    <label className="p-3 border bg-slate-100 rounded-md flex">
                        <input
                            type="checkbox"
                            checked={isInfoMailConfirmed}
                            onChange={handleInfoMailChange}
                        />
                        <p className="p-2">
                            Ich möchte eine Informationsmail und eine
                            Rechnungsmail erhalten
                        </p>
                    </label>
                    <label className="p-3 border bg-slate-100 rounded-md flex">
                        <input
                            type="checkbox"
                            checked={isTermsConfirmed}
                            onChange={handleTermsChange}
                        />
                        <p className="p-2">
                            {" "}
                            Ich akzeptiere die Allgemeinen Geschäftsbedingungen
                            und die Datenschutzrichtlinie
                        </p>
                    </label>
                </div>
            </div>
        </section>
    );
}
