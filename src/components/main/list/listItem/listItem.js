import React, { useState } from 'react';
import MenuButton from './menuButton/menuButton';
import './listItem.css'
import MediaCard from './card/card';
import CardForm from './cardForm/cardForm';
import Input from '@material-ui/core/Input';
import { useSelector } from 'react-redux';

const ListItem = (props) => {
    let [isClicked, setIsClicked] = useState(false)
    let { title, id } = props;
    let localCards = useSelector(state => state.fetchData.cards.filter(item => item.locatedAtList === id));

    let element = !isClicked ? 
    <div className='list-title' style={{ fontWeight: 700, fontSize: '20px', cursor: 'pointer' }} onClick={() => setIsClicked(!isClicked)}>{title}</div>:
    <form noValidate autoComplete="off" onSubmit={() => setIsClicked(!isClicked)}>
        <Input defaultValue={title} inputProps={{ 'aria-label': 'description' }} />
    </form>;

    return (
        <div className="list-item">
            <div className='list-top'>
                {element}
                <div>
                    <MenuButton id={id}/>
                </div>
            </div>
            <div className='button-and-cards'>
                <div className='cards-container'>
                    {
                        !!localCards.length &&
                        localCards.map(card => {
                            return <MediaCard key={card.id} id={card.id} title={card.title}/>
                        })
                    }
                </div>
                <CardForm id={id} />
            </div>
        </div>
    );
}

export default ListItem;
