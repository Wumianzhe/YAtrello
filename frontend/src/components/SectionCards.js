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

export default function SectionCard({sec, sections}) {
  const staff = JSON.parse(localStorage.getItem("auth")).isStaff
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
    <Card sx={{ maxWidth: 500, minWidth: 250}} style={{borderRadius: "15px"}}>
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
            {console.log("staff ", staff )}
            {/*staff ? <MoveModal task={sec}/> : <null/>*/} 
          </Grid>

        </Grid>
        
        <br/>
        <div>
          <TaskList tasks={tasks} sections={sections}/>
        </div>
        
      </CardContent>
      <CardActions>
        {/* <Button size="small">Add</Button> */}
      </CardActions>
    </Card>
  );
}
