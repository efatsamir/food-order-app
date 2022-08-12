import React, { useContext, useState, useEffect } from 'react';
import styles from './HeaderCartBtn.module.css';
import CartIcon from './../Cart/CartIcon';
import CartContext from './../../store/cart-context';


const HeaderCartBtn = (props) => {
   
   const cartCtx = useContext(CartContext);
   const { meals } = cartCtx;
   const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
   

   const numberOfCartItems = meals.reduce((curNumber, meal) => {
      return curNumber + meal.amount;
   }, 0);

   const btnClasses = `${styles.button} ${btnIsHighlighted ? styles.bump : ''}`;
   // const btnClasses = btnIsHighlighted ? `${styles.button} ${styles.bump}`: styles.button;

   useEffect(() => {
      if (meals.length === 0) return;
      setBtnIsHighlighted(true);

      const timer = setTimeout(() => setBtnIsHighlighted(false), 300);

      return () => {
        clearTimeout(timer)
      }
   }, [meals])

  

    return (
       <button className={btnClasses} onClick={props.onClick}>
          <span className={styles.icon}>
             <CartIcon />
          </span>
          <span>Your Cart</span>
          <span className={styles.badge}>{numberOfCartItems}</span>
       </button>


    )
}

export default HeaderCartBtn


// reduce => transform array of data into single value
//--- takes 2 args, callback fn(takes 2 args: current num. & item) & starting value