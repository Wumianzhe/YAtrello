import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { createStyles } from '@mui/styles'
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const theme = createTheme();

const useStyles = createStyles((theme) => ({
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

function MainInternal() {
  const classes = useStyles();
  <div className={classes.root}>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper className={classes.paper_main}>Main</Paper>
      </Grid>
      <Grid item xs={12} sm={6}>

        <Grid item xs={12}>
          <Paper className={classes.paper_analytics}>
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
            <Paper className={classes.paper_boards}>Board</Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper_boards}>Board</Paper>
          </Grid>

          <Grid item xs={6}>
            <Paper className={classes.paper_boards2}>Board</Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper_boards2}>Board</Paper>
          </Grid>
        </Grid>

      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper className={classes.paper_task1}>Task</Paper>

        <Paper className={classes.paper_task2}>Tasks</Paper>
        <Paper className={classes.paper_task2}>Tasks</Paper>
        <Paper className={classes.paper_task2}>Tasks</Paper>
        <Paper className={classes.paper_task2}>Tasks</Paper>
        <Paper className={classes.paper_task2}>Tasks</Paper>
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
