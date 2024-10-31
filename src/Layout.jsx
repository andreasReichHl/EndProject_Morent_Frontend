import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export default function Layout() {
    return (
        <>
            <div className=" font-custom">
                <Navbar />

                <main
                    className="flex-grow min-h-screen bg-primaryBG"
                    role="main"
                >
                    <Outlet />
                </main>

                <Footer />
            </div>
        </>
    );
}
