import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { createStyles,withStyles } from '@mui/styles'
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const theme = createTheme();

const styles = createStyles(({theme}) => ({
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
const MyBoard = (props) => {
  return (
    <>
    <Paper className={props.classes.paper_boards}>
      Board
    </Paper>
    </>
  )
}
const MyTask = (props) => {
  return (
    <Paper className={props.classes.paper_task}>
      Task
    </Paper>
  )
}

const BoardPaper = withStyles(styles)(MyBoard)
const TaskPaper = withStyles(styles)(MyTask)

function MainInternal() {
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
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <BoardPaper/>
          </Grid>
          <Grid item xs={6}>
            <BoardPaper/>
          </Grid>

          <Grid item xs={6}>
            <BoardPaper/>
          </Grid>
          <Grid item xs={6}>
            <BoardPaper/>
          </Grid>
        </Grid>

      </Grid>
      <Grid item xs={12} sm={6}>
        <TaskPaper/>
        <TaskPaper/>
        <TaskPaper/>
        <TaskPaper/>
        <TaskPaper/>
        <TaskPaper/>
      </Grid>
    </Grid>
  </div>
}

export default function FullWidthGrid() {

  return (
    <ThemeProvider theme={theme}>
      <MainInternal />
    </ThemeProvider>
  );
}
