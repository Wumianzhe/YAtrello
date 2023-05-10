import React, { useState, useEffect } from 'react';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TaskList from './TaskList';
import SectionService from '../API/SectionService';
import EditIcon from '@mui/icons-material/Edit';
import { Grid, IconButton, ListItemButton} from '@mui/material';
import MoveModal from "./MoveModal"


const SS = new SectionService();

export default function SectionCard({sec}) {
  const [changed, setChanged] = useState(true)
  const [tasks,setTasks] = useState([])
  useEffect(() => {
    const fetchData = async() => {
      const res = await SS.getTasks(sec.id);
      setTasks(res)
    }
    if (changed) {
      fetchData();
      setChanged(false);
    }
  },[changed])
  return (
    <Card sx={{ maxWidth: 500, minWidth: 250}}>
      <CardContent style={{ marginRight: '-15px'}}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item>
            <Typography variant="h5" component="div">
              {sec.name}
            </Typography>
          </Grid>
          <Grid item>
            <MoveModal task={sec} />
          </Grid>

        </Grid>
        
        <br/>
        <div>
          <TaskList tasks={tasks}/>
        </div>
      </CardContent>
      <CardActions>
        {/* <Button size="small">Add</Button> */}
      </CardActions>
    </Card>
  );
}
