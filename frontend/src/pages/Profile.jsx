// dashboard placeholder. Transfer contents from board here and rename
import { useLoaderData } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from "@mui/material/Box";
import { Grid } from '@mui/material';
import ProfileCard from '../components/ProfileCards';
import PersonalInfoCards from '../components/PersonalInfoCards';
import { getUidByToken, getUserData } from "../API/Auth";

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
