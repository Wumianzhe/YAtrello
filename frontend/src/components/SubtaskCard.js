import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

export default function SubtaskCard(props) {
  const [checked, setChecked] = React.useState([1]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
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
                //onChange={handleToggle(value)}
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
