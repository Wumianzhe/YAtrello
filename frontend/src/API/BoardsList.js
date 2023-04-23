import  React, { useState, useEffect } from  'react';
import  BoardsService  from  './BoardsService';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const  boardsService  =  new  BoardsService();

function  BoardsList(){
    const [boards, setBoards] = useState([]);

    function getBoards () {
        boardsService.getBoards().then((result) => {
          console.log(result);
          setBoards(result);
          //self.setState({ customers:  result.data, nextPageURL:  result.nextlink})
        });
    };

    useEffect(() => {
        getBoards()
    }, []);

    return (
        <div  className="boards--list">
            {boards.map((boards, index) =>
                <Box sx={{ maxWidth: 300 }} key={index}>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {boards.name}
                            </Typography>
                            <Typography variant="body2">
                                boards.id {boards.id}
                                <br/>
                                boards.admin_gid {boards.admin_gid}
                                <br/>
                                boards.user_gid {boards.user_gid}
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
