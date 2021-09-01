import React, { useState } from 'react';
import MenuButton from './menuButton/menuButton';
import './listItem.css'
import { useDispatch } from 'react-redux';
import MediaCard from './card/card';
import CardForm from './cardForm/cardForm';
import Input from '@material-ui/core/Input';
import { useSelector } from 'react-redux';
import { DEFAULT_URL } from '../../../../stateManagement/url';
import { fetchingAllLists } from '../list';

const ListItem = (props) => {
    let [isClicked, setIsClicked] = useState(false);
    let { title, id } = props;
    let dispatch = useDispatch();
    let [value, setValue] = useState(title)
    let localCards = useSelector(state => state.fetchData.cards.filter(item => item.locatedAtList === id));

    let element = !isClicked ? 
    <div className='list-title' style={{ fontWeight: 700, fontSize: '20px', cursor: 'pointer' }} onClick={() => setIsClicked(!isClicked)}>{title}</div>:
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
        .then(() => fetchingAllLists(DEFAULT_URL, dispatch))
        setIsClicked(!isClicked)
        }}>
        <Input value={value} onChange={(e) => setValue(e.target.value)} inputProps={{ 'aria-label': 'description' }} />
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
