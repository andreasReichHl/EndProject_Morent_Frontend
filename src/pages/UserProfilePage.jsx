import { useEffect, useState } from "react";
import "./UserProfilePage.css";

export default function UserProfilPage() {
    const[userData, setUserData] = useState({})
    const[imgUpdate, setImgUpdate] = useState(false)
    const [token, setToken] = useState(sessionStorage.getItem("token") || "");
    const [profilUpdate, setProfilUpdate] = useState(false)

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

    function ImgUploadToggle() {
        setImgUpdate(!imgUpdate);
    }

    const handleFileChange = (event) => {}


    const handleUpload = async () => {}

    console.log(userData)
    return (
        <section id="profilPage">

             <h2>Hallo {userData.firstName} {userData.lastName}!</h2>
            
            <section className="profileCard">
               <h3>Persönliche Informationen</h3>

               <div id="personalData">

                    <form className="profileTextBox">

                        <div className="formBox">
                            <label htmlFor="profileFirstname">Vorname: </label>
                            <input 
                            type="text"
                            id="profileFirstname" 
                            name="firstName"
                            value={userData.firstName}
                            disabled={!profilUpdate}>  
                            </input>

                            <label htmlFor="profileLastname">Nachname: </label>
                            <input 
                                type="text"
                                id="profileLastname" 
                                name="lastName"
                                value={userData.lastName}
                                disabled={!profilUpdate}>  
                            </input>

                            <label htmlFor="profileBirthday">Geburtstag: </label>
                            <input 
                                type="date"
                                id="profileBirthday" 
                                name="birthDate"
                                value={userData.birthDate}
                                disabled={!profilUpdate}>  
                            </input>

                            <label htmlFor="profilePhoneNumber">Telefon: </label>
                            <input 
                                type="number"
                                id="profilePhoneNumber" 
                                name="phoneNumber"
                                value={userData.phoneNumber}
                                disabled={!profilUpdate}>  
                            </input>

                            <input 
                                type="submit" 
                                value="Speichern" 
                                className="btn bg-white border-2 border-blue-700 text-blue-700 px-4 py-2 rounded-md hover:bg-blue-200 transition duration-200" >
                            </input>
                        </div>

                        <div className="formBox">
                            <label htmlFor="profileStreet">Straße: </label>
                            <input 
                                type="text"
                                id="profileStreet" 
                                name="street"
                                value={userData.address?.street}
                                disabled={!profilUpdate}>  
                            </input>

                            <label htmlFor="profileHouseNumber">Hausnummer: </label>
                            <input 
                                type="number"
                                id="profileHouseNumber" 
                                name="houseNumber"
                                value={userData.address?.houseNumber}
                                disabled={!profilUpdate}>  
                            </input>

                            <label htmlFor="profileZipCode">Postleitzahl: </label>
                            <input 
                                type="number"
                                id="profileZipCode" 
                                name="zipCode"
                                value={userData.address?.zipCode}
                                disabled={!profilUpdate}>  
                            </input>

                            <label htmlFor="profileCity">Stadt: </label>
                            <input 
                                type="text"
                                id="profileCity" 
                                name="city"
                                value={userData.address?.city}
                                disabled={!profilUpdate}>  
                            </input>

                            <label htmlFor="profileCountry">Land: </label>
                            <input 
                                type="text"
                                id="profileCountry" 
                                name="country"
                                value={userData.address?.country}
                                disabled={!profilUpdate}>  
                            </input>
                        </div>

                    </form>





                <article className="profilImagesBox">
                    <div className="imgBox">
                        <img src={userData.profilePictureUrl} alt="Profil Bild" />
                    </div>
                   
                        {imgUpdate ?
                         <div className="btnBoxFile">
                            <input type="file" onChange={handleFileChange} accept="image/*" id="fileInput"/>
                            <button onClick={handleUpload} className="btn bg-white border-2 border-blue-700 text-blue-700 px-4 py-2 rounded-md hover:bg-blue-200 transition duration-200" >Upload Image</button>
                        </div>
                        :
                        <div className="btnBox">
                        <button onClick={ImgUploadToggle} className="btn bg-white border-2 border-blue-700 text-blue-700 px-4 py-2 rounded-md hover:bg-blue-200 transition duration-200">
                            Bild Bearbeiten
                        </button>
                        <button className="btn bg-white border-2 border-blue-700 text-blue-700 px-4 py-2 rounded-md hover:bg-blue-200 transition duration-200">
                            Bild Löschen
                        </button>
                        </div>}

                </article>
                </div>
            </section>
           
        
        
        
        
        
        
        
        </section>
    )
}