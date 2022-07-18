import { kea, MakeLogicType } from 'kea'
import { imdbMovie } from 'types/imdb_types';
import { get_top_250, get_summary_by_id } from '../../api_calls/imdb_api';

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
    favorite_toggle: (index: number) => ({ index: number })
    search_top_250: (search: string) => ({ search: string })
    filter_top_250: (filter: Partial<imdbMovie> | null) => ({ filter: Partial<imdbMovie> | null })
    setSummary: (id: string) => ({ id: string });
}

type myLogicType = MakeLogicType<Values, Actions, Props>

export const logic = kea<myLogicType>({
    actions: {
        top_250: (set) => ({ set }),
        toggleLoading: true,
        load_top_250: () => ({}),
        favorite_toggle: (index) => ({ index }),
        search_top_250: (search) => ({ search }),
        filter_top_250: (filter) => ({ filter }),
        setSummary: (id) => ({ id })
    },
    listeners: ({ actions }) => ({
        setSummary: async ({ id }) => {

            const set: Values['films'] = JSON.parse(localStorage.getItem('imdbtop250') as string);

            const idIndex = set.list.findIndex((y) => y.id === id);

            if (idIndex === -1) throw Error('Invalid id sent to setSummary action.')

            if (typeof set.list[idIndex].summary === 'string') return;
            else {
                const summaryFull = await get_summary_by_id(id);

                set.list[idIndex].summary = summaryFull.plotShort.plainText;

                actions.top_250(set);

            }



        },
        load_top_250: async () => {

            const loadData = async () => {
                const films = await get_top_250();
                const datedObject = {
                    requested_date: new Date(),
                    list: films
                }
                const protoFavoriteList = localStorage.getItem('favorites');
                if (protoFavoriteList !== null) {
                    const favoriteList = JSON.parse(protoFavoriteList);
                    datedObject.list.forEach((im) => {
                        im.favorite = favoriteList[im.id]
                    })
                }
                actions.top_250(datedObject);
                localStorage.setItem('imdbtop250', JSON.stringify(datedObject))
            }

            const now = new Date();

            const localIMDB: string | null = localStorage.getItem('imdbtop250')

            const films: Values['films'] = localIMDB === null ? { list: [], requested_date: null } : JSON.parse(localIMDB);

            if (films.requested_date !== null && films.list.length !== 0) {
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
                top_250: (_, { set }) => ({ ...set }),
                favorite_toggle: (state, { index }) => {
                    state.list[index].favorite = state.list[index].favorite === true ? false : true;
                    const master_set: Values['films'] = JSON.parse(localStorage.getItem('imdbtop250') as string);
                    const keyedFavoritesList: Record<string, boolean> = state.list.reduce((acc: Record<string, boolean>, it) => {
                        if (it.favorite === true) acc[it.id] = true;
                        return acc;
                    }, {});
                    master_set.list[index].favorite = state.list[index].favorite
                    localStorage.setItem('favorites', JSON.stringify(keyedFavoritesList));
                    localStorage.setItem('imdbtop250', JSON.stringify(master_set))
                    return { ...state }
                },
                search_top_250: (_, { search }) => {
                    const set: Values['films'] = JSON.parse(localStorage.getItem('imdbtop250') as string);
                    return {
                        ...set,
                        list: set.list.filter((y) => {
                            return y.fullTitle.toLowerCase().includes(search.toLowerCase());
                        })
                    }
                },
                filter_top_250: (_, { filter }) => {

                    const set: Values['films'] = JSON.parse(localStorage.getItem('imdbtop250') as string);

                    if (filter === null) return { ...set }

                    return {
                        ...set,
                        list: set.list.filter((y) => {
                            let conforming = false;

                            for (const key in filter) {
                                conforming = y[key as keyof imdbMovie] === filter[key as keyof imdbMovie]
                            }

                            return conforming

                        })
                    }

                }
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