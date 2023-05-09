import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { createStyles,withStyles } from '@mui/styles'
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ProfileService from '../API/ProfileService';
import BoardsList from '../components/BoardsList'
import { getUidByToken } from '../API/Auth'

import TaskCard from '../components/TaskCard'
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import { ListItem, Typography, CircularProgress, Box } from '@mui/material';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

//import CircularProgress from '@mui/material/CircularProgress';



const theme = createTheme();
const profileService = new ProfileService();

export async function loader () {
  const uid = await getUidByToken();
  const boards = await profileService.getBoards(uid);
  if (boards.length == 0) {
    console.log("this user has no boards"); // debug-only. Remove when there'll be visual way of displaying this
  }
  const tasks = await profileService.getTasks(uid);
  return {boards,tasks};
}

//???????????????????????????????????????????
export async function action() {}

function CurrentTask(taskList){
  let taskArray = taskList.filter(task => task.is_completed === false);
  return taskArray;
}


function CircularProgressWithLabel(props) {
  console.log("props", props.value)
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress style={{color: props.color}} size={`${props.size}px`} variant="determinate" value={(props.first)*100/props.second} />
      <Box
        sx={{
          top: '3px',
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 16*props.size/70
        }}
      >
        <div>
          {props.text}
          <br/>
          <span style={{display: 'flex', 
                        alignItems: 'center',
                        justifyContent: 'center', 
                        fontSize: 10*props.size/70}}
            >
              {(props.first)}/{props.second}
            </span>

        </div>
          
          

      </Box>
    </Box>
  );
}

const styles = createStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },

  paper_main: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    background: '#ffefff',
  },
  paper_analytics: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    background: '#ffbdff',
  },
  paper_boards: {
    padding: theme.spacing(2),
    'margin-top': theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    background: '#ffa1ff',
  },
  paper_boards2: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    background: '#ffa1ff',
  },
  paper_task1: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    background: '#f777fa',
  },
  paper_task2: {
    padding: theme.spacing(2),
    'margin-top': theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    background: '#f777fa',
  },
}));
const MyTask = (props) => {
  return (
    <Paper className={props.classes.paper_task}>
      Task
    </Paper>
  )
}

const TaskPaper = withStyles(styles(theme))(MyTask)

function MainInternal() {
  const {boards,tasks} = useLoaderData();
  const currentTasks=CurrentTask(tasks);
  console.log("currentTasks", currentTasks.length)
  const classes = styles(theme);
  return(
  <div>
    <Grid 
      sx={{padding: theme.spacing(4)}}
      container spacing={2}
    >
      <Grid item xs={12}>
        <Paper>Main</Paper>
      </Grid>
      <Grid item xs={12} sm={6}>

        <Grid item xs={12} style={{'paddingTop': '15px'}}>
          <Paper
            sx={{padding: theme.spacing(2)}}
          >
            <CircularProgressWithLabel first={tasks.length-currentTasks.length} second={tasks.length} text={"tasks"} size={100} color={'blue'}/>
            <br />
            <Typography component={'div'} variant="body2" color="textSecondary">
              <strong>Total boards:</strong> {boards.length}
            </Typography>
          </Paper>
        </Grid>
        <Grid style={{paddingTop: '20px'}}>
          <BoardsList boards={boards}/>
        </Grid>
        
        {console.log("boards", boards)}

      </Grid>
      <Grid item xs={12} sm={6}>
        {currentTasks.map((task, i) =>
          <div key={i} style={{'paddingTop': '15px'}}>
          <Card variant="outlined">
            <CardContent>
              <ListItem
              disableGutters
              secondaryAction={
                <TaskCard task={task}/>
              }
              >
                {console.log("task", task)}
                <ListItemText primary={
                  <Typography component={'div'} variant="body2" color="textSecondary" style={{paddingLeft: theme.spacing(1)}}>
                    <strong>Task:</strong>
                    <div style={{paddingLeft: '10px', paddingRight: '10px'}}>{task.text}</div>
                    <strong>deadline:</strong> {new Date(task.time_deadline).toLocaleString()}
                  </Typography>
                }/>
              </ListItem>
            </CardContent>
          </Card>
                        
          </div>
        )}
      </Grid>
    </Grid>
  </div>
  )
}

export default function FullWidthGrid() {

  return (
    <ThemeProvider theme={theme}>
      <MainInternal />
    </ThemeProvider>
  );
}
