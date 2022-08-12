import React, { useContext } from 'react';
import styles from './CartItem.module.css';
import CartContext from './../../store/cart-context';

const CartItem = ({ meal }) => {
  
    const price = `$${meal.price.toFixed(2)}`;
    const { addMeal, removeMeal } = useContext(CartContext)
  
    return (
      <li className={styles['cart-item']}>
        <div>
          <h2>{meal.name}</h2>
          <div className={styles.summary}>
            <span className={styles.price}>{price}</span>
            <span className={styles.amount}>x {meal.amount}</span>
          </div>
        </div>
        <div className={styles.actions}>
          <button onClick={ () => removeMeal(meal.id) }>−</button>
          <button onClick={ () => addMeal({ ...meal, amount: 1 })}>+</button>
        </div>
      </li>
    );
  };
  
  export default CartItem;
