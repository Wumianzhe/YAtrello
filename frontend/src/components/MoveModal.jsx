import React, { useState, useEffect } from 'react';
import Button from "@mui/material/Button";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';

import TaskService from '../API/TaskService';

const TS = new TaskService();

export default function BasicCard({ task, sections }) {
    const [changed, setChanged] = useState(true);
    const [newSectionName, setNewSectionName] = useState({});
    const [open, setOpen] = React.useState(false);

    //console.log("task!!!", task)
    //console.log("sections!!!", sections)
    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleMove = () => {
        const newSection = sections.filter(section => section.name === newSectionName);
        const newSectionId = (newSection.length !== 0) ? newSection[0].id : null;
        if (newSectionId){
            console.log("All correct")
            TS.patchTask(task.id, {section_id: newSectionId})
            console.log("newSectionId ", newSectionId );
            console.log("task id", task.id);
        }
        else{
            console.log("incorrect section")
        }
    };

    return (
        <React.Fragment>
            <Button style={{marginLeft:'15px'}} variant="outlined" onClick={handleClickOpen}>
                Move subtask
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth={true}>
                <DialogTitle>Move task</DialogTitle>
                <DialogContent>
                    <br/>
                    <Card style={{marginTop: '10px'}}>
                        <CardContent style={{padding: '10px'}}>
                            <strong>Task for move: </strong>{task.header}
                        </CardContent>
                    </Card>
                    <br/>
                    <Card style={{marginTop: '10px'}}>
                        <CardContent style={{padding: '10px'}}>
                            <strong>Which section: </strong>
                            <FormControl variant="standard">
                                <Input
                                    id="component-simple" 
                                    type="text"
                                    value={newSectionName.name}
                                    onChange={(e) => {
                                        setNewSectionName(e.target.value)
                                    }}
                                    placeholder="section name"
                                />
                            </FormControl>
                        </CardContent>
                    </Card>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleMove}>Move</Button>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
