import { useLoaderData, Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from "@mui/material/Box";
import { Grid } from '@mui/material';
import ProfileCard from '../components/ProfileCards';
import PersonalInfoCards from '../components/PersonalInfoCards';
import { getUidByToken, getUserData } from "../API/Auth";
//import { Button } from "@mui/base";
import Button from '@mui/material/Button';
import ProfileService from "../API/ProfileService";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const PS = new ProfileService()

export async function loader ({params}) {
  let uid = params["uid"];
  if (uid === undefined) {
    uid = JSON.parse(localStorage.getItem("auth")).uid;
  }
  const user = PS.getProfile(uid);
  return user;
}

export default function Main() {
  const data = useLoaderData();
  console.log(data)
  return (
      <Box padding={3}>
        {console.log("data", data)}
        <Grid container spacing={2} style={{background: 'white', borderRadius: "10px",padding: '20px', marginTop:"20px",maxWidth:'1200px',margin: "0 auto"}}>
          <Grid item container xs={4} style={{paddingLeft: '15px', paddingTop: '0px'}}>
            <Avatar 
                alt="Remy Sharp" 
                src={`${data.image_url}`} 
                sx={{ width: '300px', height: "300px"}}
            />
          </Grid>
          <Grid item container xs={8} style={{}}>
            <Card style={{width: '95%', paddingTop: "0px", paddingLeft: '20px',boxShadow:'none' }}>
              <CardContent style={{padding: '0'}}>
                <Typography gutterBottom variant="h4" component="div" color="text.secondary">
                  <strong>Мой профиль: </strong>
                </Typography>
                <Typography gutterBottom variant="h5" component="div" color="text.secondary">
                  <strong>Логин: </strong>{data.username} 
                  <br/>
                  <strong>Email: </strong>{data.email} 
                  <br/>
                  <strong>Имя: </strong>{data.first_name} 
                  <br/>
                  <strong>Фамилия: </strong>{data.last_name}
                  <br/>
                  <strong>О себе: </strong>{data.short_bio}
                </Typography>
                <Button
                  variant="contained" 
                  style={{background: '#33beff'}}
                >
                    <Link to={'/users/edit'} style={{color: 'white', textDecoration: 'none'}}>Изменить</Link>
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
          

      </Box>
  )
}
