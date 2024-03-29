import { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthContext from "./AuthContext";
import Errors from "./Errors";
import Heading from "./Heading";

const Register = () => {
    const auth = useContext(AuthContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
  
    const history = useHistory();
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      try {
          const response = await fetch('http://localhost:5000/create_account', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              username,
              password
            })
          });
  
        if (response.status === 201) {
          try {
            await auth.authenticate(username, password);
          history.push('/');
          } catch (err) {
            throw new Error('Unknown Error');
          }     
        } else if (response.status === 400) {
          throw new Error('The account is already in use');
        } else {
          throw new Error('Unknown Error');
        }
      } catch (err) {
        setErrors([err.message]);
      }
      
    }
  
    return (
      <div>
        <Heading text="> Register" />
        <Errors errors={errors} />
        <form onSubmit={handleSubmit}>
        <div>
            <label>Username</label>
            <input type="text" onChange={(event) => setUsername(event.target.value)} />
          </div>
          <div>
            <label>Password</label>
            <input type="password" onChange={(event) => setPassword(event.target.value)} />
          </div>
          <div>
            <button className="btn btn-outline-light" type="submit">Register</button>
            <Link to={'/login'}>Login</Link>
          </div>
        </form>
      </div>
    );
}

export default Register;
