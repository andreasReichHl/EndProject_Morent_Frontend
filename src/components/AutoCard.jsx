export default function AutoCard() {
  return (
    <section className="card p-6 flex flex-col bg-white max-w-sm md:max-w-md lg:max-w-lg shadow-lg mx-auto">
    <div className="flex flex-row justify-between items-center mb-4">
      <div>
        <h2 className="font-bold text-lg mb-1">BMW 3 Series</h2>
        <p className="text-gray-600">Sedan</p>
      </div>
      <img src="src/assets/images/vuesax/linear/heart.svg" alt="heart" className="w-6 h-6" />
    </div>
    
    <img src="src/assets/images/Golf.png" alt="auto" className="w-full object-cover rounded mb-5" />
    
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-2">
        <img src="src/assets/images/fuel.svg" alt="fuel" className="w-5 h-5" />
        <p className="text-gray-700">7</p>
      </div>
      <div className="flex items-center gap-2">
        <img src="src/assets/images/transmission.svg" alt="steering" className="w-5 h-5" />
        <p className="text-gray-700">Manual</p>
      </div>
      <div className="flex items-center gap-2">
        <img src="src/assets/images/sits.svg" alt="sits" className="w-5 h-5" />
        <p className="text-gray-700">5</p>
      </div>
    </div>
    
    <div className="flex justify-between items-center">
      <p className="text-lg">
        <span className="font-bold text-blue-700">$50 /</span> day
      </p>
      <button className="btn bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition duration-200">
        Rent now
      </button>
    </div>
  </section>
  );
}
