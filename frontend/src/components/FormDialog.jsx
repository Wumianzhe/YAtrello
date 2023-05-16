import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Form} from 'react-router-dom'

import IconButton from "@mui/material/IconButton";
import { ClassNames } from '@emotion/react';

export default function FormDialog({icon,title,children}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };

  return (
    <div style={{position:'fixed', bottom: '50px', right:'50px'}}>
      <IconButton color="primary" onClick={handleClickOpen}>
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path d="M20 13.3334V26.6667M13.3333 20H26.6666M36.6666 20C36.6666 29.2048 29.2047 36.6667 20 36.6667C10.7952 36.6667 3.33331 29.2048 3.33331 20C3.33331 10.7953 10.7952 3.33337 20 3.33337C29.2047 3.33337 36.6666 10.7953 36.6666 20Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Form id="dialForm" method="post">
            {children}
          </Form>
        </DialogContent>
        <DialogActions>
            <Button type="submit" form="dialForm" onClick={handleClose}>Submit</Button>
            <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
