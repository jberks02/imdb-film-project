import React, { useState } from "react";
import { TileProps } from "../../types/imdb_types";
import { IconButton } from "@mui/material";
import { OpenInFull, Star, StarOutline } from '@mui/icons-material';
import { MovieSummaryModal } from "../MovieSummaryModal";
import './style.css'



export function MovieTile(props: TileProps) {

    const [open, setState] = useState(false);

    const { imDbRating, image, fullTitle, rank, favorite, update_favorite, index } = props

    const toggleOpen = (): void => setState(!open)

    return (
        <div className="tile">
            <div className='tile-title'>
                <IconButton style={{ float: 'left', padding: 5 }} onClick={() => { update_favorite(index) }}>
                    {favorite === true ? <Star style={{ fill: 'gold', stroke: 'gold', paddingRight: 5 }} /> : <StarOutline style={{ fill: 'gold', stroke: 'gold', paddingRight: 5 }} />}
                </IconButton>
                <span >{fullTitle}</span>
            </div>

            <div className="image-container">
                <img src={image} alt='Movie Display Image' />
                <ul style={{ listStyle: 'none', paddingLeft: 15, display: 'inline-block', width: '40%', verticalAlign: 'top' }}>
                    <li>Rating: {imDbRating}</li>
                    <li>Rank: {rank}</li>
                </ul>
            </div>
            <IconButton style={{ float: 'right' }} onClick={() => toggleOpen()}>
                <OpenInFull />
            </IconButton>
            <MovieSummaryModal open={open} {...props} setStatus={toggleOpen} />
        </div >
    )
}