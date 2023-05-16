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
import EditIcon from '@mui/icons-material/Edit';
import SubtaskCard from '../components/SubtaskCard';
import TaskService from '../API/TaskService';
import ProfileService from '../API/ProfileService';
import { Grid, ListItemButton } from '@mui/material';
import MoveModal from "./MoveModal"
import AddNewSubtask from './AddSubtask';

const TS = new TaskService();
const PS = new ProfileService();


export default function BasicCard({ task, sections }) {
    const staff = JSON.parse(localStorage.getItem("auth")).isStaff
    const [changed, setChanged] = useState(true)
    const [subtasks, setSubtasks] = useState([])
    const [taskAuthor, setAuthor] = useState({})
    useEffect(() => {
        const fetchData = async () => {
            const subs = await TS.getSubtasks(task.id);
            const author = await PS.getProfile(task.author_id);
            setSubtasks(subs)
            setAuthor(author)
        }
        if (changed) {
            fetchData();
            setChanged(false);
        }
    }, [changed, task.id])
    const [open, setOpen] = React.useState(false);
    // const subtaskList = SubtaskList(task.id)
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <React.Fragment>
            <IconButton aria-label="comment" onClick={handleClickOpen}>
                <EditIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose} fullWidth={true}>
                <DialogTitle>{task.header}</DialogTitle>
                <DialogContent>
                    <Typography variant="body2">
                      Author: {taskAuthor.email}
                    </Typography>
                    <p>
                        {task.text}
                    </p>
                    {(subtasks.length > 0)?<div>
                                <Typography>Subtasks</Typography>
                                <SubtaskCard list={subtasks} />
                            </div>:null
                    }
                    <br/>
                    {staff ? <div><AddNewSubtask taskId={task.id}/><MoveModal task={task} sections={sections} /></div> : <null/> }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
