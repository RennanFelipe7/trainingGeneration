import {configureStore} from '@reduxjs/toolkit'
import trainingDisplayCardReducer from '../slices/trainingDisplayCard'

const store = configureStore({
    reducer: {
        trainingDisplayCard: trainingDisplayCardReducer,
    },
})

export default store;
