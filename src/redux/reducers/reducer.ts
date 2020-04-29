const initialState = {
    currentUser: null,
    users: [],
    messages: [],
};

export function reducer(state = initialState, action) {
    switch(action.type) {
        case 'IS_CONNECTED':
            return {...state, isLoading: false};
        case 'ADD_USERS':
            return { ...state, users: action.payload};
        case 'SET_CURRENT_USER':
            return { ...state, currentUser: action.payload};
        case 'SET_MESSAGES':
            return {...state, messages: action.payload};
        default:
            return state;
    }
}