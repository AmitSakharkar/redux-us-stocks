import React, { useEffect, useState } from 'react';
import Stocks from './features/usStocks/Stocks';
import NotFound from './features/notFound/NotFound';
import { useDispatch } from 'react-redux';
import { handleStocksData, setStocksData, setCategory, setAuthor } from './features/usStocks/stocksSlice';
import './App.css';

function App() {
  const  [isFetchFailed, setIsFetchFailed] = useState(true);
  const dispatch = useDispatch();
  const getStocksData = async () => {
    try {
    let url = 'https://dev-storm-rest-api.pantheonsite.io/api/v1/news';
    const response = await fetch(url);
    const data = await response.json();
        dispatch(handleStocksData(data));
        setIsFetchFailed(false);
    } catch (err) {
        dispatch(setStocksData([]));
        dispatch(setCategory([]));
        dispatch(setAuthor([]));
        setIsFetchFailed(true)
        console.log(err);
      }
    }
  useEffect(() => {    
    getStocksData();
  },[]);

  return (
    <div className="App">
      { isFetchFailed ? <NotFound /> : <Stocks />}
    </div>
  );
}

export default App;
