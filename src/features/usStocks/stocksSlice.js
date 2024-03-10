import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  stocksData: [],
  stocksDataBackup: [],
  stocksErrorData: [],
  category: [],
  author: [],
};

export const stocksSlice = createSlice({
  name: 'stocks',
  initialState,
  reducers: {
    setStocksData: (state, action) => {
      state.stocksData = action.payload;
    },
    setStocksDataBackup: (state, action) => {
      state.stocksDataBackup = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setAuthor: (state, action) => {
      state.author = action.payload;
    },
    filterStocksData: (state, action) => {
      state.stocksData = null;
    },
    sortStocksData: (state, action) => {
      state.stocksData = null;
    }
  },
})

export const { setStocksData, setCategory, setAuthor, filterStocksData, sortStocksData, setStocksDataBackup } = stocksSlice.actions;

export const selectStocksData = (state) => state.stocks.stocksData;
export const stocksDataBackup = (state) => state.stocks.stocksDataBackup;
export const selectCategory = (state) => state.stocks.category;
export const selectAuthor = (state) => state.stocks.author;

export const handleStocksData = (data) => (dispatch) => {
    const tempCategory = data.map((item) => item.source);
    const tempAuthor = data.map((item) => item.author);
    const category = [...new Set(tempCategory)];
    const author = [...new Set(tempAuthor)];
    dispatch(setStocksData(data));
    dispatch(setStocksDataBackup(data));
    dispatch(setCategory(category));
    dispatch(setAuthor(author));
};

export const handleStocksDataFilter = (selectedCategory, selectedAuthor, selectedSort) => (dispatch, getState) => {
  const currentStocksData = stocksDataBackup(getState());

  console.log('selectedCategory ===> ', selectedCategory.length);
  console.log('selectedAuthor ===> ', selectedAuthor.length);
  console.log('selectedSort ===> ', selectedSort.length);

  if (selectedCategory.length < 1 && selectedAuthor.length < 1 && selectedSort.length < 1) {
    dispatch(setStocksData(currentStocksData))
  } else {
    let condition = '';
    if (selectedCategory.length > 0) {
      condition += '&& selectedCategory.includes(stuff.source)' 
    }
    if (selectedAuthor.length > 0) {
      condition += '&& selectedAuthor.includes(stuff.author)' 
    }

    const finalCondition=condition.substring(2, condition.length);
    const fArray=currentStocksData.filter(stuff => eval(finalCondition));
    dispatch(setStocksData(fArray));
    console.log('filtered array ===> ', fArray)

  }
}

export default stocksSlice.reducer