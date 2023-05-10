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
import TaskService from '../API/TaskService';
import ProfileService from '../API/ProfileService';
import SectionService from "../API/SectionService";

import EditIcon from '@mui/icons-material/Edit';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

const TS = new TaskService();
const PS = new ProfileService();
const sectionService = new SectionService();


export default function BasicCard({ task }) {
    const [changed, setChanged] = useState(true)
    const [sections, setSections] = useState([])
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
                <DialogTitle>Move task</DialogTitle>
                <DialogContent>
                    <Typography>
                      Select section
                    </Typography>
                    <div>
                    <Card style={{marginTop: '10px'}}>
                        <CardContent style={{padding: '10px'}}>
                            section
                        </CardContent>
                    </Card>
                    <Card style={{marginTop: '10px'}}>
                        <CardContent style={{padding: '10px'}}>
                            section
                        </CardContent>
                    </Card>
                    </div>
                    <br/>
                    <Typography>Task for move</Typography>
                    <Card style={{marginTop: '10px'}}>
                        <CardContent style={{padding: '10px'}}>
                            task
                        </CardContent>
                    </Card>



                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Move</Button>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
