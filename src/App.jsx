
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

export default function App(){
 return(
  <BrowserRouter>
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/cart" element={<Cart/>}/>
    <Route path="/checkout" element={<Checkout/>}/>
   </Routes>
  </BrowserRouter>
 );
}
