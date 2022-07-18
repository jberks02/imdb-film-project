export interface imdbMovie {
    crew: string;
    fullTitle: string;
    id: string;
    imDbRating: string;
    imDbRatingCount: string;
    image: string;
    rank: string;
    title: string;
    year: string;
    favorite?: boolean;
    summary?: string;
}

export interface top250Response {
    errorMessage: string;
    items: imdbMovie[]
}

export interface TileProps extends imdbMovie {
    index: number;
    update_favorite: Function
}

export interface MovieModalProps extends imdbMovie {
    open: boolean,
    setStatus: Function
}

export interface listItems {
    Rating: string,
    Rank: string,
    Crew: string
}

export interface SummaryBody {
    imDbId: string;
    title: string;
    fullTitle: string;
    type: string;
    year: string;
    language: string;
    titleInLanguage: string;
    url: string;
    plotShort: {
        plainText: string
        html: string
    },
    plotFull: {
        plainText: string
        html: string
    },
    errorMessage: string
}