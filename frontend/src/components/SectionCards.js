import React, { useState, useEffect } from 'react';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TaskList from './TaskList';
import SectionService from '../API/SectionService';
import EditIcon from '@mui/icons-material/Edit';
import { Grid, IconButton } from '@mui/material';

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
  },[tasks,changed])
  return (
    <Card sx={{ maxWidth: 500, minWidth: 300 }}>
      <CardContent>
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

          <IconButton color="primary">
            <EditIcon />
          </IconButton>

          </Grid>

        </Grid>
        
        <br/>
        <TaskList tasks={tasks}/>
      </CardContent>
      <CardActions>
        {/* <Button size="small">Add</Button> */}
      </CardActions>
    </Card>
  );
}
