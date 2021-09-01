import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import { DEFAULT_URL } from '../../../../../stateManagement/url';
import { fetchingAllLists } from '../../list';
import { useDispatch } from 'react-redux';

export default function MenuButton(props) {
  let { id } = props;
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
          fetch(`${DEFAULT_URL}/lists/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
          })
            // .then(() => {
            //   console.log(1);
            //   fetch(`${DEFAULT_URL}/cards?locatedAtList=${id}`)
            //     .then(resp => resp.json())
            //     .then(data => console.log(data))
            //   return;
            // })
            .then(() => {
              console.log(112121)
              fetchingAllLists(DEFAULT_URL, dispatch)
            })
          handleClose();
        }}>
          Delete This List
        </MenuItem>
        <MenuItem onClick={() => handleClose()}>Move This List</MenuItem>
      </Menu>
    </>
  );
}