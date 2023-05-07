import React, { useState, useEffect } from 'react';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TaskCard from '../components/TaskCard';


function TaskList() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8080/api/tasks/', {
          method: 'GET',
          origin: 'CHmI',
          headers: {
            'Content-Type': 'application/json'
          }
        })
      .then(response => response.json())
      .then(data => setData(data));
  }, []);
  return (
    data
  );
}

function TaskBySectionId(taskList, secId){
  let taskArray = taskList.filter(task => task.section_id === secId);
  return taskArray;
  }

export default function SectionCards(props) {
    const taskList = TaskBySectionId(TaskList(), props.sec.id)
    console.log(taskList)
  return (
    <Card sx={{ maxWidth: 500, minWidth: 300 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {props.sec.name}
        </Typography>
        {taskList.map(task =>
          <TaskCard task={task}/>
        )}
      </CardContent>
      <CardActions>
        {/* <Button size="small">Add</Button> */}
      </CardActions>
    </Card>
  );
}
