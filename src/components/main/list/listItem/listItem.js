import React, { useState, useEffect } from 'react';
import MenuButton from './menuButton/menuButton';
import './listItem.css'
import { useDispatch } from 'react-redux';
import MediaCard from './card/card';
import CardForm from './cardForm/cardForm';
import Input from '@material-ui/core/Input';
import { useSelector } from 'react-redux';
import { DEFAULT_URL } from '../../../../stateManagement/url';
import { fetchingAllLists } from '../list';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const ListItem = ({ title, id, innerRef, provided }) => {
    let [isClicked, setIsClicked] = useState(false);
    let [value, setValue] = useState(title)
    let localCards = useSelector(state => state.fetchData.cards.filter(item => item.locatedAtList === id));
    const [cardsArray, updateCardsArray] = useState(localCards);
    let dispatch = useDispatch();

    useEffect(() => {
        if (cardsArray.length === localCards.length) return; // checking array equality
        updateCardsArray(localCards)
    }, [localCards])

    function handleOnDragEnd(result) {
        console.log(result)
        if (!result.destination) return;
        const items = Array.from(cardsArray);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        updateCardsArray(items);
    }

    let element = !isClicked ?
        <div className='list-title' style={{ fontWeight: 700, fontSize: '20px', cursor: 'pointer' }} onClick={() => setIsClicked(!isClicked)}>{title}</div> :
        <form noValidate autoComplete="off" onSubmit={() => {
            fetch(`${DEFAULT_URL}/lists/${id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: value
                })
            })
                .then(() => fetchingAllLists(DEFAULT_URL, dispatch));
            setIsClicked(!isClicked);
        }}>
            <Input value={value} onChange={(e) => setValue(e.target.value)} inputProps={{ 'aria-label': 'description' }} />
        </form>;

    return (
        <div className="list-item" {...provided.draggableProps} {...provided.dragHandleProps} ref={innerRef}>
            <div className='list-top'>
                {element}
                <div>
                    <MenuButton id={id} />
                </div>
            </div>
            <div className='button-and-cards'>
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId='cards-container'>
                        {(provided) => (
                            <div className='cards-container' {...provided.droppableProps} ref={provided.innerRef}>
                                {
                                    !!cardsArray.length &&
                                    cardsArray.map((card, index) => {
                                        return (
                                            <Draggable key={card.id} draggableId={`${card.id}`} index={index}>
                                                {(provided) => (
                                                    <MediaCard provided={provided} innerRef={provided.innerRef} id={card.id} title={card.title} />
                                                )}
                                            </Draggable>
                                        )
                                    })
                                }
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
                <CardForm id={id} />
            </div>
        </div>
    );
}

export default ListItem;
