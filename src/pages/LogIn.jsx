import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <section className=" flex justify-center items-center absolute inset-0 p-6">
      <form
        /* onSubmit={loginFunction} */
        className=" bg-navBG bg-opacity-40 p-6 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none"
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none"
            placeholder="Password"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-700 text-white font-bold py-2 rounded mb-12"
        >
          Login
        </button>

        <div className="text-center mb-5">
            <Link to="/signup">No account? Sign up here</Link>
        </div>
        <button
          type="submit"
          className="w-full bg-white text-black py-2 rounded mb-12 text-sm border border-black"
        >
          Forgot Password?
        </button>
      </form>
    </section>
  );
}
