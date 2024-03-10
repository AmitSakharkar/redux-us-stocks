import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectStocksData, selectAuthor, selectCategory, handleStocksDataFilter } from './stocksSlice';
import Moment from 'moment';
import Pagination from '@mui/material/Pagination';
import usePagination from "./pagination";
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import styles from './Stocks.module.css';
import DefaultImage from '../../assets/default-news.png';
// import StraightIcon from '@mui/icons-material/Straight';
function Stocks() {
    const dispatch = useDispatch();

    const stocks = useSelector(selectStocksData);
    const category = useSelector(selectCategory);
    const author = useSelector(selectAuthor);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [selectedAuthor, setSelectedAuthor] = useState([]);
    const [selectedSort, setSelectedSort] = useState([]);


    const PER_PAGE = 5;
    const count = Math.ceil(stocks.length / PER_PAGE);

    const handleChange = (e, p) => {
        _DATA.jump(p);
    };

    const handleCheckboxChanged = async (e) => {
        e.preventDefault();
        const {name, checked} = e.target;
        const userInput = name.split('-');
        if(userInput[0] === 'category') {
            const tempSelectedCategory = [...selectedCategory];
            checked ? tempSelectedCategory.push(userInput[1]) : tempSelectedCategory.splice(tempSelectedCategory.indexOf(userInput[1]), 1);
            await handleStocksDataUpdate();
            return setSelectedCategory([...new Set(tempSelectedCategory)]);
        } else if (userInput[0] === 'author') {
            const tempSelectedAuthor = [...selectedAuthor];
            checked ? tempSelectedAuthor.push(userInput[1]) : tempSelectedAuthor.splice(tempSelectedAuthor.indexOf(userInput[1]), 1);          
            await handleStocksDataUpdate();
            return setSelectedAuthor([...new Set(tempSelectedAuthor)]);
        } else {
            const tempSelectedSort = [...selectedSort];
            checked ? tempSelectedSort.push(name) : tempSelectedSort.splice(tempSelectedSort.indexOf(name), 1);            
            await handleStocksDataUpdate();
            return setSelectedSort([...new Set(tempSelectedSort)]);
        }
    }
    const handleStocksDataUpdate = () => {
        dispatch(handleStocksDataFilter(selectedCategory, selectedAuthor, selectedSort));
    };
    const _DATA = usePagination(stocks, PER_PAGE);

  return (
    <div className={styles['stocks-container']}>
        <div className={styles['filter-container']}>
            <div className={styles['filter-items']}>
                <label className={styles['filter-label']}>Category</label>
                <div className={styles['filter-checkboxes']}>
                    {category.length > 0 ?
                        <>
                            {category.map((c, i)=>
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label={c}
                                    onChange={handleCheckboxChanged}
                                    key={i}
                                    name={'category-'+c}
                                    checked={selectedCategory.indexOf(c) !== -1}
                                    value={c}
                                />
                            )}
                        </>
                    :''}
                </div>
                <label className={styles['filter-label']}>Author</label>
                <div className={styles['filter-checkboxes']}>
                    {author.length > 0 ?
                        <>
                            {author.map((c, i)=>
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label={c}
                                    onChange={handleCheckboxChanged}
                                    key={i}
                                    name={'author-'+c}
                                    checked={selectedAuthor.indexOf(c) !== -1}
                                    value={c}
                                />
                            )}
                        </>
                    :''}
                </div>
                <label className={styles['filter-label']}>Sort By</label>
                <div className={styles['filter-checkboxes']}>
                    <div>
                        <FormControlLabel
                            control={<Checkbox />}
                            label='Date'
                            name='date'
                            onChange={handleCheckboxChanged}
                            checked={selectedSort.indexOf('date') !== -1}
                            value='date'
                        />
                        {/* <StraightIcon fontSize="small" name='date-asc'/> */}
                    </div>
                    <div>
                        <FormControlLabel
                            control={<Checkbox />}
                            label='Title'
                            name='title'
                            onChange={handleCheckboxChanged}
                            checked={selectedSort.indexOf('title') !== -1}
                            value='title'
                        />
                        {/* <StraightIcon fontSize="small" name='title-asc'/> */}
                    </div>
                </div>
            </div>
        </div>
        <div>
            {_DATA.currentData().length > 0 ? _DATA.currentData().map((data, i) => (
                <div className={styles['stocks-details']}>
                    <div className={styles['stocks-details-header']}>
                        <img alt='' src={DefaultImage || data.url+''+data.image}  className={styles['stocks-details-img']}/>
                        <div className={styles['stocks-details-title']}>
                            <div className={styles['stocks-details-date']}>
                                <label>{Moment(data.date).format('LL')}</label>
                                <label>{data.source}</label>
                            </div>
                            <div className={styles['stocks-title']}>
                                <label>{data.title}</label>
                            </div>
                        </div>
                    </div>
                    <div className={styles['stocks-details-body']}>
                        {data.body}
                    </div>
                    <div className={styles['stocks-details-footer']}>
                        <label>{data.author}</label>
                    </div>
                </div>
            )): ''}
            <div  className={styles['bottom-pagination']}>
                <Stack spacing={2}>
                    <Pagination count={count} onChange={handleChange} color="secondary"/>
                </Stack>
            </div>
        </div>
    </div>
  );
}

export default Stocks;
