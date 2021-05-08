import React from "react";
import AgentList from "./AgentList";
import Add from "./Add";
import Heading from "./Heading";
import "./bootstrap.min.css";

function App() {
  return (
    <div className="container">
      <div class="row">
        <div class="col">
        <Heading text="> Agents" />
        <AgentList />
        </div>
      </div>
    </div>  
  );
}

export default App;
