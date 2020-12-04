import React, { useState }  from "react";
import { useAuth } from "../context/auth";
import { useHistory, Redirect } from "react-router-dom";
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';




function Login() {
  


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

  const history = useHistory();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthTokens } = useAuth();


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
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  const classes = useStyles();


  function postLogin() {
   
    setError(false)
    axios.post("http://localhost:8000/api/login", {
      email : email,
     password: password
    }).then(response => {
      
        console.log(response);
        localStorage.removeItem('token')
        localStorage.setItem('token',response.data.token)
        window.location.reload(); // impossible to me to use Redirect at this point, don't want to waste time, so i make a refresh of the page to force the redirection by my if condition down
        
    }).catch(error => {
      if(error){
        console.log(error.response.data.message)
      setError(error.response.data.message)
      setIsError(true);
      }
      
    });

    
  }

  if (localStorage.getItem('token')) {
   return <Redirect to="/todo" />;
  }
  


  return (
   
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Bienvenu sur AOS TODO
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Addresse Email "
            name="email"
            autoComplete="email"
            autoFocus
            onChange={e => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mot de passe"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={e => {
              setPassword(e.target.value);
            }}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={postLogin} 
          >
            Connexion
          </Button>
          <Grid container>
            <Grid item>
              <Link to="register" variant="body2">
                {"Pas de compte? Inscription"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      { isError &&<div> { error } </div> }
    </Container>

      
     
      
  );
  
}

export default Login;