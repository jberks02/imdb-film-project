import React, { useState } from 'react';
import ListItemText from '@mui/material/ListItemText';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Drawer from '@mui/material/Drawer';
import SearchIcon from '@mui/icons-material/Search';
import MenuSharp from '@mui/icons-material/MenuSharp';
import { useActions } from 'kea';
import { logic } from '../imdbTileContainer/moveListLogic';
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