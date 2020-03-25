import React from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Login from "./components/Login/login"
import Index from "./components/Index/index"
import SignUp from "./components/SignUp/signup"

class App extends React.Component{

  render(){
    return (
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/">
            <Index />
          </Route>
        </Switch>
      </Router>
    )
  }
}

export default App