import { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import AgentList from "./AgentList";
import Edit from "./Edit";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import AuthContext from "./AuthContext";
import Add from "./Add";
import NotFound from "./NotFound";
import jwt_decode from "jwt-decode";

import "./bootstrap.min.css";

function App() {
  const [user, setUser] = useState(null);

  const login = (token) => {
    const { id, sub: username, roles: rolesString } = jwt_decode(token);
    const roles = rolesString.split(",");

    const user = {
      id,
      username,
      roles,
      token,
      hasRole(role) {
        return this.roles.includes(role);
      },
      isValid() {
        return true;
      },
    };

    setUser(user);
  };

  const authenticate = async (username, password) => {
    const response = await fetch("http://localhost:5000/authenticate", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (response.status === 200) {
      const { jwt_token } = await response.json();
      login(jwt_token);
    } else if (response.status === 403) {
      throw new Error("Bad username or password");
    } else {
      throw new Error("There was a problem logging in...");
    }
  };

  const logout = () => {
    setUser(null);
  };

  const auth = {
    user,
    authenticate,
    logout,
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <AuthContext.Provider value={auth}>
            <Router>
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route exact path="/agents">
                  {user && user.isValid() ? <AgentList /> : <Redirect to="/login" />}
                </Route>
                <Route path="/agents/add">
                  {user ? <Add /> : <Redirect to="/login" />}
                </Route>
                <Route path="/agents/edit/:id">
                  {user ? <Edit /> : <Redirect to="/login" />}
                </Route>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/register">
                  <Register />
                </Route>
                <Route path="*">
                  <NotFound />
                </Route>
              </Switch>
            </Router>
          </AuthContext.Provider>
        </div>
      </div>
    </div>
  );
}

export default App;
