
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
db.get("SELECT COUNT(*) as c FROM products", (e,r)=>{
 if(r.c===0){
  const s=db.prepare("INSERT INTO products (name,price,img) VALUES (?,?,?)");
  s.run("Orange Nectar",19.9,"");
  s.run("Granello",19.9,"");
  s.run("Baccarat",27.9,"");
  s.run("Aventis",19.9,"");
  s.finalize();
 }
});

app.get("/products",(req,res)=>{
 db.all("SELECT * FROM products",(e,rows)=>res.json(rows));
});

app.get("/orders",(req,res)=>{
 db.all("SELECT * FROM orders",(e,rows)=>res.json(rows));
});

app.post("/order",(req,res)=>{
 const {name,address,items,total}=req.body;
 db.run("INSERT INTO orders (name,address,items,total) VALUES (?,?,?,?)",
 [name,address,JSON.stringify(items),total],
 ()=>res.json({success:true}));
});

// stripe
app.post("/create-payment", async (req,res)=>{
 const session = await stripe.checkout.sessions.create({
  payment_method_types:["card"],
  line_items:req.body.items.map(i=>({
   price_data:{
    currency:"eur",
    product_data:{name:i.name},
    unit_amount:i.price*100
   },
   quantity:i.qty
  })),
  mode:"payment",
  success_url:"http://localhost:5173/success",
  cancel_url:"http://localhost:5173/cart"
 });
 res.json({url:session.url});
});

app.listen(5000,()=>console.log("Server running 5000"));
