import { useState } from "react";
import "../../index.css";

function App() {
  const [count, setCount] = useState(0);
  return (
    <>
    <main className="h-screen px-5 py-5 align-middle ">
    <p className="text-red-300">REGISTRATION</p>
        {Input("asdfasdf", "adsfasd")}
    </main>

    </>
  );
}

function Input(label, placeholder="") {
  return (
    <>
      <label for="{label}" className="text-left">{label}</label>
      <input id="{label}" className="block border-gray-50 rounded-s" placeholder={placeholder} label={label}></input>
    </>
  );
}
export default App;
