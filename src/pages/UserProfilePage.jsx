import { useEffect, useState } from "react";
import "./UserProfilePage.css";

export default function UserProfilePage() {
    const[userData, setUserData] = useState({})
    const[imgUpdate, setImgUpdate] = useState(false)
    const [token, setToken] = useState(sessionStorage.getItem("token") || "");
    const [profileUpdate, setProfileUpdate] = useState(false)

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

    function ProfileUploadToggle() {
        setProfileUpdate(!profileUpdate);
    }

    const handleFileChange = (event) => {}

    const handleUpload = async () => {}

    console.log(userData)
    return (
        <section id="profilePage">

             <h2>Hallo {userData.firstName} {userData.lastName}!</h2>
            
            <section className="profileCard">
               <h3>Persönliche Informationen</h3>

               <div id="personalData">

                    <form className="profileTextBox">

                        <div className="formBox">
                            <label htmlFor="profileFirstname">Vorname: </label>
                            <input 
                                className="formInput"
                            type="text"
                            id="profileFirstname" 
                            name="firstName"
                            value={userData.firstName}
                            disabled={!profileUpdate}>  
                            </input>

                            <label htmlFor="profileLastname">Nachname: </label>
                            <input 
                                className="formInput"
                                type="text"
                                id="profileLastname" 
                                name="lastName"
                                value={userData.lastName}
                                disabled={!profileUpdate}>  
                            </input>

                            <label htmlFor="profileBirthday">Geburtstag: </label>
                            <input 
                                className="formInput"
                                type="date"
                                id="profileBirthday" 
                                name="birthDate"
                                value={userData.birthDate}
                                disabled={!profileUpdate}>  
                            </input>

                            <label htmlFor="profilePhoneNumber">Telefon: </label>
                            <input 
                                className="formInput"
                                type="number"
                                id="profilePhoneNumber" 
                                name="phoneNumber"
                                value={userData.phoneNumber}
                                disabled={!profileUpdate}>  
                            </input>

                            {profileUpdate ? 
                                <input 
                                    type="submit" 
                                    value="Speichern" 
                                    className="btn mt-3 bg-white border-2 border-blue-700 text-blue-700 px-4 py-2 rounded-md hover:bg-blue-200 transition duration-200" >
                                </input>
                            :
                                <button 
                                    onClick={ProfileUploadToggle}
                                    className="btn mt-3 bg-white border-2 border-blue-700 text-blue-700 px-4 py-2 rounded-md hover:bg-blue-200 transition duration-200" >
                                        Profil Bearbeiten
                                </button>
                            }
                        </div>

                        <div className="formBox">
                            <label htmlFor="profileStreet">Straße: </label>
                            <input 
                                className="formInput"
                                type="text"
                                id="profileStreet" 
                                name="street"
                                value={userData.address?.street}
                                disabled={!profileUpdate}>  
                            </input>

                            <label htmlFor="profileHouseNumber">Hausnummer: </label>
                            <input 
                                className="formInput"
                                type="number"
                                id="profileHouseNumber" 
                                name="houseNumber"
                                value={userData.address?.houseNumber}
                                disabled={!profileUpdate}>  
                            </input>

                            <label htmlFor="profileZipCode">Postleitzahl: </label>
                            <input 
                                className="formInput"
                                type="number"
                                id="profileZipCode" 
                                name="zipCode"
                                value={userData.address?.zipCode}
                                disabled={!profileUpdate}>  
                            </input>

                            <label htmlFor="profileCity">Stadt: </label>
                            <input 
                                className="formInput"
                                type="text"
                                id="profileCity" 
                                name="city"
                                value={userData.address?.city}
                                disabled={!profileUpdate}>  
                            </input>

                            <label htmlFor="profileCountry">Land: </label>
                            <input 
                                className="formInput"
                                type="text"
                                id="profileCountry" 
                                name="country"
                                value={userData.address?.country}
                                disabled={!profileUpdate}>  
                            </input>
                        </div>
                    </form>


                    <article className="profileImagesBox">
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
                                <button onClick={ImgUploadToggle} className="btn w-32 bg-white border-2 border-blue-700 text-blue-700 px-4 py-2 rounded-md hover:bg-blue-200 transition duration-200">
                                    Bild Ändern
                                </button>
                                
                                <button className="btn w-32 bg-white border-2 border-blue-700 text-blue-700 px-4 py-2 rounded-md hover:bg-blue-200 transition duration-200">
                                    Bild Löschen
                                </button>
                            </div>
                        }
                    </article>
                </div>
            </section>

            <section>
                <h3>Newsletter</h3>
            </section>
           
        
        
        
        
        
        
        
        </section>
    )
}