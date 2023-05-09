import TaskModal from "./TaskModal"
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import { createTheme } from '@mui/material/styles';
import { ListItem,Typography } from '@mui/material';
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const theme = createTheme();

export default function TaskList({ tasks }) {
  return (
    <div>
        {tasks.map((task, i) =>
          <div key={i} style={{ 'paddingTop': '15px' }}>
            <Card variant="outlined" style={{marginRight: '-30px'}}>
              <CardContent
                style={{margin: '-15px'}}
              >
                <ListItem
                  disableGutters
                  secondaryAction={
                    <TaskModal task={task} />
                  }
                >
                  <ListItemText primary={
                    <Typography component={'div'} variant="body2" color="textSecondary" style={{ paddingLeft: theme.spacing(1) }}>
                      <strong>
                        <p>{task.header + '\n'}</p>
                      </strong>
                      { task.time_deadline === null?null:
                      <div>
                      <strong>
                        deadline:
                      </strong> {new Date(task.time_deadline).toLocaleString()}
                      </div>
                      }
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
