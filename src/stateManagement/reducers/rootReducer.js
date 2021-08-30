import { combineReducers } from "redux";
import isButtonClicked from "./isButtonClickedReducer";
import { fetchData } from "./fetchDataReducer";

export let rootReducer = combineReducers({
    isButtonClicked,
    fetchData
}) 