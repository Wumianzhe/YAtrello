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

export async function loader ({params}) {
  let uid = params["uid"];
  if (uid === undefined) {
    uid = await getUidByToken();
  }
  const user = await getUserData(uid);
  return user;
}

export default function Main() {
  const data = useLoaderData();
  console.log(data)
  return (
      <Box padding={3}>
          <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
          >
              <Grid item>
                  <ProfileCard post={{name: data.first_name, last: data.last_name, email: data.email}}/>
              </Grid>
              <Grid item>
                  <PersonalInfoCards bio={ data.short_bio}/>
              </Grid>
          </Grid>
          <Button
            variant="contained" 
            style={{background: 'blue'}}
          >
              <Link to={'/users/edit'} style={{color: 'white', textDecoration: 'none'}}>Edit</Link>
          </Button>
      </Box>
  )
}
