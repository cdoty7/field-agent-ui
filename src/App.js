import React from "react";
import AgentList from "./AgentList";
import Add from "./Form";
import Heading from "./Heading";
import "./bootstrap.min.css";

function App() {
  return (
    <div className="container">
      <div class="row">
        <div class="col">
        <AgentList />
        </div>
      </div>
    </div>  
  );
}

export default App;
