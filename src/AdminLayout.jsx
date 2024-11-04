import { Outlet } from "react-router-dom";
import AdminSideMenu from "./components/AdminSideMenu";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export default function AdminLayout() {
  return (
    <div className=" font-custom">
      <Navbar />

      <main
        className="min-h-screen bg-primaryBG flex flex-col sm:flex-row"
        role="main"
      >
        <AdminSideMenu />
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
