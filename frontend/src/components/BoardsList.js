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
            <Grid container spacing={2} style={{marginTop: "15px"}}>
            {boards.map((board, index) =>
                <Grid item xs={6} key={index}>
                <Box key={index}>
                    <Card variant="outlined" style={{'border-radius': '15px'}}>
                        <CardContent>
                            <Typography component={'div'} variant="body2" color="#677a84">
                                <strong>{board.name}</strong>
                            </Typography>
                            <br />
                            <Typography component={'div'} variant="body2" color="textSecondary">
                                <strong>Описание:</strong> {board.description}
                            </Typography>
                        </CardContent>
                        <CardActions style={{paddingLeft: '16px', marginTop: '-15px'}}>
                            <Link to={`/boards/${board.id}`} style={{background: '#33beff', textDecoration: 'none', color: '#ffffff', padding: '5px 15px','border-radius': '5px'}}>
                                <Typography component={'div'}>
                                    <strong>Смотреть подробнее</strong>
                                </Typography>
                            </Link>
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
