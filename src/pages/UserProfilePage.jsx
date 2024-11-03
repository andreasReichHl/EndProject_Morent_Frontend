import { useEffect, useState } from "react";
import "./UserProfilePage.css";

export default function UserProfilPage() {
    const[userData, setUserData] = useState({})
    const[imgUpdate, setImgUpdate] = useState(false)
    const [token, setToken] = useState(sessionStorage.getItem("token") || "");

    useEffect(() => {
        fetch(import.meta.env.VITE_BACKEND + "/api/v1/user",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            }
        )
        .then(response => response.json())
        .then(data => setUserData(data))
    }, [])

    return (
        <section id="profilPage">

             <h2>Hallo {userData.firstName} {userData.lastName}!</h2>
            
            <section className="profileCard">
               <h3>Persönliche Informationen</h3>

               <div id="personalData">
                <article>
                    <p>ich bin ein söilaenrg</p>

                </article>

                <article>
                    <div className="imgBox">
                        <img src={userData.profilePictureUrl} alt="Profil Bild" />
                    </div>
                    <div>
                        {imgUpdate ?
                        <>

                        </>
                        :
                        <>
                        <button className="btn bg-white border-2 border-blue-700 text-blue-700 px-4 py-2 rounded-md hover:bg-blue-200 transition duration-200">
                            Bild Bearbeiten
                        </button>
                        <button className="btn bg-white border-2 border-blue-700 text-blue-700 px-4 py-2 rounded-md hover:bg-blue-200 transition duration-200">
                            Bild Löschen
                        </button>
                        </>}
                    </div>
                </article>
                </div>
            </section>
           
        
        
        
        
        
        
        
        </section>
    )
}