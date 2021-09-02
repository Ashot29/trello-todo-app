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
import './card.css'

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

function deletingCardFromList(event, id, url, dispatch) {
    if (!event.target.closest('button') || !event.target.closest('button').classList.contains('MuiIconButton-root')) return;
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

export default function MediaCard({ title, id, provided, innerRef }) {
    let dispatch = useDispatch();
    const classes = useStyles();

    return (
        <div className='card-wrapper' {...provided.draggableProps} {...provided.dragHandleProps} ref={innerRef}>
            <Card className={classes.root} style={{ marginTop: '15px', marginBottom: '15px' }}
                onClick={event => deletingCardFromList(event, id, DEFAULT_URL, dispatch)}
            >
                <CardContent style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {(title.length <= 13 && title) || title.slice(0, 13) + '...'}
                    </Typography>
                    <IconButton aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </CardContent>
            </Card>
        </div>
    );
}