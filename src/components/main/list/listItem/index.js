import React, { useState, useEffect } from "react";
import MenuButton from "./menuButton";
import "./index.css";
import { useDispatch } from "react-redux";
import MediaCard from "./card";
import CardForm from "./cardForm";
import Input from "@material-ui/core/Input";
import { useSelector } from "react-redux";
import { patchRequest } from "../../../../httpRequests/patchRequest";
import { fetchingAllLists } from "..";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import CardModal from "../../cardModal";

const ListItem = ({ title, id, innerRef, provided }) => {
  let [isClicked, setIsClicked] = useState(false);
  let [value, setValue] = useState(title);
  let localCards = useSelector((state) =>
    state.fetchData.cards.filter((item) => item.locatedAtList === id)
  );
  const [cardsArray, updateCardsArray] = useState(localCards);
  let dispatch = useDispatch();
  let patchingNewListName = patchRequest(dispatch, "lists");

  useEffect(() => {
    cardRenderingLogic(cardsArray, localCards, updateCardsArray);
  }, [localCards]);

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(cardsArray);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    updateCardsArray(items);
  }

  let element = !isClicked ? (
    <div
      className="list-title"
      style={{ fontWeight: 700, fontSize: "20px", cursor: "pointer" }}
      onClick={() => setIsClicked(!isClicked)}
    >
      {title}
    </div>
  ) : (
    <form
      noValidate
      autoComplete="off"
      onSubmit={() => {
        patchingNewListName({ title: value }, id, fetchingAllLists);
        setIsClicked(!isClicked);
      }}
    >
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        inputProps={{ "aria-label": "description" }}
      />
    </form>
  );

  return (
    <div
      className="list-item"
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={innerRef}
    >
      <div className="list-top">
        {element}
        <div>
          <MenuButton id={id} />
        </div>
      </div>
      <div className="button-and-cards">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="cards-container">
            {(provided) => (
              <div
                className="cards-container"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {!!cardsArray.length &&
                  cardsArray.map((card, index) => {
                    return (
                      <Draggable
                        key={card.id}
                        draggableId={`${card.id}`}
                        index={index}
                      >
                        {(provided) => (
                          <>
                            <MediaCard
                              provided={provided}
                              innerRef={provided.innerRef}
                              id={card.id}
                              title={card.title}
                              description={card.description}
                            />
                            <CardModal />
                          </>
                        )}
                      </Draggable>
                    );
                  })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <CardForm id={id} />
      </div>
    </div>
  );
};

export default ListItem;

function cardRenderingLogic(cardsArray, localCards, updateCardsArray) {
  let arr1 = [...cardsArray];
  let arr2 = [...localCards];
  arr1.sort((a, b) => {
    let fa = a.title.toLowerCase(),
      fb = b.title.toLowerCase();

    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
    return 0;
  });
  arr2.sort((a, b) => {
    let fa = a.title.toLowerCase(),
      fb = b.title.toLowerCase();

    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
    return 0;
  });
  if (arr1.length !== arr2.length) {
    updateCardsArray(arr2);
  } else if (true) {
    for (let i = 0; i < arr1.length; i++) {
      if (
        arr1[i].title !== arr2[i].title ||
        arr1[i].description !== arr2[i].description
      ) {
        updateCardsArray(arr2);
      }
    }
  }
}
