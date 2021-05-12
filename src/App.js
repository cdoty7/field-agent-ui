import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AgentList from "./AgentList";
import Edit from "./Edit";

import "./bootstrap.min.css";

function App() {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
        <Router>
          <Switch>
           <Route exact path="/">
          <AgentList />
          </Route> 
          <Route path="/edit/:id">
          <Edit />
          </Route>
        </Switch>
        </Router>  
        </div>
      </div>
    </div>  
  );
}

export default App;
