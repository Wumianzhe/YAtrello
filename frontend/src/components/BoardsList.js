// import  React, { useState, useEffect } from  'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Grid from '@mui/material/Grid';
import {Link} from 'react-router-dom';

function  BoardsList({boards}){
    return (
        <div  className="boards--list">
            <Grid container spacing={2}>
            {boards.map((board, index) =>
                <Grid item xs={6} key={index}>
                <Box sx={{ maxWidth: 300 }} key={index}>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {board.name}
                            </Typography>
                            <Typography variant="body2">
                                boards.id {board.id}
                                <br/>
                                boards.admin_gid {board.admin_gid}
                                <br/>
                                boards.user_gid {board.user_gid}
                            </Typography>
                        </CardContent>
                        <CardActions style={{paddingLeft: '16px', marginTop: '-15px'}}>
                            <Link to={`/boards/${board.id}`} style={{color: 'blue', textDecoration: 'none'}}>Learn more</Link>
                        </CardActions>
                    </Card>
                </Box>
                </Grid>)
            }      
            </Grid> 
        </div>
    );
}
export  default  BoardsList;
