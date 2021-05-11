import Button from "./Button";

const Agent = ({ agent }) => {
  //delete
  const deleteAgent = ({ agentId })  => {
    fetch(`http://localhost:8080/api/agent/${agentId}`, { method: "DELETE" })
      .then((response) => {
        if (response.status === 204) {
          setAgents(agents.filter((a) => a.agentId !== agentId));
        } else if (response.status === 404) {
          return Promise.reject("Agent not found");
        } else {
          return Promise.reject(
            `Delete failed with status: ${response.status}`
          );
        }
      })
      .catch(console.log);
  };

  return (
    <tr key={agent.agentId}>
      <td>{agent.agentId}</td>
      <td>{agent.firstName}</td>
      <td>{agent.middleName}</td>
      <td>{agent.lastName}</td>
      <td>{agent.dob}</td>
      <td>{agent.heightInInches}</td>
      <td>
        <Button text="Edit" />{" "}
        <Button text="Delete" onClick={() => deleteAgent(agent.agentId)} />
      </td>
    </tr>
  );
};

export default Agent;
