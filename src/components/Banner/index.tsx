import React, { useState } from 'react';
import { Input, IconButton, ListItem, List, ListItemButton, ListItemText } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import SearchIcon from '@mui/icons-material/Search';
import { MenuSharp } from '@mui/icons-material';
import { useActions } from 'kea';
import { logic } from '../SearchTable/SearchTableLogic';
import './style.css'

export function Banner() {

    const [open, setOpen] = useState(false);

    const { search_top_250, filter_top_250 } = useActions(logic)

    const toggleMenu = (): void => setOpen(!open)

    return (
        <div className='banner-div'>
            <IconButton onClick={toggleMenu} style={{ float: 'left', margin: 5 }} >
                <MenuSharp style={{ stroke: '#EEE', fill: '#EEE' }} />
            </IconButton>
            <span className='banner-heading' >IMDB Listings</span>
            <Input onChange={(e) => {
                const searchString: string = e.target.value;
                search_top_250(searchString)
            }} disableUnderline placeholder='Search...' style={{ float: 'right', backgroundColor: '#EEE', margin: 4, marginRight: 10, padding: 5, width: 200 }} endAdornment={<SearchIcon />} />
            <Drawer
                anchor='left'
                open={open}
                onClose={() => setOpen(false)}
            >
                <List style={{ width: 200 }}>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => filter_top_250(null)}>
                            <ListItemText primary={'Home'} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => filter_top_250({ favorite: true })} >
                            <ListItemText primary={'Favorites'} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
        </div>
    )
}