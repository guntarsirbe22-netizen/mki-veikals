const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const stripe = require("stripe")("sk_test_YOUR_KEY");

const app = express();

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("./db.sqlite");

// tables
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    price REAL,
    img TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    address TEXT,
    items TEXT,
    total REAL
  )`);
});

// seed
db.get("SELECT COUNT(*) as c FROM products", (err, row) => {
  if (row.c === 0) {
    const s = db.prepare(
      "INSERT INTO products (name, price, img) VALUES (?, ?, ?)"
    );

    s.run("Orange Nectar", 19.9, "https://images.unsplash.com/photo-1594035910387-fea47794261f");
    s.run("Granello", 19.9, "https://images.unsplash.com/photo-1615634260167-c8cdede054de");
    s.run("Baccarat", 27.9, "https://images.unsplash.com/photo-1585386959984-a41552231658");
    s.run("Aventis", 19.9, "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519");

    s.finalize();
  }
});

// routes
app.get("/products", (req, res) => {
  db.all("SELECT * FROM products", (err, rows) => {
    res.json(rows);
  });
});

app.post("/order", (req, res) => {
  const { name, address, items, total } = req.body;

  db.run(
    "INSERT INTO orders (name,address,items,total) VALUES (?,?,?,?)",
    [name, address, JSON.stringify(items), total],
    () => res.json({ success: true })
  );
});

// PORT FIX
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on", PORT));
