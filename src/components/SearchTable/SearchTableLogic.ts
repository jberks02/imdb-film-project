import { kea, MakeLogicType } from 'kea'
import { imdbMovie } from 'types/imdb_types';
import { get_top_250 } from '../../api_calls/imdb_api';

// const key = process.env.imdb_key;

// console.log(key)

interface Values {
    loading: boolean,
    films: {
        requested_date: Date | null,
        list: imdbMovie[]
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
        top_250: (set) => ({ set }),
        toggleLoading: true,
        load_top_250: () => ({})
    },
    listeners: ({ actions }) => ({
        load_top_250: async () => {

            const loadData = async () => {
                const films = await get_top_250();
                const datedObject = {
                    requested_date: new Date(),
                    list: films
                }
                actions.top_250(datedObject);
                localStorage.setItem('imdbtop250', JSON.stringify(datedObject))
            }

            const now = new Date();

            const localIMDB: string | null = localStorage.getItem('imdbtop250')

            const films: Values['films'] = localIMDB === null ? { list: [], requested_date: null } : JSON.parse(localIMDB);

            if (films.requested_date !== null) {
                actions.top_250(films);
            } else {
                loadData()
                return;
            }

            const imdbDate = new Date(films.requested_date as Date);

            if (imdbDate.getDate() !== now.getDate() && imdbDate.getMonth() !== now.getMonth() && imdbDate.getFullYear() !== now.getFullYear()) loadData();


        }
    }),
    reducers: {
        films: [
            {
                requested_date: null,
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