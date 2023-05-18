import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TaskService from '../API/TaskService';


let TS = new TaskService();

export default function AddNewSubtask({taskId}) {
  const [textValue, setTextValue] = useState('');
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBlank = () => {
    setTextValue("")
  }


  const hanleCreate = async (subText) => {
    if (subText !== '') {
        const sub = { text: subText, is_completed: false, task_id: taskId}
        await TS.createSubtask(sub)
        handleClose();
    }
  }


  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Добавить подзадачу
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Новая подзадача</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Subtask"
            variant="outlined"
            value={textValue}
            onChange={(event) => setTextValue(event.target.value)} />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={() => {
            handleBlank()
            hanleCreate(textValue)
          }}>Создать</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
