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

function CircularProgressWithLabel({ first, second, color, size, text }) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress style={{ color: color }} size={`${size}px`} variant="determinate" value={(first) * 100 / second} />
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
          fontSize: 13 * size / 70
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

function Analytics({ boards, tasks, incompleteTasks, subtasks, incompleteSubtasks }) {
  return (
    <Card variant="outlined">
      <CardContent>
        <div style={{ fontSize: 26, 'textAlign': 'center', color: 'blue', padding: '10px' }}>Analytics</div>
        <Grid container spacing={3} style={{ padding: '10px' }}>
          <Grid item xs={4}>
            <CircularProgressWithLabel
              first={subtasks.length - incompleteSubtasks.length}
              second={subtasks.length}
              text={"subtasks"} size={150} color={'pink'} />
            <br />
            <br />
          </Grid>
          <Grid item xs={4}>
            <div style={{ paddingTop: '25px' }}>
              <CircularProgressWithLabel
                first={tasks.length - incompleteTasks.length}
                second={tasks.length}
                text={"tasks"} size={100} color={'blue'} />
            </div>
          </Grid>
          <Grid item xs={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography component={'div'} variant="body2" color="blue">
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
            <br />
            <Card variant="outlined">
              <CardContent>
                <Typography component={'div'} variant="body2" color="blue">
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

          <Grid item xs={12}>
            <Paper>Main
            </Paper>
          </Grid>
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
          <Grid item sm={12} md={6} style={{ paddingRight: '30px' }}>
            <TaskList tasks={uncompletedTasks} />
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
