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

// change into this one function

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

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(listsArray);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    updateListsArray(items);

    // this can be used in changing list position
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="list-content" direction="horizontal">
        {(provided) => (
          <div
            className="list-content"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {listsArray.map((list, index) => {
              return (
                <Draggable
                  key={list.id}
                  draggableId={`${list.id}`}
                  index={index}
                >
                  {(provided) => (
                    <ListItem
                      id={list.id}
                      title={list.title}
                      provided={provided}
                      innerRef={provided.innerRef}
                    />
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default List;
