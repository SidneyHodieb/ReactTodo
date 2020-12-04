import React, { useState, useEffect } from "react"
import "./App.css";
import PrivateRoute from './PrivatesRoutes';
import { AuthContext } from "./context/auth";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Todo from "./components/Todo";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import { useHistory, Redirect} from "react-router-dom";



function App(props) {
  const existingTokens = localStorage.getItem("token");
  const [authTokens, setAuthTokens] = useState(existingTokens);
  const history = useHistory();


  



  return (
    <Router>
  
    <AuthContext.Provider value={{authTokens, setAuthTokens: existingTokens}}>
          
          <PrivateRoute exact path="/todo" component={Todo} />
          <Route path="/home" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/Register" component={Register} />

    </AuthContext.Provider>
    </Router>
  );
}


export default App;