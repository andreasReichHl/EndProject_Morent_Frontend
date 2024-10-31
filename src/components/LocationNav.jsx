import locationIcon from "/Users/supercoder/Desktop/Supercode_Java_Kurs_Aufgabe/Projekt_Battle/Day113_EndProject_Morent_Frontend/src/assets/images/location.svg";

export default function LocationNav(props) {
    return (
        <div className="bg-white rounded-lg flex flex-col p-5 w-full mx-auto">
            <h3 className=" text-lg mb-5">{props.headline ?? "Abholung"}</h3>
            <div className="pl-3 flex flex-col sm:flex-row ">
                <div className="flex flex-col border-b sm:border-b-0 sm:border-r sm:w-1/2 sm:pt-4 h-20">
                    <p className="mb-1">Standort</p>
                    <div className="flex items-center">
                        <img
                            src={locationIcon}
                            alt="house"
                            className="w-6 h-6"
                        />
                        <input
                            type="text"
                            placeholder="Bitte eingeben"
                            className="w-full ml-3 p-1 text-md flex-grow sm:mr-6"
                        />
                    </div>
                </div>
                <div className="flex flex-col flex-grow mt-4 sm:mt-0 sm:mx-4 sm:pt-4 ">
                    <p className="mb-1">Datum</p>
                    <div className="flex">
                        <input type="date" className="p-1 w-full" />
                    </div>
                </div>
            </div>
        </div>
    );
}
