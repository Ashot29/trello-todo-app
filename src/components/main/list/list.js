import React, { useEffect } from 'react'
import ListItem from './listItem/listItem';
import { DEFAULT_URL } from './../../../stateManagement/url';
import { useDispatch } from 'react-redux';
import { fetchAllUsers, getAllCards } from '../../../stateManagement/actions/fetchDataActionCreator';
import { useSelector } from 'react-redux';
import './list.css'

function List() {
    let dispatch = useDispatch();
    let lists = useSelector(state => state.fetchData.lists);

    useEffect(() => {
        fetch(`${DEFAULT_URL}/lists`)
        .then(resp => resp.json())
        .then(data => {
            if (!data.length) return;
            dispatch(fetchAllUsers(data));
        })
    }, [])

    useEffect(() => {
        fetch(`${DEFAULT_URL}/cards`)
        .then(resp => resp.json())
        .then(data => {
            if (!data.length) return;
            dispatch(getAllCards(data));
        })
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
