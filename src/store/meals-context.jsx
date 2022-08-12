import React from 'react'

const MealsContext = React.createContext({
    meals: [],
    isLoading: false,
    error: null
})

export default MealsContext;