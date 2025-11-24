import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
   <div style={{ textAlign: "center", marginTop:"40px" }}>
    <h1>Click counter: {count}</h1>
    <p>Click here :3</p>
    <button onClick={() => setCount(count + 1)}>BUTTON</button>
    <p>So here we are again React. It has been a bit but I have missed you dearly.</p>
   </div>
  );
}

export default App
