import { Link } from "react-router-dom";
import Button from "./Button";

const Home = () => {
    return (
        <div className="container">
            <h1> &gt; Welcome</h1>
            <Link to="/agents"><Button text="View Agents" /></Link>
        </div>
    )
}

export default Home;
