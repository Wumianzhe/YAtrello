import { useLoaderData, redirect, Form, Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from "@mui/material/Box";
import { Grid } from '@mui/material';
import ProfileCard from '../components/ProfileCards';
import PersonalInfoCards from '../components/PersonalInfoCards';
import ProfileService from "../API/ProfileService";

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Paper from '@mui/material/Paper';

const PS = new ProfileService();

export async function action({ params, request }) {
  let uid = params["uid"];
  if (uid === undefined) {
    uid = JSON.parse(localStorage.getItem("auth")).uid;
  }
  const data = PS.getProfile(uid);
  const formData = await request.formData();
  console.log("formData.username ", formData.get("username"))
  const user = {
    username: formData.get("username") ? formData.get("username") : data.username,
    email: formData.get("email") ? formData.get("email") : data.email,
    first_name: formData.get("first_name") ? formData.get("first_name") : data.first_name,
    last_name: formData.get("last_name") ? formData.get("last_name") : data.last_name,
    short_bio: formData.get("short_bio") ? formData.get("short_bio") : data.short_bio,
    image_url: formData.get("image_url") ? formData.get("image_url") : data.image_url,
  }
  await PS.updateProfile(uid, user);
  console.log("uid", uid);
  console.log("123formData123", formData);
  console.log("123data123", data);
  console.log("123user123", user)
  return null;
}



function InputWithLabel(props) {
  console.log("props", props)
  return (
    <div style={{ display: 'flex' }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <div style={{ display: 'flex', alignItems: 'center' }}><strong>{props.text} </strong></div>
        </Grid>
        <Grid item xs={6}>
          <div style={{ paddingLeft: '20px' }}>
            <FormControl variant="standard">
              <Input
                id="component-simple"
                defaultValue={`${props.default}`}
                name={`${props.name}`}
              />
            </FormControl>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}


export default function Edit() {
  const data = useLoaderData();
  console.log("data!", data)
  const [values, setValues] = React.useState({});

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const verificationAndAuthorization = () => {
    console.log("тут должна выполняться проверка email и password");
    console.log(values);
    //updateProfile(data.id, values);
  };

  return (
    <Form method="put">
      <Box padding={3}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          style={{ 'marginTop': '5%' }}
        >
          <Paper style={{ padding: '15px', borderRadius: '15px' }}>
            <Grid style={{ padding: '25px' }} item>

              <div style={{ fontSize: 26, 'textAlign': 'center', color: '#33beff', marginTop: '-25px', padding: '10px' }}><strong>Editing a profile</strong></div>
              <InputWithLabel text="login" default={data.username} name="username" />
              <InputWithLabel text="email" default={data.email} name="email" />
              <InputWithLabel text="First name" default={data.first_name} name="first_name" />
              <InputWithLabel text="Last name" default={data.last_name} name="last_name" />
              <InputWithLabel text="Something about me" default={data.short_bio} name="short_bio" />
              <InputWithLabel text="URL image" default={data.image_url} name="image_url" />
              <Button
                variant="contained"
                style={{ background: '#33beff' }}
                type="submit"
                onClick={() => {document.location='/users'}}
              >
                Save
              </Button>
            </Grid>
          </Paper>
        </Grid>
      </Box>
    </Form>
  )
}
