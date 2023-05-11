import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

export default function ProfileCard(props){
  //console.log(props)
  return (
    <>
     <Avatar 
          alt="Remy Sharp" 
          src="https://koshka.top/uploads/posts/2021-12/1640112452_1-koshka-top-p-kotiki-rizhie-milie-1.jpg" 
          sx={{ width: '300px', height: "300px"}}
      />
    <Card sx={{ maxWidth: 500 }}>
      
      <CardContent>
       
        <Typography gutterBottom variant="h5" component="div">
          {props.post.name} {props.post.last}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {props.post.email}
        </Typography>
      </CardContent>
    </Card>
    </>
  );
}