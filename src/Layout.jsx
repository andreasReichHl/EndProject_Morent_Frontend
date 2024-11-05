import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export default function Layout() {
  return (
    <>
      <div className=" font-custom">
        <Navbar />
        <main className="flex-grow h-full bg-primaryBG " role="main">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
