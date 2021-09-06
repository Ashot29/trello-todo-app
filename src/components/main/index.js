import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeButtonState } from "../../stateManagement/actions/buttonActionCreator";
import List from "./list";
import ListForm from "./listForm";
import Button from "@material-ui/core/Button";
import "./index.css";

function Main() {
  let state = useSelector(state => state.isButtonClicked)
  let dispatch = useDispatch();

  function changeForm() {
    dispatch(changeButtonState())
  }

  let element;

  if (!state.isButtonClicked) {
    element = <Button variant="outlined" style={{ backgroundColor: "#e0e0e0" }} onClick={() => changeForm()}>+ ADD A LIST</Button>
  } else {
    element = <ListForm />
  }

  return (
    <div className="main-content">
        <div className="lists">
          <List />
          {element}
        </div>
    </div>
  );
}

export default Main;
