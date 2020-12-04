import React from 'react'
import { useAuth } from "../context/auth";
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';


function Home(props) {
    const { setAuthTokens } = useAuth();

    
  
    return (
      <div>
        <Button variant="contained" color="primary">
      Hello World
       </Button>
       
      </div>
    );
  }
export default Home
