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
import {Link} from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';

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
        email: '',
        password: '',
        showPassword: false,
    });
    
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    
    const verificationAndAuthorization = () => {
        console.log("тут должна выполняться проверка email и password");
        console.log(values);
    };
    return (
        <div style={classes.root}>
            
            <Grid container justifyContent="center" style={classes.main_grid_style}> 
                <Grid item xs={12} sm={5}>
                    <Paper style={classes.paper}>
                        <h1 style={{color: 'blue'}}>
                            Authorization
                        </h1>
                        <div style={classes.div_style}>
                            <FormControl style={classes.form_style} variant="outlined">
                                <InputLabel htmlFor="component-outlined">Email</InputLabel>
                                <OutlinedInput 
                                    id="component-outlined" 
                                    value={values.email} 
                                    onChange={handleChange('email')} 
                                    label="email" 
                                />
                            </FormControl>
                        </div>
                        <div style={classes.div_style}>
                            <FormControl style={classes.form_style} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={values.showPassword ? 'text' : 'password'}
                                    value={values.password}
                                    onChange={handleChange('password')}
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
                                />
                            </FormControl>
                        </div>
                        <div style={classes.div_style}>
                            <Button 
                                variant="contained" 
                                style={{background: 'blue'}}
                                onClick={verificationAndAuthorization}
                            >
                                Authorization
                            </Button>
                        </div>
                        <Link to={'/reg'} style={{color: 'blue'}}>Not registered yet?</Link>
                    </Paper>
                </Grid>
            </Grid>

        </div>
    );
};

export default function ExpLog() {
  return (
    <ThemeProvider theme={theme}>
      <Log/>
    </ThemeProvider>
  )
}
