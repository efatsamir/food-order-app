import React, { useRef } from 'react';
import styles from './MealItemForm.module.css';
import Input from '../../UI/Input';



const MealItemForm = ({ addToCartHandler }) => {

    const  amountInputRef = useRef();

    const submitHandler = e => {
        e.preventDefault();
        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount; 

        addToCartHandler(enteredAmountNumber);
    }

    return (
       <form className={styles.form} onSubmit={submitHandler}>
           <Input 
              label='Amount'
               ref={amountInputRef}
               input={{
               id: 'amount',
               type:"number",
               min: '1',
               max: '5',
               step:'1',
               defaultValue: '1'

            }} />
           <button>+ Add</button>
          
       </form>
    )
}

export default MealItemForm
