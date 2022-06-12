import React,{useEffect} from 'react'
import CartItem from './CartItem'
import { useDispatch,useSelector } from 'react-redux'
import { clearCart,calculateTotal } from '../features/cart/cartSlice'
import { openModal } from '../features/modal/modalSlice'


const CartContainer = () => {
    const {cartItems, amount, total} = useSelector((store) => store.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(calculateTotal())
    },[cartItems])

    if(amount<1){
        return(
            <section className='cart'>
                <h2>Your cart</h2>
                <h4 className='empty-cart'>is currently empty!!</h4>
            </section>
        )
    }
  return (
    <section className='cart'>
        <h2>
            Your cart
        </h2>
        <div>
            {cartItems.map((item) => {
                const{id} = item;
                return(
                    <CartItem key={id} {...item}/>
                )
            })}
        </div>
        <footer>
        <hr />
        <div className='cart-total'>
          <h4>
            total <span>${total}</span>
          </h4>
        </div>
        <button className='btn clear-btn' onClick={() => dispatch(openModal())}>clear cart</button>
      </footer>
    </section>
  )
}

export default CartContainer