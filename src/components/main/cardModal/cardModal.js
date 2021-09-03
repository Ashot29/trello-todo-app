import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Button } from '@material-ui/core';
import { changeModalState } from '../../../stateManagement/actions/buttonActionCreator';
import './cardModal.css'
import { DEFAULT_URL } from '../../../stateManagement/url';
import { deleteCard } from '../list/listItem/card/card';
import { fetchingAllCards } from '../list/list';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function CardModal({ title, id }) {
  const classes = useStyles();
  let [desc, setDesc] = useState('');
  let [titleValue, setTitleValue] = useState(title)
  let state = useSelector(state => state.isButtonClicked)
  let dispatch = useDispatch();

  const handleClose = () => {
    dispatch(changeModalState())
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={state.modalIsOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={state.modalIsOpen}>
          <div className={classes.paper}>
            <form className='card-modal-form'>
              <div className="title-div">
                <TextField
                  style={{ width: '80%', marginBottom: '10px' }}
                  required
                  id="outlined-required"
                  label="Title*"
                  variant="outlined"
                  value={titleValue}
                  onChange={evt => setTitleValue(evt.target.value)}
                />
                <Button onClick={() => handleClose()}>X</Button>
              </div>
              <div className='card-description'>
                <TextField
                  id="outlined-basic"
                  label="Card Description"
                  style={{ width: '100%' }}
                  variant="outlined"
                  onChange={event => setDesc(event.target.value)}
                />
              </div>
              <div className="card-modal-buttons">
                <Button
                  variant="contained"
                  style={{ marginRight: '5px' }}
                  color="primary"
                  onClick={() => {
                    console.log(1);
                    let data = {
                      title: titleValue,
                      description: desc
                    }
                    updatingCard(id, dispatch, data)
                  }}
                >
                  SAVE ALL CHANGES
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    deleteCard(DEFAULT_URL, id, dispatch);
                    handleClose()
                  }}
                >DELETE CARD
                </Button>
              </div>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

function updatingCard(id, dispatch, obj) {
  fetch(`${DEFAULT_URL}/cards/${id}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: obj.title,
      description: obj.description
    })
  })
    .then(() => fetchingAllCards(DEFAULT_URL, dispatch));
}
