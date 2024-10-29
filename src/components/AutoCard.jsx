export default function AutoCard() {
  return (
    <section className="card p-6 flex bg-white max-w-96 shadow-lg">
      <div className="flex flex-row justify-between">
        <div>
          <h2 className="font-bold mb-3">BMW 3 Series</h2>
          <p>Sedan</p>
        </div>
        <img src="src/assets/images/vuesax/linear/heart.svg" alt="heart" />
      </div>
      <img src="src/assets/images/Golf.png" alt="auto" className="mb-5"/>
      <div className="flex justify-between mb-10">
        <div className="flex items-center gap-2">
          <img src="src/assets/images/fuel.svg" alt="fuel" />
          <p>7</p>
        </div>
        <div className="flex items-center gap-2">
          <img src="src/assets/images/transmission.svg" alt="steering" />
          <p>Manuel</p>
        </div>
        <div className="flex items-center gap-2">
          <img src="src/assets/images/sits.svg" alt="sits" />
          <p>5</p>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <p>
          <span className=" font-bold">$50 /</span> day
        </p>
        <div>
          <button className="btn bg-blue-700 text-white">Rent now</button>
        </div>
      </div>
    </section>
  );
}
