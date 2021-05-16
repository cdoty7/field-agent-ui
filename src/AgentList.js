import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Agent from "./Agent";
import Heading from "./Heading";
import AuthContext from "./AuthContext";
import Button from "./Button";

const AgentList = () => {
  const [agents, setAgents] = useState([]);
  const auth = useContext(AuthContext);

  //get agent list
  useEffect(() => {
    getAgents();
  }, []);

  const getAgents = () => {
    fetch("http://localhost:8080/api/agent")
      .then((response) => {
        if (response.status !== 200) {
          return Promise.reject("fetch failed");
        }
        return response.json();
      })
      .then((json) => setAgents(json))
      .catch(console.log);
  };

  const removeAgent = (agentId) => {
    let newAgents = [];

    for (let i = 0; i < agents.length; i++) {
      if (agents[i].agentId !== agentId) {
        newAgents.push(agents[i]);
      }
    }

    if (newAgents.length !== agents.length) {
      setAgents(newAgents);
    }
  };

  return (
    <div>
      <Heading text="> Agents" />
      <h5>Hello {auth.user.username}.</h5>
      <table className="table table-dark table-hover mt-3">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">First Name</th>
            <th scope="col">Middle Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Date of Birth</th>
            <th scope="col">Height</th>
            <th scope="col"><Link to="/agents/add"><Button text="Add Agent" /></Link></th>
          </tr>
        </thead>
        <tbody>
          {agents.map((agent) => (
            <Agent
              key={agent.agentId}
              agentId={agent.agentId}
              firstName={agent.firstName}
              middleName={agent.middleName}
              lastName={agent.lastName}
              dob={agent.dob}
              heightInInches={agent.heightInInches}
              removeAgent={removeAgent}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AgentList;
