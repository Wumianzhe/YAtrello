import TaskModal from "./TaskModal"
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import { createTheme } from '@mui/material/styles';
import { ListItem,Typography } from '@mui/material';
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const theme = createTheme();

export default function TaskList({ tasks, sections }) {
  return (
    <div>
        {tasks.map((task, i) =>
          <div key={i} style={{  }}>
            <Card variant="outlined" style={{ 'border-radius': '15px', margin:'0'}}>
              <CardContent
                style={{padding:'10px'}}
              >
                <ListItem
                style={{padding:'0',}}
                  disableGutters
                  secondaryAction={
                    <TaskModal style={{position:'absolute', top:'0',left:'0', color:'black'}} task={task} sections={sections}/>
                    
                  }
                >
                  <ListItemText style={{flex:'auto'}} primary={
                    <Typography component={'div'} variant="body2" color="textSecondary" style={{ paddingLeft: theme.spacing(1) }}>
                      <strong>
                        <p style={{color:'black', marginBlock:'5px'}}>{task.header + '\n'}</p>
                      </strong>
                      <strong>
                        Крайний срок:
                      </strong> {task.time_deadline === null? "None" : new Date(task.time_deadline).toLocaleString()}
                    </Typography>
                  } />
                </ListItem>
              </CardContent>
            </Card>

          </div>
        )}
    </div>
  )
}
