import { kea } from 'kea'

export const counterLogic = kea({
    actions: {
        incrementCounter: true, // https://kea.js.org/docs/guide/concepts#actions
        decrementCounter: true, // true is shorthand for a function that doesn't take any arguments
        updateCounter: (newValue: number) => ({ newValue }),
    },
    reducers: {
        count: [
            0, // default value
            {
                incrementCounter: (state: number) => state + 1,
                decrementCounter: (state: number) => state - 1,
                updateCounter: (_, { newValue }) => newValue, // ignore the state, set new value
            },
        ],
    },
})