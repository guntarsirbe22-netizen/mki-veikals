import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://mki-veikals.onrender.com/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>MKI Veikals</h1>
      <h2>Produkti</h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))",
        gap: "20px",
        marginTop: "20px"
      }}>
        {products.map(p => (
          <div key={p.id} style={{
            background: "#fff",
            padding: "15px",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
          }}>
            <img
              src={p.img}
              alt={p.name}
              style={{ width: "100%", height: "180px", objectFit: "cover" }}
            />

            <h3>{p.name}</h3>
            <p>€{p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
