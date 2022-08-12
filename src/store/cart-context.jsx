import React from 'react';

const CartContext = React.createContext({
    meals: [],
    total: 0,
    addMeal: (meal) => {},
    removeMeal: (id) => {},
    clearCart: () => {} 
});

export default CartContext;


