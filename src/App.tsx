
import React from 'react'
import { hot } from 'react-hot-loader/root'
import { Banner } from './components/Banner/index'
import { SearchTable } from './components/imdbTileContainer';

export const App = hot(_App)
export function _App(): JSX.Element | null {
    return (
        <div>
            <Banner />
            <SearchTable />
        </div>
    )
}