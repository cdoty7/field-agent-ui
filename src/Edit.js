import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Button from "./Button";
import Heading from "./Heading";

const Edit = () => {
  const defaultAgent = {
    agentId: 0,
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    heightInInches: 0,
  };

  const [agent, setAgent] = useState(defaultAgent);
  const { id } = useParams();

  const [firstName, setFirstName] = useState(agent.firstName);
  const [middleName, setMiddleName] = useState(agent.middleName);
  const [lastName, setLastName] = useState(agent.lastName);
  const [dob, setDob] = useState(agent.dob);
  const [heightInInches, setHeightInInches] = useState(agent.heightInInches);

  const history = useHistory();

  useEffect(() => {
    fetch(`http://localhost:8080/api/agent/${id}`)
      .then((response) => response.json())
      .then((data) => setAgent(data))
      .catch((error) => console.log(error));
  }, [id]);

  const onSubmit = (e) => {
    e.preventDefault();

    const newAgent = {
      agentId: id,
      firstName: firstName.length > 0 ? firstName : agent.firstName,
      middleName: middleName.length > 0 ? middleName : agent.middleName,
      lastName: lastName.length > 0 ? lastName : agent.lastName,
      dob: dob.length > 0 ? dob : agent.dob,
      heightInInches:
        heightInInches.length > 0 ? heightInInches : agent.heightInInches,
    };

    const init = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newAgent),
    };

    console.log(init);

    fetch(`http://localhost:8080/api/agent/${id}`, init)
      .then((response) => {
        if (response.status !== 204) {
          return Promise.reject("couldn't update");
        }
      })
      .then(history.push("/agents"))
      .catch(console.log);
  };

  return (
    <>
      <Heading text="> Edit Agent" />
      <form className="form-inline" onSubmit={onSubmit}>
        <label className="sr-only mb-2" htmlFor="firstName">
          First Name
        </label>
        <input
          type="text"
          className="form-control mb-3 mr-sm-2"
          id="firstName"
          defaultValue={agent.firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label className="sr-only mb-2" htmlFor="middleName">
          Middle Name
        </label>
        <input
          type="text"
          className="form-control mb-3 mr-sm-2"
          id="middleName"
          defaultValue={agent.middleName}
          onChange={(e) => setMiddleName(e.target.value)}
        />
        <label className="sr-only mb-2" htmlFor="firstName">
          Last Name
        </label>
        <input
          type="text"
          className="form-control mb-3 mr-sm-2"
          id="LastName"
          defaultValue={agent.lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <label className="sr-only mb-2" htmlFor="dob">
          Date of Birth
        </label>
        <input
          type="text"
          className="form-control mb-3 mr-sm-2"
          id="dob"
          defaultValue={agent.dob}
          onChange={(e) => setDob(e.target.value)}
        />
        <label className="sr-only mb-2" htmlFor="heightInInches">
          Height (in inches)
        </label>
        <input
          type="text"
          className="form-control mb-3 mr-sm-2"
          id="heightInInches"
          defaultValue={agent.heightInInches}
          onChange={(e) => setHeightInInches(e.target.value)}
        />
        <button type="submit" className="btn btn-outline-light">
          Submit
        </button>
        <Button text="Cancel" onClick={() => history.push("/agents")} />
      </form>
    </>
  );
};

export default Edit;
