// dashboard placeholder. Transfer contents from board here and rename
import { useLoaderData } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from "@mui/material/Box";
import { Grid } from '@mui/material';
import ProfileCard from '../components/ProfileCards';
import PersonalInfoCards from '../components/PersonalInfoCards';

export function loader ({params}) {
  // should be
  // const board = await getBoard(params.uid)
  const user = params["uid"];
  return user;
}

function PersonInfo(userId) {
  const [data, setData] = useState([]);
  const token = 'f603a47518d62f757d464cddd4552e4e5572e038'
  useEffect(() => {
    fetch('http://localhost:8080/auth/users/' + userId + '/', {
          method: 'GET',
          origin: 'CHmI',
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
          }
        })
      .then(response => response.json())
      .then(data => setData(data));
  }, []);
  return (
    data
  );
}


export default function Main() {

  const user = useLoaderData();
  const data = PersonInfo(user)
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
                  <ProfileCard post={{name: data.username, last: data.id, email: data.email}}/>
              </Grid>
              <Grid item>
                  <PersonalInfoCards/>
              </Grid>
          </Grid>
      </Box>
  )
}
