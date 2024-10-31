import { useState } from "react";
import AutoCard from "./components/AutoCard";
import LocationNav from "./components/LocationNav";
import LocationDate from "./components/LocationDate";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            {/* <h1 className="text-8xl pb-24 mb-96">HOME</h1> */}
            <LocationDate />
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
