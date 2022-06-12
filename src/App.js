import React,{useEffect} from "react";
import CartContainer from "./components/CartContainer";
import Modal from "./components/Modal";
import Navbar from "./components/Navbar";
import {useSelector, useDispatch} from 'react-redux'
import {getCartItems} from './features/cart/cartSlice'

function App() {
  const {isModal} = useSelector((store) => store.modal)
  const {isLoading} = useSelector((store) => store.cart)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartItems());
  },[])
  if(isLoading) {
    return(
      <div className="loading">
        <h3>Loading...</h3>
      </div>
    )
  }

  return <main>
    {isModal &&
    <Modal/>}
    <Navbar/>
    <CartContainer/>
  </main>;
}
export default App;
