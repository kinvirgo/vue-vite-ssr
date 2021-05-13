export interface State {
    count: number;
    client: any[];
}

export interface Store {
    state: State;
    setState: (key: keyof State, data: any) => void;
    getState: (key: keyof State) => any;
}

let state: State;
const setState = function (key: keyof State, data: any) {
    state[key] = data;
};

const getState = function (key: keyof State) {
    return state[key];
};

export function createStore(data?: Record<string, any>) {
    console.log(">>> data", data);

    // @ts-ignore
    state = data || {
        count: 0,
        client: [],
    };

    return { state, setState, getState };
}

export function useStore() {
    return { state, setState, getState };
}
