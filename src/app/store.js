import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import stocksReducer from '../features/usStocks/stocksSlice';

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    stocks: stocksReducer,
  },
});
