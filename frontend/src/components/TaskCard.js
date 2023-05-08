import React, { useState, useEffect } from 'react';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';

import SubtaskCard from '../components/SubtaskCard';


function FindById(usersList, userId){
    let users = usersList.filter(user => user.id === userId);
    return users;
}

function SubtaskList(taskId) {
    const [data, setData] = useState([]);
    useEffect(() => {
      fetch('http://localhost:8080/api/subtasks/by_task_id/'+ taskId +'/', {
            method: 'GET',
            origin: 'CHmI',
            headers: {
              'Content-Type': 'application/json'
            }
          })
        .then(response => response.json())
        .then(data => setData(data));
    }, []);
    return (
      data
    );
  }

export default function BasicCard(props) {
    const [open, setOpen] = React.useState(false);
    const subtaskList = SubtaskList(props.task.id)
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <React.Fragment>
        <IconButton aria-label="comment" onClick={handleClickOpen}>
            <CommentIcon />
        </IconButton>
        <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <DialogTitle>{props.task.text}</DialogTitle>
        <DialogContent>
            <br/>
            <Typography>Subtasks</Typography>
            <SubtaskCard list={subtaskList}/>
            <br/>
            <Typography variant="body2">
                Author and Users list wil be added soon
            </Typography>

        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Close</Button>
        </DialogActions>
        </Dialog>
        </React.Fragment>
    );
}
