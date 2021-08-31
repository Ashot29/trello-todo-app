import React from 'react';
import MenuButton from './menuButton/menuButton';
import './listItem.css'
import MediaCard from './card/card';
import CardForm from './cardForm/cardForm';
import { useSelector } from 'react-redux';
import { CardContent } from '@material-ui/core';

const ListItem = (props) => {
    let { title, id } = props;
    let cards = useSelector(state => state.fetchData.cards);

    let localCards = cards.filter(item => item.locatedAtList === id)

    return (
        <div className="list-item">
            <div className='list-top'>
                <div className='list-title' style={{ fontWeight: 700, fontSize: '20px' }}>{title}</div>
                <div>
                    <MenuButton />
                </div>
            </div>
            <div className='button-and-cards'>
                <div className='cards-container'>
                    {
                        !!localCards.length &&
                        localCards.map(card => {
                            return <MediaCard key={card.id} title={card.title}/>
                        })
                    }
                </div>
                <CardForm id={id} />
            </div>
        </div>
    );
}

export default ListItem;
