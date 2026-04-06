import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h2>Populārākie produkti</h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "20px",
        marginTop: "20px"
      }}>
        {products.map(p => (
          <div key={p.id} style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "12px",
            textAlign: "center"
          }}>
            <img src={p.image} style={{ width: "100%" }} />
            <h4>{p.name}</h4>
            <p>€ {p.price}</p>
            <button>Pievienot grozam</button>
          </div>
        ))}
      </div>
    </div>
  );
}
