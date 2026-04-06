import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://mki-veikals.onrender.com/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h2>Produkti</h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "20px"
      }}>
        {products.map(p => (
          <div key={p.id} style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "12px"
          }}>
            <img src={p.img} style={{ width: "100%" }} />
            <h3>{p.name}</h3>
            <p>€{p.price}</p>
            <button>Pirkt</button>
          </div>
        ))}
      </div>
    </div>
  );
}
