import React, { useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import { listItems, MovieModalProps } from 'types/imdb_types';
import { useActions } from 'kea';
import { logic } from '../imdbTileContainer/moveListLogic';
import './style.css';

export function MovieSummaryModal(props: MovieModalProps) {

    const { imDbRating, image, fullTitle, rank, crew, id, summary } = props;

    const { setSummary } = useActions(logic)

    const listItems = {
        Rating: imDbRating,
        Rank: rank,
        Crew: crew
    }

    useEffect(() => {
        if (props.open === true && summary === undefined) setSummary(id)
    })

    return (
        <Dialog open={props.open} onClose={() => props.setStatus()} fullWidth >
            <img className="summary-image" src={image} alt='Movie Display Image' />
            <div className='movie-modal-container'>
                <h3 className='movie-modal-title' >{fullTitle}</h3>
                {
                    Object.keys(listItems).map((key) => {
                        return <span className='movie-details' key={key} ><b>{key}</b>: {listItems[key as keyof listItems]}</span>
                    })
                }
                <span className='summary-span'>Summary</span>
                <p>{summary && summary.length ? summary : 'No summary was found on Wikipedia for this film'}</p>
            </div>
        </Dialog>
    )

}