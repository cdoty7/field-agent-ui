import { useState, useEffect } from "react";
import Button from "./Button";
import Heading from "./Heading";
import Add from "./Add";
import Edit from "./Edit"

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

  //add
  const addAgent = (agent) => {
    const init = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(agent),
    };

    fetch("http://localhost:8080/api/agent", init)
      .then((response) => {
        if (response.status !== 201) {
          return Promise.reject("response is not OK");
        }
        return response.json();
      })
      .then((json) => {
        setAgents([...agents, json]);
      })
      .catch(console.log);
  };

  //edit
  const editAgent = () => {
    
    const init = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify()
    };
  
    fetch("http://localhost:8080/api", init)
      .then(response => {
        if (response.status !== 204) {
          return Promise.reject("couldn't update");
        }
      })
      .then(getAgents()) 
  };


  //delete
const deleteAgent = (agentId) => {
  fetch(`http://localhost:8080/api/agent/${agentId}`, { method: "DELETE" })
  .then(response => {
      if (response.status === 204) {
          setAgents(agents.filter(a => a.agentId !== agentId));
      } else if (response.status === 404) {
          return Promise.reject("Agent not found");
      } else {
          return Promise.reject(`Delete failed with status: ${response.status}`);
      }
  })
  .catch(console.log);
  getAgents();
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
          {agents.map((a) => (
            <tr key={a.agentId}>
              <td>{a.agentId}</td>
              <td>{a.firstName}</td>
              <td>{a.middleName}</td>
              <td>{a.lastName}</td>
              <td>{a.dob}</td>
              <td>{a.heightInInches}</td>
              <td>
                <Button text="Edit" /> <Button text="Delete" onClick={() => deleteAgent(a.agentId)}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="row">
        <div className="col-6">
          <Heading text="> Add Agent" />
          <Add onAdd={addAgent} />
        </div>  
        <div className="col-6">  
          <Heading text="> Edit Agent" />
          <Edit onAdd={editAgent} />
        </div>  
      </div>
    </div>
  );
  }

export default AgentList;
