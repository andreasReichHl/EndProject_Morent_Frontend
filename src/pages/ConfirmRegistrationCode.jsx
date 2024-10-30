import { useState } from "react";
import { Link } from "react-router-dom";

export default function () {
  const [code, setCode] = useState("");

  return (
    <section className="flex justify-center items-center absolute inset-0 p-6">
      <form
        /* onSubmit={confirmCodeFunction} */
        className="bg-navBG bg-opacity-40 p-6 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Bestätigungscode
        </h2>
        <div className="mb-4">
          <p className=" text-gray-700 text-sm">
            Bitte geben Sie den Code ein,
          </p>
          <p className=" text-gray-700 text-sm mb-2">
            den wir Ihnen per E-Mail gesendet haben
          </p>
          <input
            onChange={(e) => setCode(e.target.value)}
            type="text"
            id="code"
            className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-700 text-white font-bold py-2 rounded mb-12"
        >
          Code bestätigen
        </button>

        <div className="text-center mb-5">
          <Link to="/resend-code" className="text-blue-500">
            Code nicht erhalten? Erneut senden
          </Link>
        </div>
      </form>
    </section>
  );
}
