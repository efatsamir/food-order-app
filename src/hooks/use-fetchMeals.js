import { useState, useCallback } from 'react'

const useFetchMeals = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

  const fetchMeals = useCallback(async (applyData) => {

      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch(process.env.REACT_APP_BACKEND_URI);
        if(!res.ok) throw new Error('Failed to fetch!');
        const resData = await res.json();
 
        let loadedMeals = [];
        for (const key in resData) {
           const mealItem = { 
             id: key, 
             name: resData[key].name,
             description: resData[key].description,
             price: resData[key].price
          }
          loadedMeals.push(mealItem);
        }

        applyData(loadedMeals);
        
     } catch(err) {
        setError(err.message || 'Something went wrong!');
     }

     setIsLoading(false);

  }, [])
   
    return {isLoading, error, fetchMeals}
}

export default useFetchMeals;