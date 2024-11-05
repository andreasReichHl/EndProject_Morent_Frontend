import { useState } from "react";
import FooterCopyright from "../components/FooterCopyright";
import Navbar from "../components/Navbar";
import SearchLandingPage from "../components/SearchLandingPage";
import "../index.css";

export default function LandingPage() {
    const [autos, setAutos] = useState([]);
    return (
        <div className="background">
            <div className="content">
                <div>
                    <Navbar />
                    <div className="mx-16 mt-10">
                        <SearchLandingPage setAutos={setAutos}/>
                    </div>
                </div>
                <FooterCopyright />
            </div>
        </div>
    );
}
