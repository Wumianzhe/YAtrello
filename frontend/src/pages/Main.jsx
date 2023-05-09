import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { createStyles,withStyles } from '@mui/styles'
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ProfileService from '../API/ProfileService';
import BoardsList from '../components/BoardsList'
import { getUidByToken } from '../API/Auth'
import TaskList from '../components/TaskList';

const theme = createTheme();
const profileService = new ProfileService();

export async function loader () {
  const uid = await getUidByToken();
  const boards = await profileService.getBoards(uid);
  if (boards.length == 0) {
    console.log("this user has no boards"); // debug-only. Remove when there'll be visual way of displaying this
  }
  const tasks = await profileService.getTasks(uid);
  if (tasks.length == 0) {
    console.log("this user has no tasks"); // debug-only. Remove when there'll be visual way of displaying this
  }
  return {boards,tasks};
}

export async function action() {

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

function MainInternal() {
  const {boards,tasks} = useLoaderData();
  const classes = styles(theme);
  return(
  <div>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper>Main</Paper>
      </Grid>
      <Grid item xs={12} sm={6}>

        <Grid item xs={12}>
          <Paper>
            Analitics
            <br />
            Analitics
            <br />
            Analitics
            <br />
            Analitics
            <br />
          </Paper>
        </Grid>
        <BoardsList boards={boards}/>

      </Grid>
      <Grid item xs={12} sm={6}>
        <TaskList tasks={tasks}/>
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
