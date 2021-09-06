import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { DEFAULT_URL } from './../../../../../stateManagement/url';
import { useDispatch } from 'react-redux';
import { fetchingAllCards } from '../../list';
import { openModal } from '../../../../../stateManagement/actions/modalActionCreator';
import './card.css'

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

export const deleteCard = (url, id, dispatch) => {
    fetch(`${url}/cards/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(() => {
            fetchingAllCards(url, dispatch)
        })
}

function handlingCardClick(event, id, url, dispatch, title, description) {
    if (!event.target.closest('button') || !event.target.closest('button').classList.contains('MuiIconButton-root')) {
        dispatch(openModal(title, id, description))
    } else {
        deleteCard(url, id, dispatch)
    }
}

export default function MediaCard({ title, id, provided, innerRef, description }) {
    let dispatch = useDispatch();
    const classes = useStyles();

    return (
        <>
            <div className='card-wrapper' {...provided.draggableProps} {...provided.dragHandleProps} ref={innerRef}>
                <Card className={classes.root} style={{ marginTop: '15px', marginBottom: '15px' }}
                    onClick={event => handlingCardClick(event, id, DEFAULT_URL, dispatch, title, description)}
                >
                    <CardContent style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                        <Typography gutterBottom variant="h5" component="h2">
                            {(title.length <= 13 && title) || title.slice(0, 13) + '...'}
                        </Typography>
                        <IconButton aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}