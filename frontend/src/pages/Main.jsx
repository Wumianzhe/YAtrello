import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ProfileService from '../API/ProfileService';
import BoardsList from '../components/BoardsList'
import TaskList from '../components/TaskList';
import ADDNewBoard from '../components/AddNewBoard';

import { Typography, CircularProgress, Box } from '@mui/material';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import SearchBoards from '../components/SearchBoards'


//import CircularProgress from '@mui/material/CircularProgress';

const theme = createTheme();
const profileService = new ProfileService();

export async function loader() {
  const uid = JSON.parse(localStorage.getItem("auth")).uid;
  const boards = await profileService.getBoards(uid);
  if (boards.length == 0) {
    console.log("this user has no boards"); // debug-only. Remove when there'll be visual way of displaying this
  }
  const tasks = await profileService.getTasks(uid);
  if (tasks.length == 0) {
    console.log("this user has no tasks"); // debug-only. Remove when there'll be visual way of displaying this
  }
  const subtasks = await profileService.getSubtasks(uid);
  if (subtasks.length == 0) {
    console.log("this user has no subtasks"); // debug-only. Remove when there'll be visual way of displaying this
  }
  const staff = JSON.parse(localStorage.getItem("auth")).isStaff
  return { boards, tasks, subtasks, staff };
}

//???????????????????????????????????????????
export async function action() {}

function CurrentTask(taskList) {
  let taskArray = taskList.filter(task => task.is_completed === false);
  return taskArray;
}

function CircularProgressWithLabel({ first, second, color, textSize, size, text, variant, position}) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      {position ?
        <CircularProgress sx={{ position: 'absolute', left: 0,}} variant={variant} style={{ color: color }} thickness='5' size={`${size}px`} value={(first) * 100 / second} />
        :
        <CircularProgress variant={variant} style={{ color: color }} thickness='5' size={`${size}px`} value={100} />
      }
      
      <Box
        sx={{
          top: '5px',
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 13 * textSize / 70,
          fontWeight: 'bold',
          fontFamily: 'default',
          color: "#677a84"
        }}
      >
        <div>
          {text}
          <br />
          <span style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 8 * size / 70
          }}
          >
            {(first)}/{second}
          </span>
        </div>
      </Box>
    </Box>
  );
}


function FullCircularProgressWithLabel({ first, second, color, textSize, size, text}) {
  return (
    <Box sx={{ position: 'relative' }}>
      <CircularProgressWithLabel first={first} second={second} color="#dee2e7" textSize={textSize} size={size} text={text} variant="determinate" />
      <CircularProgress style={{ color: color }} thickness='5' size={`${size}px`} value={(first) * 100 / second} variant="determinate" sx={{ position: 'absolute', left: 0,}}/>
      {/*<CircularProgressWithLabel first={first} second={second} color={color} textSize={textSize} size={size} text={text} variant="determinate" position='absolute'/>*/}
    </Box>
  );
}


function Analytics({ boards, tasks, incompleteTasks, subtasks, incompleteSubtasks }) {
  return (
    <Card variant="outlined" style={{background: '#dee2e7', 'border-radius': '15px', padding: '20px'}}>
      <CardContent>
        <Card variant="outlined" style={{'border-radius': '15px'}}>
          <CardContent>
            <Box sx={{ fontWeight: 'bold', fontSize: 'h3.fontSize', fontFamily: 'default', color: "#677a84", 'textAlign': 'center', marginTop: '15px'}}>
                Analytics
            </Box>
          </CardContent>
        </Card>
        <Grid container spacing={2} style={{  }}>
          <Grid container xs={8} style={{paddingLeft: '15px', paddingTop: '30px'}}>
          <Card variant="outlined" style={{width: '100%', 'border-radius': '15px'}}>
            <CardContent>
              <Grid container spacing={2} style={{ padding: '10px' }}>
                <Grid item xs={6}>
                  <FullCircularProgressWithLabel
                    first={subtasks.length - incompleteSubtasks.length}
                    second={subtasks.length}
                    text={"subtasks"} 
                    textSize={130}
                    size={150} 
                    color={'pink'} />
                  <br />
                  <br />
                </Grid>
                <Grid item xs={6}>
                  <div style={{ paddingTop: '25px' }}>
                    <FullCircularProgressWithLabel
                      first={tasks.length - incompleteTasks.length}
                      second={tasks.length}
                      text={"tasks"} 
                      textSize={120}
                      size={100} 
                      color={'blue'} />
                  </div>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          </Grid>

          <Grid item xs={4} style={{paddingTop: '30px'}}>
            <Card variant="outlined" style={{'border-radius': '15px'}}>
              <CardContent>
                <Typography component={'div'} variant="body2" color="#677a84">
                  <strong>Need to complete</strong>
                </Typography>
                <br />
                <Typography component={'div'} variant="body2" color="textSecondary">
                  <strong>tasks:</strong> {incompleteTasks.length}
                </Typography>
                <Typography component={'div'} variant="body2" color="textSecondary">
                  <strong>subtasks:</strong> {incompleteSubtasks.length}
                </Typography>
              </CardContent>
            </Card>
            <br />
            <Card variant="outlined" style={{'border-radius': '15px'}}>
              <CardContent>
                <Typography component={'div'} variant="body2" color="#677a84">
                  <strong>Total</strong>
                </Typography>
                <br />
                <Typography component={'div'} variant="body2" color="textSecondary">
                  <strong>boards:</strong> {boards.length}
                </Typography>
                <Typography component={'div'} variant="body2" color="textSecondary">
                  <strong>tasks:</strong> {tasks.length}
                </Typography>
                <Typography component={'div'} variant="body2" color="textSecondary">
                  <strong>subtasks:</strong> {subtasks.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

function MainInternal() {
  const { boards, tasks, subtasks, staff } = useLoaderData();
  const uncompletedTasks = CurrentTask(tasks);
  const uncompletedSubtasks = CurrentTask(subtasks);
  return (
    <Grid>
      <Grid item xs={12}>
      </Grid>
      <div>
        <Grid
          sx={{ padding: theme.spacing(4) }}
          container spacing={2}
        >

          <Grid item sm={12} md={6}>
            <Grid item xs={12} style={{ 'paddingTop': '15px' }}>
              <Analytics boards={boards} tasks={tasks} incompleteTasks={uncompletedTasks} subtasks={subtasks} incompleteSubtasks={uncompletedSubtasks} />
            </Grid>
            <Grid item xs={12} style={{ marginTop: '15px' }}>
              <SearchBoards boards={boards} >
                  {(boards) => (
                    <BoardsList boards={boards} />
                  )}
              </SearchBoards>
            </Grid>
          </Grid>
          <Grid item sm={12} md={6}>
            <Card variant="outlined" style={{background: '#dee2e7', marginTop: '15px', 'border-radius': '15px'}}>
              <CardContent>
                <Box sx={{ fontWeight: 'bold', fontSize: 'h4.fontSize', fontFamily: 'default', color: "#54656e", 'textAlign': 'center', marginTop: '15px'}}>
                    Need to complete
                </Box>
              </CardContent>
            </Card>
            <Grid style={{ paddingRight: '30px' }}>
              <TaskList tasks={uncompletedTasks} />
            </Grid>
          </Grid>
        </Grid>
    {staff?<ADDNewBoard />:null}
      </div>
    </Grid>
  )
}

export default function FullWidthGrid() {

  return (
    <ThemeProvider theme={theme}>
      <MainInternal />
    </ThemeProvider>
  );
}
