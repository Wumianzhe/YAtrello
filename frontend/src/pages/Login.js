import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@mui/material/Button';
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
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
    const classes = useStyles();

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
        <div className={classes.root}>
            
            <Grid container justifyContent="center" className={classes.main_grid_style}> 
                <Grid item xs={12} sm={5}>
                    <Paper className={classes.paper}>
                        <h1 style={{color: 'blue'}}>
                            Authorization
                        </h1>
                        <div className={classes.div_style}>
                            <FormControl className={classes.form_style} variant="outlined">
                                <InputLabel htmlFor="component-outlined">Email</InputLabel>
                                <OutlinedInput 
                                    id="component-outlined" 
                                    value={values.email} 
                                    onChange={handleChange('email')} 
                                    label="email" 
                                />
                            </FormControl>
                        </div>
                        <div className={classes.div_style}>
                            <FormControl className={classes.form_style} variant="outlined">
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
                                    labelWidth={70}
                                />
                            </FormControl>
                        </div>
                        <div className={classes.div_style}>
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

export default Log;