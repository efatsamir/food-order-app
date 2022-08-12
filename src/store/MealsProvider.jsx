import React, {useEffect, useState} from 'react';
import MealsContext from './meals-context';
import useFetchMeals from './../hooks/use-fetchMeals';


const MealsProvider = props => {

   const [data, setData] = useState([]);
   const { isLoading, error, fetchMeals } = useFetchMeals();
   

   useEffect(() => {
    fetchMeals(res => setData(res));
   }, [fetchMeals])

  
    
    const mealsCtx = {
        meals: data,
        isLoading: isLoading,
        error: error
    };

    return (
      <MealsContext.Provider value={mealsCtx}>
           { props.children }
      </MealsContext.Provider>
    )
}

export default MealsProvider

  // const Dummy_Meals = [
    //     {
    //         id: 'm1',
    //         name: 'Sushi',
    //         description: 'Finest fish and veggies',
    //         price: 22.99,
    //       },
    //       {
    //         id: 'm2',
    //         name: 'Schnitzel',
    //         description: 'A german specialty!',
    //         price: 16.5,
    //       },
    //       {
    //         id: 'm3',
    //         name: 'Barbecue Burger',
    //         description: 'American, raw, meaty',
    //         price: 12.99,
    //       },
    //       {
    //         id: 'm4',
    //         name: 'Green Bowl',
    //         description: 'Healthy...and green...',
    //         price: 18.99,
    //       }
    // ]