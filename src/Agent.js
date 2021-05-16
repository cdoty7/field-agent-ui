import { Link } from "react-router-dom";
import Button from "./Button";

const Agent = ({ agentId, firstName, middleName, lastName, dob, heightInInches, removeAgent}) => {

      //delete
      const deleteAgent = ()  => {
        fetch(`http://localhost:8080/api/agent/${agentId}`, { method: "DELETE" })
          .then((response) => {
            if (response.status === 204) {
              removeAgent(agentId);
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
    <tr key={agentId}>
      <td>{agentId}</td>
      <td>{firstName}</td>
      <td>{middleName}</td>
      <td>{lastName}</td>
      <td>{dob}</td>
      <td>{heightInInches}</td>
      <td>
        <Link to={`/agents/edit/${agentId}`}><Button text="Edit" /></Link>
        <Button text="Delete" onClick={() => deleteAgent(agentId)} />
      </td>
    </tr>
  );
};

export default Agent;
