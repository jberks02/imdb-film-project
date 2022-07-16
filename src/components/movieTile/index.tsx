import React from "react";
import { imdbMovie } from "../../types/imdb_types";
import { IconButton } from "@mui/material";
import { Star, StarBorder } from '@mui/icons-material';
import './style.css'


export function MovieTile(props: imdbMovie) {
    const { id, imDbRating, imDbRatingCount, image, fullTitle, crew, rank, year, favorite } = props

    return (
        <div className="tile">
            <div className='tile-title'>
                <IconButton style={{ float: 'left', paddingLeft: 0 }}>
                    {favorite ? <Star /> : <StarBorder />}
                </IconButton>
                <span style={{ lineHeight: 2.5 }}>{fullTitle}</span>
            </div>

            <div className="image-container">
                <img src={image} alt='Movie Display Image' className='imageContainer' />
            </div>
            <ul>
                <li>Rating: {imDbRating}</li>
                {/* <li>PlaceMent: {imDbRatingCount}</li> */}

            </ul>

        </div >
    )
}