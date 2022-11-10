import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
    return (
        <div className="landing">
            <div className="landingNav">
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </div>
            <h1>Onlybands</h1>
        </div>
    );
}

export default Landing;