import { delay } from "../utils/delay";

interface top250Response {
    errorMessage: string;
    items: {
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
    }[]
}

export async function get_top_250(): Promise<top250Response['items']> {

    try {

        const request = await fetch('https://imdb-api.com/en/API/Top250Movies/k_o9issf8a');

        if (!request.ok) throw Error(await request.text());

        const top: top250Response = await request.json();

        return top.items

    } catch (err) {
        console.error(err);
        await delay(.5);
        return await get_top_250()
    }

}