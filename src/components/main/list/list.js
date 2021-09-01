import React, { useEffect } from 'react'
import ListItem from './listItem/listItem';
import { DEFAULT_URL } from './../../../stateManagement/url';
import { useDispatch } from 'react-redux';
import { fetchAllUsers, getAllCards } from '../../../stateManagement/actions/fetchDataActionCreator';
import { useSelector } from 'react-redux';
import './list.css'

export const fetchingAllCards = (url, dispatch) => {
    fetch(`${url}/cards`)
        .then(resp => resp.json())
        .then(data => {
            if (!data.length) return;
            dispatch(getAllCards(data));
        })
}

export const fetchingAllLists = (url, dispatch) => {
    fetch(`${url}/lists`)
        .then(resp => resp.json())
        .then(data => {
            if (!data.length) return;
            dispatch(fetchAllUsers(data));
        })
}

function List() {
    let dispatch = useDispatch();
    let lists = useSelector(state => state.fetchData.lists);

    useEffect(() => {
        fetchingAllLists(DEFAULT_URL, dispatch)
    }, [])

    useEffect(() => {
        fetchingAllCards(DEFAULT_URL, dispatch)
    }, [])

    return (
        <div className='list-content'>
            {
                lists.map(list => {
                    return <ListItem key={list.id} id={list.id} title={list.title}/>
                })
            }
        </div>
    )
}

export default List
