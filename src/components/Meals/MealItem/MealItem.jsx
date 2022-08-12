import React, { useContext } from 'react';
import styles from './MealItem.module.css';
import MealItemForm from './MealItemForm';
import CartContext from './../../../store/cart-context';


const MealItem = ({ meal }) => {

    const cartCtx = useContext(CartContext);
    
    const addToCartHandler = amount => {
        cartCtx.addMeal({
             id: meal.id,
             name: meal.name,
             amount: amount,
             price: meal.price
         }) 
     }

    const mealPrice = `$${meal.price.toFixed(2)}`;
    return (
        <li className={styles.meal}>
            <div>
                <h3>{meal.name}</h3>
                <div className={styles.description}>{meal.description}</div>
                <div className={styles.price}>{mealPrice}</div>
            </div>
            <div>
               <MealItemForm  addToCartHandler={addToCartHandler} />
            </div>
        </li>
   
    )
}

export default MealItem
