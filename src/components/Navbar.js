import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory, Redirect} from "react-router-dom";



function Navbar() {

    function logOut() {
        localStorage.removeItem('token')
        window.location.reload();
        return <Redirect to="/login"/>
      }
    
      const useStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1,
        },
        menuButton: {
          marginRight: theme.spacing(2),
        },
        title: {
          flexGrow: 1,
        },
      }));
      
      const classes = useStyles();

        
    useEffect(() => { 
        if(localStorage.getItem("token")){
        setInterval( function(){ 
          localStorage.removeItem("token")
          window.location.reload();
        }, 3000000); // deconnect after 50minutes// i didn't have enough time to do a refresh token, so i use this alternative
    }
      });


    return (
         
    <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        <Typography  variant="h6" className={classes.title}>
          AOS TODO
        </Typography>
        <Button onClick={logOut} className="btn btn-primary">Déconnexion</Button>
      </Toolbar>
    </AppBar>
    </div>
    )
}

export default Navbar
