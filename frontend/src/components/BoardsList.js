// import  React, { useState, useEffect } from  'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function  BoardsList({boards}){
    return (
        <div  className="boards--list">
            {boards.map((board, index) =>
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
                        <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                </Box>)
            }       
        </div>
    );
}
export  default  BoardsList;
