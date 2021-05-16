import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AgentList from "./AgentList";
import Edit from "./Edit";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";

import "./bootstrap.min.css";

function App() {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
        <AuthContext.Provider value={auth}> 
        <Router>
          <Switch>
           <Route exact path="/">
            <Home />
          </Route>
          <Route path="/agents">
           <AgentList /> 
          </Route>
          <Route path="/agents/add">
            <Add />
          </Route>
          <Route path="/agents/edit/:id">
          <Edit />
          </Route>
          <Route path="/login">
          <Login />
          </Route>
          <Route path="/register">
          <Register />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
        </Router>
        </AuthContext.Provider>   
        </div>
      </div>
    </div>  
  );
}

export default App;
