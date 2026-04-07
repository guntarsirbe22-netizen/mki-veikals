import { useState } from "react";

export default function Checkout() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const submit = () => {
    fetch("https://mki-veikals.onrender.com/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        address,
        items: [],
        total: 50
      })
    }).then(() => alert("Pasūtīts!"));
  };

  return (
    <div>
      <input placeholder="Vārds" onChange={e => setName(e.target.value)} />
      <input placeholder="Adrese" onChange={e => setAddress(e.target.value)} />

      <button onClick={submit}>Pasūtīt</button>
    </div>
  );
}
