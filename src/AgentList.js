import { useState, useEffect } from "react";
import Agent from "./Agent";
import Heading from "./Heading";

const AgentList = () => {
  const [agents, setAgents] = useState([]);

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
      <table className="table table-dark table-hover mt-3">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">First Name</th>
            <th scope="col">Middle Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Date of Birth</th>
            <th scope="col">Height</th>
            <th scope="col"></th>
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
