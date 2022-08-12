import React, { useContext } from 'react';
import styles from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';
import MealsContext from '../../store/meals-context';
import Card from './../UI/Card';

const AvailableMeals = () => {

    const { meals, isLoading, error } = useContext(MealsContext);
    const mealsList =  meals.map(meal => <MealItem key={meal.id} meal={meal} />);

    if(isLoading) {
      return <div className={styles.spinner}></div>
    }

    if(error) {
      return (
      <div className={styles.error}>
         <h2>{error}</h2>
         <span>&#128546;</span>
         <span>&#128580;</span>
      </div>
      )
    }

    return (
        <section className={styles.meals}>
        <Card>
          <ul>{ mealsList  }</ul>
        </Card>
      </section>
    )
}

export default AvailableMeals
