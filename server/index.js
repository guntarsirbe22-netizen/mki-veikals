const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const stripe = require("stripe")("sk_test_YOUR_KEY"); // ieliec savu key

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// database
const db = new sqlite3.Database("./db.sqlite");

// create tables
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

// seed products
db.get("SELECT COUNT(*) as c FROM products", (err, row) => {
  if (err) return console.error(err);

  if (row.c === 0) {
    const stmt = db.prepare(
      "INSERT INTO products (name, price, img) VALUES (?, ?, ?)"
    );

    stmt.run("Orange Nectar", 19.9, "https://images.unsplash.com/photo-1594035910387-fea47794261f");
    stmt.run("Granello Poise", 19.9, "https://images.unsplash.com/photo-1615634260167-c8cdede054de");
    stmt.run("Baccarat Rouge", 27.9, "https://images.unsplash.com/photo-1585386959984-a41552231658");
    stmt.run("Aventis", 19.9, "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519");

    stmt.finalize();
  }
});

// routes

// get products
app.get("/products", (req, res) => {
  db.all("SELECT * FROM products", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// get orders (admin)
app.get("/orders", (req, res) => {
  db.all("SELECT * FROM orders", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// create order
app.post("/order", (req, res) => {
  const { name, address, items, total } = req.body;

  db.run(
    "INSERT INTO orders (name, address, items, total) VALUES (?, ?, ?, ?)",
    [name, address, JSON.stringify(items), total],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, orderId: this.lastID });
    }
  );
});

// stripe payment
app.post("/create-payment", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: req.body.items.map((i) => ({
        price_data: {
          currency: "eur",
          product_data: { name: i.name },
          unit_amount: i.price * 100,
        },
        quantity: i.qty,
      })),
      mode: "payment",
      success_url: "https://mki-veikals.vercel.app/success",
      cancel_url: "https://mki-veikals.vercel.app/cart",
    });

    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// IMPORTANT: port fix for Render
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on", PORT));
