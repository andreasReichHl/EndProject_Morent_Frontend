import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import AutoCard from "./components/AutoCard";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="text-8xl pb-24 mb-96">HOME</h1>
      <div className="flex flex-wrap gap-5 p-12 mx-auto">
        <AutoCard />
        <AutoCard />
        <AutoCard />
        <AutoCard />
        <AutoCard />
        <AutoCard />
      </div>
    </>
  );
}

export default App;
