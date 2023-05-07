import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


function FindById(usersList, userId){
    let users = usersList.filter(user => user.id === userId);
    return users;
}

export default function BasicCard(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
    <Card sx={{ maxWidth: 350 }}>
        <CardContent>
        <Typography variant="body2">
            {props.task.text}
        </Typography>
        </CardContent>
        <CardActions>
        <Button variant="secondary" size="small" onClick={handleClickOpen}>
        ...
        </Button>
        <Dialog open={open} onClose={handleClose} fullWidth="true">
        <DialogTitle>{props.task.text}</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Subtask list will be added soon
            </DialogContentText>
            <Typography variant="body2">
                Author and Users list wil be added soon
            </Typography>

        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Close</Button>
        </DialogActions>
        </Dialog>
        </CardActions>
    </Card>
    );
}
