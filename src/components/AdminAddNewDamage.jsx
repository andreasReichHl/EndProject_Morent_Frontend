export default function AdminAddNewDamage() {
  const [newDamage, setNewDamage] = useState({ position: "", description: "" });

  

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold">Damage Position:</label>
            <input
              type="text"
              name="position"
              value={newDamage.position}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block font-semibold">Description:</label>
            <input
              type="text"
              name="description"
              value={newDamage.description}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded"
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          Add Damage
        </button>
      </form>
      ;
    </>
  );
}
