import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://mki-veikals.onrender.com/products")
      .then(res => res.json())
      .then(data => {
        console.log("DATA:", data); // debug
        setProducts(data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: "40px", background: "#f5f5f5", minHeight: "100vh" }}>
      <h2>Populārākie produkti</h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))",
        gap: "20px",
        marginTop: "20px"
      }}>
        {products.map(p => (
          <div key={p.id} style={{
            background: "#fff",
            padding: "15px",
            borderRadius: "12px",
            textAlign: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
          }}>
            <img
              src={p.img}
              alt={p.name}
              style={{ width: "100%", height: "180px", objectFit: "cover" }}
            />
            <h4>{p.name}</h4>
            <p>€ {p.price}</p>
            <button style={{
              background: "#d4a373",
              border: "none",
              padding: "10px 15px",
              borderRadius: "8px",
              cursor: "pointer"
            }}>
              Pievienot grozam
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
