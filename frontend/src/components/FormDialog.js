import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import IconButton from "@mui/material/IconButton";
import AddCircleIcon from '@mui/icons-material/AddCircle';

import SectionService from "../API/SectionService";

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [newSection, setNewSection] = React.useState({id: 9, name: '', boaard_id: 1});
  const  sectionService  =  new  SectionService();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    //setNewSection({ new_section_name: '' })
    setNewSection({ name: '' })
    setOpen(false);
  };
  const handleAddNewSection = () => {
    console.log(newSection)
    console.log("написать добавление секции в бд")
    //http://127.0.0.1:8000
    sectionService.createSection(newSection);
    handleClose();
    //window.location.reload(true);
  };

  function handleChange(e) {
    e.preventDefault();
    setNewSection({ id: 9, name: e.target.value, board_id: 1 })
  };

  return (
    <div>
      <IconButton color="primary" onClick={handleClickOpen}>
        <AddCircleIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Adding a new section</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new section, please enter its name here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="section_name"
            label="Section name"
            type="text"
            fullWidth
            variant="standard"
            onChange={e => handleChange(e)}
          />
        </DialogContent>
        <DialogActions>
            <Button disabled={newSection.name===''} onClick={handleAddNewSection}>Add</Button>
            <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
