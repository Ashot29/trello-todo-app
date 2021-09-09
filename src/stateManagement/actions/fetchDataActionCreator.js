import { DEFAULT_URL } from "../url";

export const fetchUsersRequest = () => {
  return {
    type: "FETCH_USERS_REQUEST",
  };
};

export const fetchUsersSucccess = (list) => {
  return {
    type: "FETCH_USERS_SUCCESS",
    payload: list,
  };
};

export const fetchAllUsers = (list) => {
  return {
    type: "FETCH_ALL_USERS",
    payload: list,
  };
};

export const fetchUsers = (title) => {
  return (dispatch) => {
    let data = {
      title,
      card_positions: []
    };
    dispatch(fetchUsersRequest());
    fetch(`${DEFAULT_URL}/lists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => dispatch(fetchUsersSucccess([data])));
  };
};

export const addCardsActionCreator = (data) => {
  return {
    type: "ADD_CARD",
    payload: data,
  };
};

export const addCard = (inputValue, locationListId) => {
  return (dispatch) => {
    let data = {
      title: inputValue,
      list_id: locationListId,
      description: "",
    };
    fetch(`${DEFAULT_URL}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data, 'data');
        fetch(`${DEFAULT_URL}/lists/${data.list_id}`)
        .then(resp => resp.json())
        .then(dataOfList => {
          fetch(`${DEFAULT_URL}/lists/${data.list_id}`, {
          method: 'PATCH',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({card_positions: [...dataOfList.card_positions, data.id]})
        })
        })
        dispatch(addCardsActionCreator(data));
      });
  };
};

export const getAllCards = (cards) => {
  return {
    type: "GET_ALL_CARDS",
    payload: cards,
  };
};
