import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [emailValidat, setEmailValidat] = useState(true);
    const [isValidat, setValidad] = useState(true);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (password !== confirmPassword) {
            setError("Passwords do not match");
        } else {
            setError("");
        }
    }, [password, confirmPassword]);

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    useEffect(() => {
        if (validateEmail(email)) {
            setEmailValidat(true);
        } else {
            setEmailValidat(false);
        }
    }, [email]);

    useEffect(() => {
        if (confirmPassword !== "" && email !== "") {
            if (password != confirmPassword) {
                setMessage("Passwörter simmen nicht überein!");
                setValidad(true);
            } else {
                setMessage("");
                setValidad(false);
            }
        }
    }, [confirmPassword, email]);

    async function signup(event) {
        event.preventDefault();
        const registrationData = { email, firstName, lastName, password };
        setLoading(true);
        try {
            const response = await fetch(
                import.meta.env.VITE_BACKEND + "/api/v1/auth/signUp",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(registrationData),
                }
            );
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            navigate("/confirm-code");
        } catch (error) {
            console.error("Error:", error.message);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className=" flex justify-center items-center absolute inset-0 p-6">
            <form
                onSubmit={signup}
                className=" bg-navBG bg-opacity-40 p-6 rounded-lg shadow-lg w-96"
            >
                <h2 className="text-2xl font-semibold mb-6 text-center">
                    Neues Konto registrieren
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
                    <label htmlFor="firstName" className="block text-gray-700">
                        Vorname
                    </label>
                    <input
                        onChange={(e) => setFirstName(e.target.value)}
                        type="text"
                        id="firstName"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="secondName" className="block text-gray-700">
                        Nachname
                    </label>
                    <input
                        onChange={(e) => setLastName(e.target.value)}
                        type="text"
                        id="secondName"
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
                <div className="mb-4">
                    <label
                        htmlFor="confirmPassword"
                        className="block text-gray-700"
                    >
                        Passwort bestätigen
                    </label>
                    <input
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type="password"
                        id="confirmPassword"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full text-white font-bold py-2 rounded mb-12 disabled:bg-gray-400 disabled:cursor-not-allowed bg-blue-700"
                    disabled={
                        isValidat ||
                        !firstName ||
                        !lastName ||
                        !email ||
                        !emailValidat
                    }
                >
                    {loading ? (
                        <span className="loading loading-spinner"></span>
                    ) : (
                        "Registrieren"
                    )}
                </button>
                <div className="text-center mb-5">
                    <Link to="/login">Bereits registriert? Hier anmelden</Link>
                </div>
                {message ? (
                    <p className="mb-2 text-red-700">{message}</p>
                ) : (
                    <p className="mb-2 text-red-700">{error}</p>
                )}
            </form>
        </section>
    );
}
