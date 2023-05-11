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
          <div key={i} style={{ 'paddingTop': '15px' }}>
            <Card variant="outlined" style={{marginRight: '-30px', 'border-radius': '15px'}}>
              <CardContent
                style={{margin: '-15px'}}
              >
                <ListItem
                  disableGutters
                  secondaryAction={
                    <TaskModal task={task} sections={sections}/>
                  }
                >
                  <ListItemText primary={
                    <Typography component={'div'} variant="body2" color="textSecondary" style={{ paddingLeft: theme.spacing(1) }}>
                      <strong>
                        <p>{task.header + '\n'}</p>
                      </strong>
                      <strong>
                        deadline:
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
