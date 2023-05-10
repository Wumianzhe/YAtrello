import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import ProfileService from '../API/ProfileService';
import BoardsService from '../API/BoardsService';


let PS = new ProfileService();
let BS = new BoardsService();

export default function ADDNewBoard() {
  const [textValue, setTextValue] = useState('');
  const [open, setOpen] = React.useState(false);
  const [changed, setChanged] = useState(true)
  const [left, setLeft] = useState([])
  const [checked, setChecked] = React.useState([]);
  const [right, setRight] = React.useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await PS.getProfileList();
      setLeft(res)
    }
    if (changed) {
      fetchData();
      setChanged(false);
    }
  }, [left, changed])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
  }

  function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
  }


  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleBlank = () => {
    handleAllLeft()
    setTextValue("")
  }

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const customList = (users) => (
    <Paper sx={{ width: 200, height: 230, overflow: 'auto' }}>
      <List dense component="div" role="list">
        {users.map((user, i) => {
          const labelId = `transfer-list-item-${user}-label`;

          return (
            <ListItem
              key={i}
              role="listitem"
              button
              onClick={handleToggle(user)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(user) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={user.first_name + ' ' + user.last_name} />
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );

  const hanleCreate = async (boardName, userList) => {
    if (boardName !== '') {
      // console.log(userList);
      // console.log(boardName);
      let userGroupId = await PS.createGroup(boardName)
      await PS.addUsersToGroup(userList.map(user => user.id), userGroupId)
      let board = {name: boardName, admin_gid: 1, user_gid: userGroupId}
      await BS.createBoard(board)
      handleClose();
    }
  }


  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        New board
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New board</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Board  name"
            variant="outlined"
            value={textValue}
            onChange={(event) => setTextValue(event.target.value)} />


          <Grid container spacing={2} justifyContent="center" alignItems="center" label="User list">
            <Grid item>{customList(left)}</Grid>
            <Grid item>
              <Grid container direction="column" alignItems="center">
                <Button
                  sx={{ my: 0.5 }}
                  variant="outlined"
                  size="small"
                  onClick={handleAllRight}
                  disabled={left.length === 0}
                  aria-label="move all right"
                >
                  ≫
                </Button>
                <Button
                  sx={{ my: 0.5 }}
                  variant="outlined"
                  size="small"
                  onClick={handleCheckedRight}
                  disabled={leftChecked.length === 0}
                  aria-label="move selected right"
                >
                  &gt;
                </Button>
                <Button
                  sx={{ my: 0.5 }}
                  variant="outlined"
                  size="small"
                  onClick={handleCheckedLeft}
                  disabled={rightChecked.length === 0}
                  aria-label="move selected left"
                >
                  &lt;
                </Button>
                <Button
                  sx={{ my: 0.5 }}
                  variant="outlined"
                  size="small"
                  onClick={handleAllLeft}
                  disabled={right.length === 0}
                  aria-label="move all left"
                >
                  ≪
                </Button>
              </Grid>
            </Grid>
            <Grid item>{customList(right)}</Grid>
          </Grid>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => {
            handleBlank()
            hanleCreate(textValue, right)
          }}>Create</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
