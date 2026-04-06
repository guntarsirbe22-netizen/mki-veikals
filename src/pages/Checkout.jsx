
import {useCart} from "../CartContext";
import {useState} from "react";

export default function Checkout(){
 const {cart,total,setCart}=useCart();
 const [name,setName]=useState("");
 const [address,setAddress]=useState("");

 const pay=async()=>{
  const r=await fetch("http://localhost:5000/create-payment",{
   method:"POST",
   headers:{"Content-Type":"application/json"},
   body:JSON.stringify({items:cart})
  });
  const d=await r.json();
  window.location=d.url;
 };

 const order=async()=>{
  await fetch("http://localhost:5000/order",{
   method:"POST",
   headers:{"Content-Type":"application/json"},
   body:JSON.stringify({name,address,items:cart,total})
  });
  setCart([]);
  alert("Order done");
 };

 return(
  <div>
   <input placeholder="name" onChange={e=>setName(e.target.value)}/>
   <input placeholder="address" onChange={e=>setAddress(e.target.value)}/>
   <button onClick={order}>Order</button>
   <button onClick={pay}>Pay with card</button>
  </div>
 );
}
