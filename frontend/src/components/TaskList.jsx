import TaskModal from "./TaskModal"
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import { ListItem } from '@mui/material';
import Grid from '@mui/material/Grid'

export default function TaskList({ tasks }) {
  return (
    // <Grid container spacing={2}>
    //   {tasks.map((task, index) =>
    //     <Grid item xs={12} key={index}>
    //       <TaskCard task={task}/>
    //     </Grid>
    //   )}
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {tasks.map((task, i) =>
        <ListItem
          key={i}
          disableGutters
          secondaryAction={
            <TaskModal task={task} />
          }>
          <ListItemText primary={`${task.text}`} />
        </ListItem>
      )}
    </List>
    // </Grid>
  )
}
