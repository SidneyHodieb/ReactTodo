import React, { useState }  from "react";
import { Link } from 'react-router-dom';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


    function Register() {
      

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [IsError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [Success, setSuccess] = useState("");
  const [IsSuccess, setIsSuccess] = useState(false);
 
  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
        By Sidney Hodieb
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  const classes = useStyles();


    function postRegister() {
            setError(false)
             axios.post("http://localhost:8000/api/register", {
           name: name,
            email: email,
            password : password
            })
            .then(response => {
            console.log(response);
            localStorage.setItem('token',response.data.token)
            setSuccess('Inscription réussie vous pouvez vous connecter')
            setIsSuccess(true)
            }).catch(error => {
              console.log(error.response.data)
              setError(error.response.data)
              setIsError(true);
            }); 
        }

        if (localStorage.getItem('token')) {
          console.log('heiiinnnn')
         return <Redirect to="/todo" />;
        }

        if(!setIsError){
            return <Redirect to="/login" />;
        }

        
        
    
  return (
    
 


<Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Nom"
                name="lastName"
                autoComplete="lname"
                onChange={e => {
                  setName(e.target.value);
                }} 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={e => {
                  setEmail(e.target.value);
                }} 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={e => {
                  setPassword(e.target.value);
                }} 
              />
            </Grid>
          </Grid>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={ postRegister }
          >
            Inscription
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="login" variant="body2">
                Deja un compte? connexion
              </Link>
              { IsError &&<div> { error } </div> }
      { IsSuccess &&<div> { Success } </div> }
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>

     
    
  );
}

export default Register;