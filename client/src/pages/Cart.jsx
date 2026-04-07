
import {useCart} from "../CartContext";
import {Link} from "react-router-dom";

export default function Cart(){
 const {cart,changeQty,total}=useCart();
 return(
  <div>
   {cart.map(p=>(
    <div key={p.id}>
     {p.name}
     <button onClick={()=>changeQty(p.id,-1)}>-</button>
     {p.qty}
     <button onClick={()=>changeQty(p.id,1)}>+</button>
    </div>
   ))}
   <h2>Total €{total}</h2>
   <Link to="/checkout">Checkout</Link>
  </div>
 );
}
