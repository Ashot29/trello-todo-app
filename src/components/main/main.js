import React, { useState } from "react";
import List from "./list/list";
import Button from "@material-ui/core/Button";
import "./main.css";

function Main() {
  let [isButtonClicked, setIsButtonClicked] = useState(false);
  let element;
  if (!isButtonClicked) {
    element = <Button variant="outlined" style={{ backgroundColor: "#e0e0e0" }} onClick={() => console.log(1)}>+ ADD A LIST</Button>
  } else {
    element = <h1>Hello</h1>
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
