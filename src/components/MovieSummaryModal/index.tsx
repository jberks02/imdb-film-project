import React, { useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import { MovieModalProps } from 'types/imdb_types';
import { useActions } from 'kea';
import { logic } from '../imdbTileContainer/moveListLogic';
import Close from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';

import './style.css';

export function MovieSummaryModal(props: MovieModalProps) {

    const { imDbRating, image, fullTitle, rank, crew, id, summary } = props;

    const { setSummary } = useActions(logic)

    useEffect(() => {
        if (props.open === true && summary === undefined) setSummary(id)
    })

    return (
        <Dialog open={props.open} onClose={() => props.setStatus()} fullWidth >
            <div style={{ padding: '0px 32px 0px 32px' }}>
                <IconButton onClick={() => props.setStatus()} style={{ float: 'left', marginLeft: -20 }} >
                    <Close />
                </IconButton>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'center'
                }}>
                    <img className="summary-image" src={image} alt='Movie Display Image' />
                    <ul style={{ listStyle: 'none', maxWidth: 150 }} >
                        <li className='movie-details' ><b>Rating:</b> {imDbRating}</li>
                        <li className='movie-details' ><b>Rank:</b> {rank}</li>
                        <li className='movie-details' ><b>Crew:</b> {crew}</li>
                    </ul>

                </div>
                <div className='movie-modal-container'>
                    <h3 className='movie-modal-title' >{fullTitle}</h3>
                    {/* <span className='movie-details' ><b>Crew:</b> {crew}</span> */}
                    <span className='summary-span'>Summary</span>
                    {summary === undefined && <LinearProgress style={{ marginTop: 10 }} />}
                    <p>
                        {summary !== undefined && summary.length === 0 && 'No Summary was found on Wikipedia for this film.'}
                        {summary !== undefined && summary.length !== 0 && summary}
                    </p>

                </div>
            </div>
        </Dialog>
    )

}