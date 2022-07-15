import { kea, MakeLogicType } from 'kea'
import { get_top_250 } from '../../api_calls/imdb_api';

// const key = process.env.imdb_key;

// console.log(key)

interface Values {
    loading: boolean,
    films: {
        requested_date: Date,
        list: any[]
    }
}

interface Props {
    id: string,
    field: string
}

interface Actions {
    sortByHeader: (field: string) => ({ field: string })
    top_250: (set: Values['films']) => ({ set: Values['films'] })
    toggleLoading: true;
    load_top_250: () => ({});
}

type myLogicType = MakeLogicType<Values, Actions, Props>

export const logic = kea<myLogicType>({
    actions: {
        // incrementCounter: true, // https://kea.js.org/docs/guide/concepts#actions
        // decrementCounter: true, // true is shorthand for a function that doesn't take any arguments
        // updateCounter: (newValue: number) => ({ newValue }),
        // sortByHeader: (field: string) => ({ field }),
        top_250: (set) => ({ set }),
        toggleLoading: true,
        load_top_250: () => ({})
    },
    listeners: ({ actions }) => ({
        load_top_250: async () => {
            const films = await get_top_250();
            actions.top_250({
                requested_date: new Date(),
                list: films
            })
        }
    }),
    reducers: {
        films: [
            {
                requested_date: new Date(),
                list: []
            }, // default value
            {
                top_250: (_, { set }) => ({ ...set })
            },
        ],
        loading: [
            false,
            {
                toggleLoading: (state: boolean) => !state
            }
        ]
    },
})