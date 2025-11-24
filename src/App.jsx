import { useEffect, useState, useRef } from "react";
import "./App.css";
import Axios from "axios";
import LinePlot from "./LinePlot";
import ThreeScene from "./ThreeScene";

function App() {
  const [count, setCount] = useState(0);
  const [insults, setInsults] = useState([]);
  const INSULT_API = "/evil/generate_insult.php?lang=en&type=json";

  const plotRef = useRef(null);

  useEffect(() => {
    const data = [
      { x: 0, y: 1 },
      { x: 1, y: 2 },
      { x: 2, y: 3 },
      { x: 3, y: 4 },
    ];

    const svg = LinePlot(data);

    plotRef.current.innerHTML = "";
    plotRef.current.appendChild(svg);
  }, []);

  // react fetch data from API endpoint
  useEffect(() => {
    const fetchInsults = async () => {
      try {
        const requests = [];

        for (let i = 0; i < 10; i++) {
          const url = `${INSULT_API}&t=${`Date.now()`}_${i}`;
          requests.push(Axios.get(url));
        }

        const results = await Promise.all(requests);

        const insultsList = results.map((r) => r.data.insult);

        setInsults(insultsList);
      } catch (error) {
        console.error("error: ", error);
      }
    };
    fetchInsults();
  }, []);

  return (
    <div class="text-blue-100 ...">
      <h1 class="text-4xl font-bold m-4">Click counter: {count}</h1>
      <p>Click here :3</p>
      <button class="text-blue-950 outline-3 bg-white outline-cyan-300 outline-solid rounded-lg p-2 m-4" onClick={() => setCount(count + 1)}>
        BUTTON
      </button>
      {insults.length > 0 && (
        <>
          <h2 class="text-2xl font-bold m-4"> FETCHED INSULTS </h2>
          <ul>
            {insults.map((insult, ind) => (
              <li key={ind}>{insult}</li>
            ))}
          </ul>
        </>
      )}
      <h1 class="text-3xl font-bold underline m-4">D3 lineplot</h1>
      <div class="flex justify-center" ref={plotRef}></div>
      <p></p>
      <h1 class="text-3xl font-bold underline m-4">THREE cube</h1>
      <div class="flex justify-center" style={{ padding: "20px" }}>
        <ThreeScene />
      </div>
    </div>
  );
}

export default App;
