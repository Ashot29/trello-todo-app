import { DEFAULT_URL } from '../url';

export const fetchUsersRequest = () => {
    return {
        type: 'FETCH_USERS_REQUEST'
    }
} 

export const fetchUsersSucccess = (list) => {
    return {
        type: "FETCH_USERS_SUCCESS",
        payload: list
    }
}

export const fetchUsers = (title) => {
    return (dispatch) => {
        let data = {
            title,
            cards: [],
        }
        dispatch(fetchUsersRequest());
        fetch(`${DEFAULT_URL}/lists`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
        .then(response => response.json())
        .then(data => dispatch(fetchUsersSucccess(data)))
    }
}