import { useState } from "react";
import Button from "./Button";

const Edit = ({ agents, onAdd }) => {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [heightInInches, setHeightInInches] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    onAdd({ firstName, middleName, lastName, dob, heightInInches });
    setFirstName("");
    setMiddleName("");
    setLastName("");
    setDob("");
    setHeightInInches("");
  };

  return (
    <>
      <form className="form-inline" onSubmit={onSubmit}>
        <div classname="form-control">
          <label className="sr-only mb-2" htmlFor="firstName">
            First Name
          </label>
          <input
            type="text"
            className="form-control mb-3 mr-sm-2"
            id="firstName"
            defaultValue={firstName}
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
          <label className="sr-only mb-2" htmlFor="firstName">
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
          </button>{" "}
          <Button text="Cancel" />
        </div>
      </form>
    </>
  );
};

export default Edit;