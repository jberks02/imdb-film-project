import React, { useEffect, useState } from 'react';
import { useValues, useActions } from 'kea'
import { logic } from './SearchTableLogic';
import './style.css'

export function SearchTable() {

    const { load_top_250 } = useActions(logic);

    const { films } = useValues(logic)

    useEffect(() => {
        if (films.list.length === 0) load_top_250();
    })

    console.log('filsm: ', films)

    return (
        <div className='container'>

        </div>
    )
}