import React, { useState } from "react";

export default function AdminSendHandover({ bookingId }) {
  const [newDamages, setNewDamages] = useState([
    { position: "", description: "" },
  ]);

  const [newMileage, setNewMileage] = useState(0);
  const [isTankFull, setIsTankFull] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [completed, setCompleted] = useState(false)

  const damagesOptions = [
    { value: "FRONT_BUMPER", label: "Frontstoßstange" },
    { value: "REAR_BUMPER", label: "Heckstoßstange" },
    { value: "LEFT_DOOR", label: "Linke Tür" },
    { value: "RIGHT_DOOR", label: "Rechte Tür" },
    { value: "HOOD", label: "Motorhaube" },
    { value: "ROOF", label: "Dach" },
    { value: "TRUNK", label: "Kofferraum" },
    { value: "LEFT_FENDER", label: "Linker Kotflügel" },
    { value: "RIGHT_FENDER", label: "Rechter Kotflügel" },
    { value: "WINDSHIELD", label: "Windschutzscheibe" },
    { value: "REAR_WINDOW", label: "Heckscheibe" },
    { value: "LEFT_HEADLIGHT", label: "Linker Scheinwerfer" },
    { value: "RIGHT_HEADLIGHT", label: "Rechter Scheinwerfer" },
    { value: "LEFT_TAILLIGHT", label: "Linkes Rücklicht" },
    { value: "RIGHT_TAILLIGHT", label: "Rechtes Rücklicht" },
  ];

  const handleInputChange = (index, event) => {
    const updatedDamages = [...newDamages];
    updatedDamages[index][event.target.name] = event.target.value;
    setNewDamages(updatedDamages);
  };
    
  const handlePositionChange = (index, event) => {
    const updatedDamages = [...newDamages];
    updatedDamages[index].position = event.target.value;
    setNewDamages(updatedDamages);
  };

  const addDamage = (event) => {
    event.preventDefault();
    setNewDamages([...newDamages, { position: "", description: "" }]);
  };

  const removeDamage = (index) => {
    const newDamage = newDamages.filter((_, i) => i !== index);
    setNewDamages(newDamage);
  };

  const handleMileage = (event) => {
    setNewMileage(event.target.value);
  };

  const checkBoxChange = (event) => {
    setIsTankFull((prev) => !prev);
  };

  async function confirmReturnButton() {
    setError("");
    setIsLoading(true);
    const handHover = {
      bookingId,
      newMileage,
      isTankFull,
      newDamages,
    };

    console.log(bookingId);
    console.log(JSON.stringify(handHover));
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND}/api/v1/handover/return`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
          body: JSON.stringify(handHover),
        }
      );
      const data = await response.json();
      if (data) setCompleted(true)
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="p-6 w-full max-w-4xl mx-auto bg-blue-50 rounded-lg shadow-lg border border-blue-200">
      <h2 className="text-2xl font-semibold mb-4">Rückgabe Form</h2>
      <form onSubmit={addDamage}>
        <div>
          <div className=" flex flex-row justify-between mb-6">
            <p>Gib den neuen Kilometerstand des Autos ein.</p>
            <input
              type="number"
              name="newMileage"
              value={newMileage}
              onChange={(event) => handleMileage(event)}
              className=" border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
              placeholder="Neue KM Stand"
            />
          </div>
          <div className=" flex flex-row justify-between mb-6">
            <p>Gib an, ob das Auto mit vollem Tank zurückgekehrt ist.</p>
            <div className=" flex flex-row justify-between gap-12">
              <input
                type="checkbox"
                className="toggle"
                defaultChecked={isTankFull}
                onChange={checkBoxChange}
              />
              <p> {isTankFull.toString().toUpperCase()}</p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={addDamage}
          className="bg-blue-700 text-white rounded px-2 py-1 hover:bg-blue-600 focus:outline-none mb-2"
        >
          Add Damage
        </button>
        {newDamages.map((damage, index) => (
          <div key={index} className="flex flex-col mb-1">
            <div className="flex items-center mb-1">
              <select
                id="damage-select"
                value={damage.position}
                onChange={(event) => handlePositionChange(index, event)}
                className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
              >
                <option value="">Bitte wählen...</option>
                {damagesOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
             
              <input
                type="text"
                name="description"
                value={damage.description}
                onChange={(event) => handleInputChange(index, event)}
                className="flex-grow border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
                placeholder={`Description ${index + 1}`}
              />

              <button
                type="button"
                onClick={() => removeDamage(index)}
                className="bg-blue-700 text-white rounded px-2 py-1 hover:bg-red-600 focus:outline-none ml-2"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </form>
      <h3 className="text-lg font-semibold mt-6">Neue Schäden:</h3>
      <ul className="list-disc list-inside mt-2 mb-24">
        {newDamages.map((damage, index) => (
          <li key={index} className="text-gray-700">
            Position: {damage.position}, Description: {damage.description}
          </li>
        ))}
      </ul>

      <button
        onClick={confirmReturnButton}
        className="bg-blue-700 text-white text-xl  font-semibold rounded px-4 py-2 hover:bg-red-600 focus:outline-none mb-12"
      >
        Rückgabe beschtätigen
      </button>

      {isLoading && <p>Bitte wartent</p>}
      {error && <p>{error.message}</p>}
      {completed && 
      <p className="text-2xl text-red-700">Die Übergabe war erfolgreich. Der Kunde wird eine Bestätigungs-E-Mail erhalten.</p>
      }
    </div>
  );
}
