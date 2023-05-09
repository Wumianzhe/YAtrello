import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ProfileService from '../API/ProfileService';
import BoardsList from '../components/BoardsList'
import { getUidByToken } from '../API/Auth'
import TaskList from '../components/TaskList';
import ADDNewBoard from '../components/AddNewBoard';

import { Typography, CircularProgress, Box } from '@mui/material';


//import CircularProgress from '@mui/material/CircularProgress';

const theme = createTheme();
const profileService = new ProfileService();

export async function loader() {
  const uid = await getUidByToken();
  const boards = await profileService.getBoards(uid);
  if (boards.length == 0) {
    console.log("this user has no boards"); // debug-only. Remove when there'll be visual way of displaying this
  }
  const tasks = await profileService.getTasks(uid);
  if (tasks.length == 0) {
    console.log("this user has no tasks"); // debug-only. Remove when there'll be visual way of displaying this
  }
  return { boards, tasks };
}

//???????????????????????????????????????????
export async function action() {}

function CurrentTask(taskList) {
  let taskArray = taskList.filter(task => task.is_completed === false);
  return taskArray;
}

function CircularProgressWithLabel(props) {
  console.log("props", props.value)
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress style={{ color: props.color }} size={`${props.size}px`} variant="determinate" value={(props.first) * 100 / props.second} />
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
          fontSize: 16 * props.size / 70
        }}
      >
        <div>
          {props.text}
          <br />
          <span style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 10 * props.size / 70
          }}
          >
            {(props.first)}/{props.second}
          </span>
        </div>
      </Box>
    </Box>
  );
}

function Analytics({ boards, tasks, incomplete }) {
  return(
  <Paper sx={{ padding: theme.spacing(2) }}>
    <CircularProgressWithLabel first={tasks.length - incomplete.length} second={tasks.length} text={"tasks"} size={100} color={'blue'} />
    <br />
    <Typography component={'div'} variant="body2" color="textSecondary">
      <strong>Total boards:</strong> {boards.length}
    </Typography>
  </Paper>
  )
}

function MainInternal() {
  const { boards, tasks } = useLoaderData();
  const uncompletedTasks = CurrentTask(tasks);
  return (
    <div>
    <Grid
      sx={{ padding: theme.spacing(4) }}
      container spacing={2}
    >
      <Grid item xs={12}>
        <Paper>Main</Paper>
      </Grid>
      <Grid item sm={12} md={6}>
        <Grid item xs={12} style={{ 'paddingTop': '15px' }}>
          <Analytics boards={boards} tasks={tasks} incomplete={uncompletedTasks} />
        </Grid>
        <Grid style={{ paddingTop: '20px' }}>
          <BoardsList boards={boards} />
        </Grid>
      </Grid>
      <Grid item sm={12} md={6} style={{paddingRight: '30px'}}>
        <TaskList tasks={uncompletedTasks}/>
      </Grid>
    </Grid>
    <ADDNewBoard/>
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
