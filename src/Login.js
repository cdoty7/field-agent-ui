import { useContext, useState } from "react";
import { Link, useHistory, useLocation } from 'react-router-dom';
import AuthContext from "./AuthContext";
import Heading from "./Heading";

const Login = () => {
    const auth = useContext(AuthContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    
    const history = useHistory();
    const location = useLocation();
  
    const { state: { from } = { from : '/' } } = location;
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      try {
        await auth.authenticate(username, password);
        history.push(from);
      } catch (err) {
        setErrors([err.message]);
      }
    }
  
    return (
      <div>
        <Heading text="> Login" />
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
            <button className="btn btn-outline-light" type="submit">Login</button>
            <Link className="btn btn-outline-light" to={from}>Cancel</Link>
            <Link className="btn btn-outline-light" to="/register">Register</Link>
          </div>
        </form>
      </div>
    );
  }

export default Login;
