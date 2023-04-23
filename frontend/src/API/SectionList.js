import  React, { Component, useState, useEffect } from  'react';
import  SectionService  from  './SectionService';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Box from '@mui/material/Box';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

import FormDialog from "../components/FormDialog";

const  sectionService  =  new  SectionService();

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 300,
    },
    control: {
      padding: theme.spacing(2),
    },
  }));


function SectionList() {

    const [sections, setSections] = React.useState([{id: 5, name: '', boaard_id: 1}]);
    const  sectionService  =  new  SectionService();
    const [spacing, setSpacing] = React.useState(2);
    const classes = useStyles();

    function getSections () {
        sectionService.getSection().then((result) => {
          console.log(result);
          setSections(result);
          //self.setState({ customers:  result.data, nextPageURL:  result.nextlink})
        });
        
    }

    useEffect(() => {
        getSections();

    }, []);
    

    return (
        <Box sx={{ m: 1}}>
            <Typography sx={{ m: 11, p: 13}}>Sections</Typography>
            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12}>
                    <Grid 
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    spacing={spacing}>
                        {sections.map((sections, index) =>
                            <Grid key={index} item>
                                <Card className={classes.paper}>
                                    <CardContent>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                        {sections.name}
                                        <br/>
                                        {sections.id}
                                        <br/>
                                        {sections.board_id}
                                        </Typography>
                                    </CardContent>
                                </Card>

                            </Grid>
                        )}
                        <FormDialog/>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );

}
export  default  SectionList;
