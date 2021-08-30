import { initialState } from "../store/initialState";

export function fetchData(state = initialState, action) {
    switch(action.type) {
        case 'FETCH_USERS_REQUEST':
            return {
                ...state,
                isLoading: true
            }
        case 'FETCH_USERS_SUCCESS':
            return {
                ...state,
                lists: [...state.lists, action.payload],
                isLoading: false,
            }
        default: return state
    }
}