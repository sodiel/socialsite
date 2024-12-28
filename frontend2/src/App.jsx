import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./index.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <main className="h-screen">

    </main>
  );
}

function Input(label, placeholder="") {
  return (
    <>
      <label for="" className="text-left">{label}</label>
      <input id="" className="block border-gray-50 rounded-s" placeholder={placeholder} label={label}></input>
    </>
  );
}
export default App;
