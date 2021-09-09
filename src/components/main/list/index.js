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
      dispatch(fetchAllUsers(data));
    });
};

function List() {
  let lists = useSelector((state) => state.fetchData.lists);
  let cards = useSelector((state) => state.fetchData.cards);
  let [queue, setQueue] = useState([]);
  let [listsArray, setListsArray] = useState(lists);
  let dispatch = useDispatch();

  useEffect(() => {
    setListsArray(lists);
  }, [lists]);

  // useEffect(() => {
  //   console.log(1)
  // }, [cards])

  useEffect(() => {
    fetchingAllLists(DEFAULT_URL, dispatch);
    fetchingAllCards(DEFAULT_URL, dispatch);
    fetch(`${DEFAULT_URL}/list_positions`)
      .then((resp) => resp.json())
      .then((data) => {
        setQueue([...data]);
      })
  }, []);

  useEffect(() => {
    fetch(`${DEFAULT_URL}/lists`)
    .then(resp => resp.json())
    .then(data => {
      let arr = [];
      queue.forEach(item => {
        arr.push(data.find(dat => dat.id === item))
      })
      setListsArray(JSON.parse(JSON.stringify(arr)))
    })
  }, [queue])

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    fetch(`${DEFAULT_URL}/cards/${draggableId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ list_id: +destination.droppableId }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        // fetchingAllCards(DEFAULT_URL, dispatch)
      });

    console.log(result);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="list-content">
        {listsArray.map((list, index) => {
          return <ListItem key={list.id} id={list.id} title={list.title} />;
        })}
      </div>
    </DragDropContext>
  );
}

export default List;
