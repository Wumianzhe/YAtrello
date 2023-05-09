import { useLoaderData, redirect, Form } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from "@mui/material/Box";
import { Grid } from '@mui/material';
import ProfileCard from '../components/ProfileCards';
import PersonalInfoCards from '../components/PersonalInfoCards';
//import { getUidByToken, getUserData } from "../API/Auth";
import { updateProfile, getUidByToken, getUserData } from "../API/Auth";

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';




export async function action ({ params, request }) {
    let uid = params["uid"];
    if (uid === undefined) {
        uid = await getUidByToken();
    }
    const data = await getUserData(uid);
    const formData = await request.formData();
    console.log("formData.username ", formData.get("username") )
    const user = {
        username: formData.get("username") ? formData.get("username") : data.username,
        email: formData.get("email") ? formData.get("email") : data.email,
        first_name: formData.get("first_name") ? formData.get("first_name") : data.first_name,
        last_name: formData.get("last_name") ? formData.get("last_name") : data.last_name,
        short_bio: formData.get("short_bio") ? formData.get("short_bio") : data.short_bio,
    }
    await updateProfile(uid, user);

    //console.log("123formData123", formData);
    //console.log("123data123", data);
    //console.log("123user123", user)
    return null;
}



function InputWithLabel(props) {
    console.log("props", props)
    return (
        <div style={{display: 'flex'}}>
        <div style={{display: 'flex', alignItems: 'center'}}><strong>{props.text} </strong></div>
        <div style={{display: 'flex', paddingLeft: '20px', align: "right"}}>
            <FormControl variant="standard">
                <Input 
                    id="component-simple" 
                    defaultValue={`${props.default}`} 
                    name={`${props.name}`}
                />
            </FormControl>
        </div>
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
      <a name="id">{data.id}</a>
          <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
          >
              <Grid item>

                <InputWithLabel text="login" default={data.username} name="username"/>
                <InputWithLabel text="email" default={data.email} name="email"/>
                <InputWithLabel text="First name" default={data.first_name} name="first_name"/>
                <InputWithLabel text="Last name" default={data.last_name} name="last_name"/>
                <InputWithLabel text="Something about me" default={data.short_bio} name="short_bio"/>
                <Button 
                    variant="contained" 
                    style={{background: 'blue'}}
                    type="submit"
                    //disabled={newSection.name===''}
                >
                    Save
                </Button>
              </Grid>
          </Grid>
      </Box>
      </Form>
  )
}
