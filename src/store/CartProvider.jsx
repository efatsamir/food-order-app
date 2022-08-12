import React, { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
    meals: [] ,
    total: 0 
}


const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        const updatedTotal = 
              state.total + (action.meal.amount * action.meal.price);
        
        const existingCartMealIndex = state.meals.findIndex(
            meal => meal.id === action.meal.id
        )

        const existingCartMeal = state.meals[existingCartMealIndex];
        let updatedMeals;
        if (existingCartMeal) {
            let updatedMeal = {
                ...existingCartMeal,
                amount: action.meal.amount + existingCartMeal.amount
            }

            updatedMeals = [...state.meals];
            updatedMeals[existingCartMealIndex] = updatedMeal;

        } else {
           updatedMeals = state.meals.concat(action.meal);
        }
       
        // localStorage.setItem('meals', JSON.stringify(updatedMeals) );
        return { meals: updatedMeals, total: updatedTotal}  
    }

    if(action.type === 'REMOVE') {
        const existingCartItemIndex = state.meals.findIndex(
            meal => meal.id === action.id
          );
      
          const existingItem = state.meals[existingCartItemIndex];
          const updatedTotal = state.total - existingItem.price ;
    
          let updatedMeals;
          if (existingItem.amount === 1) {
            updatedMeals = state.meals.filter(meal => meal.id !== action.id)
          } else {
             const updatedItem = { ...existingItem, amount: existingItem.amount-1 };
             updatedMeals= [ ...state.meals ];
             updatedMeals[existingCartItemIndex] = updatedItem;
          }
    
        //   localStorage.setItem('meals', JSON.stringify(updatedMeals) );
          return {
            meals: updatedMeals,
            total: updatedTotal
          }
    
    }

    if(action.type === 'CLEAR') {
        return defaultCartState;
    }

    return defaultCartState;
}


const CartProvider = (props) => {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);
   
    const addMealToCartHandler = meal => {
      dispatchCartAction({ type: 'ADD', meal: meal })
    }

    const removeMealFromCartHandler = id => {
        dispatchCartAction({ type: 'REMOVE', id: id }) 
    }

    const clearCartHandler = () => {
        dispatchCartAction({ type: 'CLEAR' });
    }


    const cartContext = {
        meals: cartState.meals,
        total: cartState.total,
        addMeal: addMealToCartHandler,
        removeMeal: removeMealFromCartHandler,
        clearCart: clearCartHandler
    }

    return (
       <CartContext.Provider value={cartContext} >
            { props.children }
       </CartContext.Provider >
    )
}

export default CartProvider
