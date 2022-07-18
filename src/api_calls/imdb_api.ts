import { delay } from "../utils/delay";
import { SummaryBody, top250Response } from "../types/imdb_types";

export async function get_top_250(): Promise<top250Response['items']> {

    try {

        const request = await fetch('https://imdb-api.com/en/API/Top250Movies/k_u6ju51mq');

        if (!request.ok) throw Error(await request.text());

        const top: top250Response = await request.json();

        return top.items

    } catch (err) {
        console.error(err);
        await delay(1);
        return get_top_250();
    }

}

export async function get_summary_by_id(id: string): Promise<SummaryBody> {
    try {
        const request = await fetch(`https://imdb-api.com/API/Wikipedia/k_u6ju51mq/${id}`);

        if (!request.ok) throw Error(await request.text());

        const summary = await request.json() as SummaryBody

        return summary

    } catch (err) {
        console.error(err);
        await delay(1);
        return get_summary_by_id(id)
    }

}