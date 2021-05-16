import { useState, useHistory } from "react";
import Button from "./Button";

const Add = () => {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [heightInInches, setHeightInInches] = useState("");

  const history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();

    onAdd({ firstName, middleName, lastName, dob, heightInInches });

    const addAgent = () => {
      const init = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(onAdd),
      };

      fetch("http://localhost:8080/api/agent", init)
        .then((response) => {
          if (response.status !== 201) {
            return Promise.reject("response is not OK");
          }
          return response.json();
        })
        .then(history.push("/agents"))
        .catch(console.log);
    };
  };

  return (
    <>
      <Heading text="> Add Agent" />
      <form className="form-inline" onSubmit={onSubmit}>
        <label className="sr-only mb-2" htmlFor="firstName" required>
          First Name
        </label>
        <input
          type="text"
          className="form-control mb-3 mr-sm-2"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label className="sr-only mb-2" htmlFor="middleName">
          Middle Name
        </label>
        <input
          type="text"
          className="form-control mb-3 mr-sm-2"
          id="middleName"
          value={middleName}
          onChange={(e) => setMiddleName(e.target.value)}
        />
        <label className="sr-only mb-2" htmlFor="lastName" required>
          Last Name
        </label>
        <input
          type="text"
          className="form-control mb-3 mr-sm-2"
          id="LastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <label className="sr-only mb-2" htmlFor="dob">
          Date of Birth
        </label>
        <input
          type="text"
          className="form-control mb-3 mr-sm-2"
          id="dob"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
        <label className="sr-only mb-2" htmlFor="heightInInches">
          Height (in inches)
        </label>
        <input
          type="text"
          className="form-control mb-3 mr-sm-2"
          id="heightInInches"
          value={heightInInches}
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

export default Add;
