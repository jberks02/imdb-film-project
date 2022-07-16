import React, { useEffect, useState } from 'react';
import { useValues, useActions } from 'kea'
import { logic } from './SearchTableLogic';
import './style.css'
import { MovieTile } from '../movieTile/index';

export function SearchTable() {

    const [filterString, setFilter] = useState('')

    const { load_top_250, favorite_toggle } = useActions(logic);

    const { films, loading } = useValues(logic)

    useEffect(() => {
        if (films.list.length === 0 && films.requested_date === null) load_top_250();
    })

    return (
        <div className='container'>
            {
                films.list.length > 0 &&
                films.list.map((film, i) => <MovieTile
                    key={film.id + i}
                    {...film}
                    update_favorite={favorite_toggle}
                    index={i}
                />)
            }
        </div>
    )
}