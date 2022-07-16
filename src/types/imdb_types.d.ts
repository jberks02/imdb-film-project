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
}

export interface top250Response {
    errorMessage: string;
    items: imdbMovie[]
}