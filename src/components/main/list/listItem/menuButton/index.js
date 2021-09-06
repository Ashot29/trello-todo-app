import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import { DEFAULT_URL } from '../../../../../stateManagement/url';
import { fetchingAllLists } from '../..';
import { useDispatch } from 'react-redux';
import { fetchingAllCards } from '../..';

function deleteListWithItsCards(url, id, dispatch) {
  fetch(`${url}/lists/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then(() => {
      fetch(`${url}/cards?locatedAtList=${id}`)
        .then(resp => resp.json())
        .then(data => {
          fetchingAllLists(url, dispatch);
          data.forEach(item => {
            fetch(`${url}/cards/${item.id}`, {
              method: "DELETE",
              headers: {
                'Content-Type': 'application/json'
              }
            })
            .then(() => fetchingAllCards(url, dispatch))
          })
        })
    })
}

export default function MenuButton({ id }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  let dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>
        <b>...</b>
      </Button>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={() => {
          deleteListWithItsCards(DEFAULT_URL, id, dispatch)
          handleClose();
        }}>
          Delete This List
        </MenuItem>
        <MenuItem onClick={() => handleClose()}>Move This List</MenuItem>
      </Menu>
    </>
  );
}