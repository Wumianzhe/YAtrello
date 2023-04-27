import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Scrollable from '../components/UI/Scrollable';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2),
      "margin-top": theme.spacing(2),
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
      "margin-left": theme.spacing(2),
      "margin-top":theme.spacing(2),
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      background: '#ffefff',
    },
}));

const Board = () => {
    const classes = useStyles();

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
        <div className={classes.root}>
          <Paper className={classes.paper_main}>Main</Paper>
          <Scrollable _class="sections_line">
              {
                items.map((v, i) => {
                  return (
                    <Grid key={i} item>
                        <Paper className={classes.paper}>

                            <div key={i} className="sections_item">
                                <h2>{v.title}</h2>
                            </div>

                            {i===0 ? 
                              items2.map((t, j) => {
                                return (
                                  <Paper key={j} className={classes.paper_task}>
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

export default Board;
