import React, { useContext, useState } from 'react';
import styles from './Cart.module.css';
import Modal from './../UI/Modal';
import CartContext from './../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';


const Cart = ({ hideCartHandler }) => {
    
    const [isCheckout, setIsCheckout ] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const { meals, total, clearCart } = useContext(CartContext);
    

    
     const cartItems = <ul className={styles['cart-items']}>
         { meals.map( meal => <CartItem key={meal.id} meal={meal} />) }
     </ul> 
     const hasItems = meals.length > 0;


     const orderHandler = () => {
        setIsCheckout(true)
     }
    
     const submitOrderHandler = async (userData) => {
         setIsSubmitting(true);
          await fetch('https://react-app-458ee-default-rtdb.firebaseio.com/orders.json',{
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                  user: userData,
                  orderedItems: meals

              })
          });
          setIsSubmitting(false);
          setDidSubmit(true);
          clearCart();   
     }
   

     const modalActions =  <div className={styles.actions}>
        <button className={styles['buttons--alt']} onClick={hideCartHandler}>Close</button>
        { hasItems &&  <button className={styles.button} onClick={orderHandler}>Order</button> } 
    </div> 
     
     const cartModalContent = <React.Fragment>
            {cartItems}
           <div className={styles.total}>
               <span>Total</span>
               <span>{total.toFixed(2)}</span>
           </div>
           { isCheckout && <Checkout  hideCartHandler={hideCartHandler} submitOrderHandler={submitOrderHandler } /> }
           { !isCheckout && modalActions }
           
     </React.Fragment>

     const isSubmittingModalContent = <p>Sending order data...</p>;
     const didSubmitModalContent =<React.Fragment>
          <p>Successfully sent the order</p>
          <div className={styles.actions}>
            <button className={styles.button} onClick={hideCartHandler}>Close</button> 
          </div> 
     </React.Fragment> 


    return (
        <Modal hideCartHandler={hideCartHandler}>
             { !isSubmitting && !didSubmit && cartModalContent }
             { isSubmitting && isSubmittingModalContent }
             { !isSubmitting && didSubmit && didSubmitModalContent }
        </Modal>

       
    )
}

export default Cart
