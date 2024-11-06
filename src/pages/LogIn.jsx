import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";

export default function LogIn() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const [error, setError] = useState("");

    async function loginFunction(event) {
        event.preventDefault();
        setError("");
        const auth = {
            email,
            password,
        };

        const encoded = btoa(email + ":" + password);
        try {
            const response = await fetch(
                import.meta.env.VITE_BACKEND + "/api/v1/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Basic " + encoded,
                    },
                    body: JSON.stringify(auth),
                }
            );
            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error("Unauthorized: Invalid email or password.");
                } else {
                    throw new Error(`Error: ${response.statusText}`);
                }
            }

            const data = await response.json();
            login(data.token);
            navigate("/");
        } catch (error) {
            console.error("Error:", error.message);
            setError(error.message);
        }
    }

    return (
        <section className=" flex justify-center p-6">
            <form
                onSubmit={loginFunction}
                className=" bg-navBG bg-opacity-40 p-6 rounded-lg shadow-lg w-96"
            >
                <h2 className="text-2xl font-semibold mb-6 text-center">
                    Login
                </h2>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">
                        Email
                    </label>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        id="email"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700">
                        Passwort
                    </label>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        id="password"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none"
                        required
                    />
                </div>
                <button
                    type="submit"
            className="w-full text-white font-bold py-2 rounded mb-12 disabled:bg-gray-400 disabled:cursor-not-allowed bg-blue-700"
            disabled={!email || !password}
                >
                    Anmelden
                </button>
                <p className="text-red-600 text-sm mb-7">{error}</p>

                <div className="text-center mb-5">
                    <Link to="/signup">Kein Konto? Hier registrieren</Link>
                </div>
                <button
                    type="submit"
                    className="w-full bg-white text-black py-2 rounded mb-12 text-sm border border-black"
                >
                    Password vergessen?
                </button>
            </form>
        </section>
    );
}
