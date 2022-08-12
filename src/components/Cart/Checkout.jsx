import React, { useRef, useState } from 'react';
import styles from './Checkout.module.css';


const isEmpty = value => value.trim() === '';
const isFiveChars = value => value.trim().length === 5;

const Checkout = (props) => {

    const [formInputsValiditiy, setFormInputsValidity] = useState({
         name: true,
         street: true,
         city: true,
         postalCode: true

    });

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();


    const confirmHandler = (e) => {
       e.preventDefault();

       const enteredName = nameInputRef.current.value; 
       const enteredStreet = streetInputRef.current.value; 
       const enteredPostalCode = postalCodeInputRef.current.value; 
       const enteredCity = cityInputRef.current.value; 

       const enteredNameIsValid = !isEmpty(enteredName);
       const enteredStreetIsValid = !isEmpty(enteredStreet);
       const enteredPostalCodeIsValid = isFiveChars( enteredPostalCode);
       const enteredCityIsValid = !isEmpty(enteredCity);

       setFormInputsValidity({
        name: enteredNameIsValid,
        street:enteredStreetIsValid,
        city: enteredCityIsValid,
        postalCode: enteredPostalCodeIsValid
       });


      const formIsValid = 
        enteredNameIsValid && 
        enteredStreetIsValid && 
        enteredPostalCodeIsValid && 
        enteredCityIsValid;

        if (!formIsValid) {
            return;
        }

        // submit cart data 
        props.submitOrderHandler ({
          name: enteredName,
          street: enteredStreet,
          city: enteredCity,
          postalCode: enteredPostalCode 
        })

       
    }

    const nameControlClasses = `${styles.control} ${formInputsValiditiy.name?'': styles.invalid}`;
    const streetControlClasses = `${styles.control} ${formInputsValiditiy.street?'': styles.invalid}`;
    const cityControlClasses = `${styles.control} ${formInputsValiditiy.city?'': styles.invalid}`;
    const postalCodeControlClasses = `${styles.control} ${formInputsValiditiy.postalCode?'': styles.invalid}`;

    return (
        <form className={styles.form} onSubmit={confirmHandler}>
          <div className={nameControlClasses}>
            <label htmlFor='name'>Your Name</label>
            <input type='text' id='name' ref={nameInputRef} />
            { !formInputsValiditiy.name && <p>Please enter a valid name</p>}
          </div>
          <div className={streetControlClasses}>
            <label htmlFor='street'>Street</label>
            <input type='text' id='street' ref={streetInputRef} />
            { !formInputsValiditiy.street && <p>Please enter a valid street</p>}
          </div>
          <div className={postalCodeControlClasses}>
            <label htmlFor='postal'>Postal Code</label>
            <input type='text' id='postal' ref={postalCodeInputRef} />
            { !formInputsValiditiy.postalCode && <p>Please enter a valid postal code</p>}
          </div>
          <div className={cityControlClasses}>
            <label htmlFor='city'>City</label>
            <input type='text' id='city' ref={cityInputRef} />
            { !formInputsValiditiy.city && <p>Please enter a valid city</p>}
          </div>
          <div className={styles.actions}>
            <button type='button' onClick={props.hideCartHandler}>
              Cancel
            </button>
            <button className={styles.submit}>Confirm</button>
          </div>
        </form>
      );
}

export default Checkout
