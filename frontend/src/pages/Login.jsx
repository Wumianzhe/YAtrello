import React from 'react';
import { createStyles } from '@mui/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { handleLogin as login } from "../API/Auth";
import {Form, redirect, Link} from 'react-router-dom';

export async function action({ request }) {
    const formData = await request.formData();
    await login(formData.get("login"), formData.get("pass"));
    return redirect(`/`);
  }

const theme = createTheme();
const useStyles = createStyles((theme) => ({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2),
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      borderRadius: '15px',

    },
    form_style: {
        width: theme.spacing(40),
    },
    main_grid_style: {
        padding: theme.spacing(10),
    },
    div_style: {
        padding: theme.spacing(1),
    }
  }));

const Log = () => {
    const classes = useStyles(theme);

    const [values, setValues] = React.useState({
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div style={classes.root}>
            <Form method="post">
            <Grid container 
                spacing={0}
                justifyContent="center" 
                alignItems="center" 
                style={classes.main_grid_style}
            > 
                <Grid item xs={12} sm={5}>
                    <Paper style={classes.paper}>
                        <h1 style={{color: '#33beff'}}>
                            Authorization
                        </h1>
                        <div style={classes.div_style}>
                            <FormControl style={classes.form_style} variant="outlined">
                                <InputLabel htmlFor="component-outlined">Login</InputLabel>
                                <OutlinedInput 
                                    id="component-outlined" 
                                    label="login1"
                                    type="text"
                                    name="login" 
                                />
                            </FormControl>
                        </div>
                        <div style={classes.div_style}>
                            <FormControl style={classes.form_style} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={values.showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            >
                                            {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="password"
                                    labelWidth={70}
                                    name="pass"
                                />
                            </FormControl>
                        </div>
                        <div style={classes.div_style}>
                            <Button 
                                variant="contained" 
                                style={{background: '#33beff'}}
                                type="submit"
                            >
                                Authorization
                            </Button>
                        </div>
                        <Link to={'/register'} style={{color: '#33beff'}}>Not registered yet?</Link>
                    </Paper>
                </Grid>
            </Grid>
            </Form>
        </div>
    );
};

export default function Login() {
  return (
    <ThemeProvider theme={theme}>
      <Log/>
    </ThemeProvider>
  )
}
