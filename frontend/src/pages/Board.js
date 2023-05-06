import React from 'react';
import { createStyles } from '@mui/styles';
import Paper from '@mui/material/Paper';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Scrollable from '../components/UI/Scrollable';
import App from '../styles/App.css'
import { useLoaderData } from "react-router-dom";

const theme = createTheme();
const useStyles = createStyles((theme) => ({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2),
      marginTop: theme.spacing(2),
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      background: '#ffbdff',
    },
    paper_main: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      background: '#ffefff',
    },
    paper_task: {
      marginLeft: theme.spacing(2),
      marginTop:theme.spacing(2),
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      background: '#ffefff',
    },
}));

const Board = () => {
    const board = useLoaderData();
    console.log("hello")
    console.log(board)
    const classes = useStyles(theme);

    const items = [
        {
          title: "Section 1",
        },
        {
          title: "Section 2",
        },
        {
          title: "Section 3",
        },
        {
          title: "Section 4",
        },
        {
          title: "Section 5",
        },
        {
          title: "Section 6",
        },
        {
          title: "Section 7",
        },
    ]
    const items2 = [
      {
        title: "Task 1",
        text: "Description 1"
      },
      {
        title: "Task 2",
        text: "Description"
      },
    ]

    return (
        <div style={classes.root}>
          <Paper sx={classes.paper_main}>Main</Paper>
          <Scrollable _class="sections_line">
              {
                items.map((v, i) => {
                  return (
                    <Grid key={i} item>
                        <Paper sx={classes.paper}>

                            <div key={i} className="sections_item">
                                <h2>{v.title}</h2>
                            </div>

                            {i===0 ? 
                              items2.map((t, j) => {
                                return (
                                  <Paper key={j} sx={classes.paper_task}>
                                    <h2>{t.title}</h2>
                                    <p>{t.text}</p>
                                  </Paper>
                                )
                              })
                              : 
                              null
                            }
                        </Paper>
                    </Grid>
                  )
                })  
              }
          </Scrollable>
        </div>
    );
};


export default function ExpBoard() {
  return (
    <ThemeProvider theme={theme}>
      <Board/>
    </ThemeProvider>
  )
}