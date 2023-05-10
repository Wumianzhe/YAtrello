import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import TaskService from '../API/TaskService';

let TS = new TaskService

export default function SubtaskCard(props) {
  const [checked, setChecked] = React.useState([1]);
  //React.useEffect(()=>{},[checked])

  const handleToggle = async(subtask) =>{
    subtask.is_completed = !subtask.is_completed
    await TS.updateSubtask({id: subtask.id, is_completed: subtask.is_completed})
    setChecked(!subtask.is_completed);
  };

  return (
    <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {props.list.map((value,index) => {
        return (
          <ListItem
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
