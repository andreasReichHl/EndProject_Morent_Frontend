import { useEffect, useState } from "react";
import "./UserProfilePage.css";

export default function UserProfilePage() {
    const[userData, setUserData] = useState({});
    const[imgUpdate, setImgUpdate] = useState(false);
    const [token, setToken] = useState(sessionStorage.getItem("token") || "");
    const [profileUpdate, setProfileUpdate] = useState(false);
    const [imageFile, setImageFile] = useState("");
    const [toggle, setToggle] = useState(false);
    const [newsToggle, setNewsToggle] = useState(false);

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
    }, [toggle])


    function ImgUploadToggle() {
        setImgUpdate(!imgUpdate);
    }

    function ProfileUploadToggle() {
        console.log("JaWOLL")
        setProfileUpdate(!profileUpdate);
        
    }

    console.log("profilupdate" + profileUpdate);
    

    const handleFileChange = (event) => {
        setImageFile(event.target.files[0]);
    }

    const handleUpload = async () => {
        const imgData = new FormData();
        imgData.append("file", imageFile)
        fetch(import.meta.env.VITE_BACKEND + "/api/v1/images/user",
            {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + token,
                },
                body: imgData,
            }
        )
        .then(setImgUpdate(!imgUpdate))
        .then(setTimeout(() => {setToggle(!toggle)}, 5000 ))
    }

    const handleUserSubmit = async (event) => {
        event.preventDefault();
    
        const updatedUserData = {
            firstName: event.target.firstName.value,
            lastName: event.target.lastName.value,
            birthDate: event.target.birthDate.value,
            phoneNumber: event.target.phoneNumber.value,
            street: event.target.street.value,
            houseNumber: event.target.houseNumber.value,
            zipCode: event.target.zipCode.value,
            city: event.target.city.value,
            country: event.target.country.value,
            
        };
    
        fetch(import.meta.env.VITE_BACKEND + "/api/v1/user/update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify(updatedUserData),
        })
        .then(response => {
            if (response.ok) {
                console.log("Profile updated successfully");
                setProfileUpdate((prev) => !prev);
                setToggle((prev) => !prev); 
            } else {
                console.error("Failed to update profile");
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
    };

    useEffect(() => {
        fetch(import.meta.env.VITE_BACKEND + "/api/v1/news?email=" + userData.email,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            }
        )
        .then(response => response.json())
        .then(data => setNewsToggle(data))
    },[userData])

    console.log(newsToggle);

    const handleNewsletter = (event) => {
        setNewsToggle(event.target.checked)

        if (event.target.checked) {
            fetch(import.meta.env.VITE_BACKEND + "/api/v1/news?firstName=" + userData.firstName + "&lastName=" + userData.lastName + "&email=" + userData.email + "&isRegistered=" + true,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    },
                }
            )
        } else {
            fetch(import.meta.env.VITE_BACKEND + "/api/v1/news?email=" + userData.email,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    },
                }
            )
        }
    }










    return (
        <section id="profilePage">

             <h2>Hallo {userData.firstName} {userData.lastName}!</h2>
            
            <section className="profileCard">
                <div id="userProfileHeading">
               <h3>Persönliche Informationen</h3>

               <div className="buttonContainer">
                            {profileUpdate ? 
                                <input 
                                    id="profileSaveBtn"
                                    type="submit" 
                                    value=""
                                    form="userProfileForm" 
                                    onClick={(event) => {
                                        event.stopPropagation();
                                      }}  
                                />
                            :
                                <button 
                                    id="profileEditBtn"
                                    type="button"
                                    onClick={(event) => {
                                        event.stopPropagation(); // Verhindert Event-Bubbling
                                        ProfileUploadToggle();
                                      }}
                                >
                                   
                                </button>
                            }
                    </div>
                </div>


               <div id="personalData">

                    <form id="userProfileForm" onSubmit={handleUserSubmit} className="profileTextBox">

                        <div className="formBox">
                            <label htmlFor="profileFirstname">Vorname: </label>
                            <input 
                                className="formInput"
                                type="text"
                                id="profileFirstname" 
                                name="firstName"
                                placeholder={userData.firstName}
                                disabled={!profileUpdate}>  
                            </input>

                            <label htmlFor="profileLastname">Nachname: </label>
                            <input 
                                className="formInput"
                                type="text"
                                id="profileLastname" 
                                name="lastName"
                                placeholder={userData.lastName}
                                disabled={!profileUpdate}>  
                            </input>

                            <label htmlFor="profileBirthday">Geburtstag: </label>
                            <input 
                                className="formInput"
                                type="date"
                                id="profileBirthday" 
                                name="birthDate"
                                defaultValue={userData.birthDate}
                                disabled={!profileUpdate}>  
                            </input>

                            <label htmlFor="profilePhoneNumber">Telefon: </label>
                            <input 
                                className="formInput"
                                type="number"
                                id="profilePhoneNumber" 
                                name="phoneNumber"
                                placeholder={userData.phoneNumber}
                                disabled={!profileUpdate}>  
                            </input>
                        </div>

                        <div className="formBox">
                            <label htmlFor="profileStreet">Straße: </label>
                            <input 
                                className="formInput"
                                type="text"
                                id="profileStreet" 
                                name="street"
                                placeholder={userData.address?.street}
                                disabled={!profileUpdate}>  
                            </input>

                            <label htmlFor="profileHouseNumber">Hausnummer: </label>
                            <input 
                                className="formInput"
                                type="number"
                                id="profileHouseNumber" 
                                name="houseNumber"
                                placeholder={userData.address?.houseNumber}
                                disabled={!profileUpdate}>  
                            </input>

                            <label htmlFor="profileZipCode">Postleitzahl: </label>
                            <input 
                                className="formInput"
                                type="number"
                                id="profileZipCode" 
                                name="zipCode"
                                placeholder={userData.address?.zipCode}
                                disabled={!profileUpdate}>  
                            </input>

                            <label htmlFor="profileCity">Stadt: </label>
                            <input 
                                className="formInput"
                                type="text"
                                id="profileCity" 
                                name="city"
                                placeholder={userData.address?.city}
                                disabled={!profileUpdate}>  
                            </input>

                            <label htmlFor="profileCountry">Land: </label>
                            <input 
                                className="formInput"
                                type="text"
                                id="profileCountry" 
                                name="country"
                                placeholder={userData.address?.country}
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
                                <button onClick={ImgUploadToggle} className="btn bg-white border-2 border-blue-700 text-blue-700 px-4 py-2 rounded-md hover:bg-blue-200 transition duration-200">
                                    Bild Ändern
                                </button>
                                
                                <button className="btn bg-white border-2 border-blue-700 text-blue-700 px-4 py-2 rounded-md hover:bg-blue-200 transition duration-200">
                                    Bild Löschen
                                </button>
                            </div>
                        }
                    </article>
                </div>
            </section>

            <section className="newsCard">
                <h3>Newsletter</h3>

                {newsToggle ? 
                    <>
                        <h4>Super! Du erhältst aktuell alle Neuigkeiten von uns direkt per E-Mail.</h4>
                        <p>Natürlich kannst du dich jederzeit vom Newsletter abmelden, wenn du möchtest.</p>
                    </>
                :
                    <>
                        <h4>Du verpasst derzeit unsere Neuigkeiten und Updates.</h4>
                        <p>Melde dich gerne für unseren Newsletter an, um immer auf dem Laufenden zu bleiben.</p>
                    </>
                }

                <div className="newsRegister">
                    <p>Newsletter abbestellt</p>
                    <input
                        type="checkbox"
                        onChange={handleNewsletter}
                        className={newsToggle? "toggle h-10 w-16 border-blue-800 bg-blue-800 [--tglbg:#06A77D] hover:bg-blue-700" : "toggle h-10 w-16 border-blue-500 bg-blue-500 [--tglbg:#A63446] hover:bg-blue-700" }
                        checked={newsToggle} 
                    />
                    <p>Newsletter abonniert</p>
                </div>
            </section>
        </section>
    )
}