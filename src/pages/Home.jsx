
import {useEffect,useState} from "react";
import {useCart} from "../CartContext";

export default function Home(){
 const [products,setProducts]=useState([]);
 const {add}=useCart();

 useEffect(()=>{
  fetch("http://localhost:5000/products")
   .then(r=>r.json()).then(setProducts);
 },[]);

 return(
  <>
   <div style={{background:"#000",color:"#fff",padding:"100px"}}>
    <h1>Premium aromāti</h1>
   </div>

   <div>
    {products.map(p=>(
     <div key={p.id}>
      {p.name} €{p.price}
      <button onClick={()=>add(p)}>Add</button>
     </div>
    ))}
   </div>
  </>
 );
}
