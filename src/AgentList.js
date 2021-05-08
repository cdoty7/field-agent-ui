import { useState, useEffect } from "react";
import Button from './Button';
import Heading from './Heading';
import Add from './Add';

const AgentList = () => {
  const [mesages, setMessages] = useState("");
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/agent")
      .then((response) => {
        if (response.status !== 200) {
          return Promise.reject("fetch failed");
        }
        return response.json();
      })
      .then((json) => setAgents(json))
      .catch(console.log);
  }, []);

  const addAgent = (agent) => {
    const init = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(agent)
    };

    fetch("http://localhost:8080/api/agent", init)
        .then(response => {
            if (response.status !== 201) {
                return Promise.reject("response is not OK");
            }
            return response.json();
        })
        .then(json => {
          setAgents([...agents, json]);
          setMessages("Agent added.");
        })
        .catch(console.log);

};

  return (
    <div>
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
              <td><Button text="Edit" /> <Button text="Delete" /></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div class="row">
        <div class="col-1"></div>
        <div class="col-5">
          <Heading text="> Add Agent" />
          <Add onAdd={addAgent}/>
        </div>
        <div class="col-5 messages">
        <Heading text=" > Messages" />
        </div>
        <div class="col-1"></div>
      </div>
    </div>
  );
};

export default AgentList;
