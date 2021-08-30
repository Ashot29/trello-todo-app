import React, { useEffect } from 'react'
import './list.css'
import { DEFAULT_URL } from './../../../stateManagement/url';

function List() {
    useEffect(() => {
        fetch(`${DEFAULT_URL}/lists`)
        .then(resp => resp.json())
        .then(data => console.log(data))
    }, [])

    return (
        <div className='list'>
            
        </div>
    )
}

export default List
