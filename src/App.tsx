import React from "react";
import {Router, Route, Switch} from "react-router-dom";
import Login from "./components/Login/login"
import Home from "./components/Home/home"
import SignUp from "./components/SignUp/signup"
import history from "../src/config/history"

class App extends React.Component{

  render(){
    return (
      <Router history={history}>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    )
  }
}

export default App