import { useLoaderData } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from "@mui/material/Box";
import { Grid } from '@mui/material';
import ProfileCard from '../components/ProfileCards';
import PersonalInfoCards from '../components/PersonalInfoCards';
import { getUidByToken, getUserData } from "../API/Auth";

export async function action ({ request }) {
  const formData = await request.formData();
  // patchProfile
  return null;
}

export default function Edit() {
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
      </Box>
  )
}
