import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import TaskService from '../API/TaskService';

let TS = new TaskService

export default function SubtaskCard(props) {
  const staff = JSON.parse(localStorage.getItem("auth")).isStaff
  const [checked, setChecked] = React.useState([1]);
  //React.useEffect(()=>{},[checked])

  const handleToggle = async(subtask) =>{
    if (staff){
    subtask.is_completed = !subtask.is_completed
    await TS.updateSubtask({id: subtask.id, is_completed: subtask.is_completed})
    setChecked(!subtask.is_completed);
  }
  };

  return (
    <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {props.list.map((value,index) => {
        return (
          <ListItem style={{border: '1px solid #677a84', margin:'10px 0px', borderRadius:'10px'}}
            key={index}
            secondaryAction={
              <Checkbox
                edge="end"
                onChange={()=>handleToggle(value)}
                checked={value.is_completed}
              />
            }
            disablePadding
          >
            <ListItemButton>
              <ListItemText primary={value.text} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
