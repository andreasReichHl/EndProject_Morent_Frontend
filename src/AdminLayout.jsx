import { Outlet } from "react-router-dom";
import AdminSideMenu from "./components/AdminSideMenu";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export default function AdminLayout() {
    return (
        <div className=" font-custom">
            <Navbar />

            <main className="flex-grow min-h-screen bg-primaryBG" role="main">
                <section className="flex flex-row h-screen">
                    <section className="w-60">
                        <AdminSideMenu />
                    </section>
                    <section>
                        <Outlet />
                    </section>
                </section>
            </main>

            <Footer />
        </div>
    );
  }

