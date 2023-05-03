import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function ProfileCard(props){
  //console.log(props)
  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardMedia
        component="img"
        alt="id_photo"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.post.name} {props.post.last}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {props.post.email}
        </Typography>
      </CardContent>
    </Card>
  );
}