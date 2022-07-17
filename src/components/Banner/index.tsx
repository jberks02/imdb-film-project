import React from 'react';
import { Input } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useActions } from 'kea';
import { logic } from '../SearchTable/SearchTableLogic';
import './style.css'

export function Banner() {

    const { search_top_250 } = useActions(logic)

    return (
        <div className='banner-div'>
            <span className='banner-heading' >IMDB Listings</span>
            <Input onChange={(e) => {
                const searchString: string = e.target.value;
                search_top_250(searchString)
            }} disableUnderline placeholder='Search...' style={{ float: 'right', backgroundColor: '#EEE', margin: 4, marginRight: 10, padding: 5, width: 200 }} endAdornment={<SearchIcon />} />
        </div>
    )
}