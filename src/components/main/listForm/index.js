import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeButtonState } from "../../../stateManagement/actions/buttonActionCreator";
import { TextField } from "@material-ui/core";
import { fetchUsers } from "../../../stateManagement/actions/fetchDataActionCreator";
import Button from "@material-ui/core/Button";
import "./index.css";

function ListForm() {
  let dispatch = useDispatch();
  let [inputValue, setInputValue] = useState("");
  let lists = useSelector((state) => state.fetchData.lists);

  let buttonStyles = {
    marginTop: "12px",
    marginRight: "4px",
  };

  function changeForm() {
    dispatch(changeButtonState());
  }

  function addList() {
    if (lists.length === 0) {
      dispatch(fetchUsers(inputValue, 0));
      setInputValue("");
    } else {
      let length = lists.length;
      let pos = lists[length - 1].position + 1;
      dispatch(fetchUsers(inputValue, pos));
      setInputValue("");
    }
  }

  return (
    <form className="create-list" onSubmit={addList}>
      <TextField
        id="outlined-basic"
        label="Enter list title*"
        value={inputValue}
        variant="outlined"
        onChange={(event) => setInputValue(event.target.value)}
      />
      <div className="form-buttons">
        <Button
          variant="contained"
          style={buttonStyles}
          color="primary"
          onClick={addList}
        >
          Add List
        </Button>
        <Button style={buttonStyles} color="primary" onClick={changeForm}>
          X
        </Button>
      </div>
    </form>
  );
}

export default ListForm;
