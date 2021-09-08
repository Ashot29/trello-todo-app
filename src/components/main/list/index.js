import React, { useState, useEffect } from "react";
import ListItem from "./listItem";
import { DEFAULT_URL } from "../../../stateManagement/url";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllUsers,
  getAllCards,
} from "../../../stateManagement/actions/fetchDataActionCreator";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./index.css";

export const fetchingAllCards = (url, dispatch) => {
  fetch(`${url}/cards`)
    .then((resp) => resp.json())
    .then((data) => {
      dispatch(getAllCards(data));
    });
};

export const fetchingAllLists = (url, dispatch) => {
  fetch(`${url}/lists`)
    .then((resp) => resp.json())
    .then((data) => {
      data.sort((a, b) => a.position - b.position);
      console.log(data, "first fetched data sorted");
      dispatch(fetchAllUsers(data));
    });
};

function List() {
  let lists = useSelector((state) => state.fetchData.lists);
  const [listsArray, updateListsArray] = useState(lists);
  let dispatch = useDispatch();

  useEffect(() => {
    updateListsArray(lists);
  }, [lists]);

  useEffect(() => {
    fetchingAllLists(DEFAULT_URL, dispatch);
  }, []);

  useEffect(() => {
    fetchingAllCards(DEFAULT_URL, dispatch);
  }, []);

  // function handleOnDragEnd(result) {
  //   // Can write logic, to PUT only changed lists, not all
  //   if (!result.destination) return;
  //   const items = JSON.parse(JSON.stringify(listsArray));
  //   const clone = JSON.parse(JSON.stringify(listsArray));
  //   const [reorderedItem] = items.splice(result.source.index, 1);
  //   items.splice(result.destination.index, 0, reorderedItem);
  //   items.forEach((item, index) => {
  //     let position = clone[index].position;
  //     if (item.position === position) return;
  //     fetch(`${DEFAULT_URL}/lists/${item.id}`, {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         position: position
  //       }),
  //     });
  //   });
  //   updateListsArray(items);
  // }

  return (
    <div className="list-content">
      {listsArray.map((list, index) => {
        return <ListItem key={list.id} id={list.id} title={list.title} />;
      })}
    </div>
  );
}

export default List;