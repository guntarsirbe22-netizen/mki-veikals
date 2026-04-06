
import {createContext,useContext,useState,useEffect} from "react";
const C=createContext();

export function CartProvider({children}){
 const [cart,setCart]=useState(()=>{
  const s=localStorage.getItem("cart");
  return s?JSON.parse(s):[];
 });

 useEffect(()=>localStorage.setItem("cart",JSON.stringify(cart)),[cart]);

 const add=(p)=>{
  setCart(prev=>{
   const f=prev.find(x=>x.id===p.id);
   if(f)return prev.map(x=>x.id===p.id?{...x,qty:x.qty+1}:x);
   return [...prev,{...p,qty:1}];
  });
 };

 const changeQty=(id,d)=>{
  setCart(prev=>prev.map(x=>x.id===id?{...x,qty:Math.max(1,x.qty+d)}:x));
 };

 const total=cart.reduce((s,p)=>s+p.price*p.qty,0);

 return <C.Provider value={{cart,add,changeQty,total,setCart}}>{children}</C.Provider>;
}

export const useCart=()=>useContext(C);
