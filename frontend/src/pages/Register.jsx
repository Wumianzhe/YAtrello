import React from 'react';
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
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
import {Form, Link, useNavigate} from 'react-router-dom';
import { createProfile } from '../API/profileSlice';

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

const Reg = () => {
    const classes = useStyles(theme);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {register, handleSubmit} = useForm()

    const [values, setValues] = React.useState({
        email: '',
        password: '',
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    function onSubmit(username,pass) {
        dispatch(createProfile(username, pass)).then(navigate('/login'));
    }

    return (
        <div style={classes.root}>
            <Form onSubmit={handleSubmit(onSubmit)}>
            <Grid container justifyContent="center" style={classes.main_grid_style}> 
                <Grid item xs={12} sm={5}>
                    <Paper style={classes.paper}>
                        <h1 style={{color: '#33beff'}}>
                            Регистрация
                        </h1>
                        <div style={classes.div_style}>
                            <FormControl style={classes.form_style} variant="outlined">
                                <InputLabel htmlFor="component-outlined">Логин</InputLabel>
                              <OutlinedInput {...register("username",{required : true})}
                                    id="component-outlined" 
                                    label="login"
                                    type="text"
                                />
                            </FormControl>
                        </div>
                        <div style={classes.div_style}>
                            <FormControl style={classes.form_style} variant="outlined">
                                <InputLabel htmlFor="component-outlined">Email</InputLabel>
                              <OutlinedInput {...register("email",{required: true})}
                                    id="component-outlined" 
                                    label="email"
                                    type="text"
                                />
                            </FormControl>
                        </div>
                        <div style={classes.div_style}>
                            <FormControl style={classes.form_style} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Пароль</InputLabel>
                              <OutlinedInput {...register("pass",{required:true})}
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
                                Зарегистрироваться
                            </Button>
                        </div>
                        <Link to={'/login'} style={{color: '#33beff'}}>Уже зарегистрировались?</Link>
                    </Paper>
                </Grid>
            </Grid>
            </Form>
        </div>
    );
};

export default function Register() {
  return (
    <ThemeProvider theme={theme}>
      <Reg/>
    </ThemeProvider>
  )
}
