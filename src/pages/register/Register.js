import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
    let navigate = useNavigate();

    const handleRegisterSubmit = (event) => {
        event.preventDefault();
    
        fetch('https://www.onlybands.xyz/api/register', {
            method: 'POST',
            mode: 'no-cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({
                username: event.target.username.value,
                password: event.target.password.value,
            })
        })
        .then(response => {
        if (response.status === 200) {
            navigate('/login');
        } else if (response.status === 409) {
            console.log("Account already exists");
        } else if (response.status === 500) {
            console.log("Server error");
        }
        });
    }

    return (
        <div className="register">
            <form onSubmit={handleRegisterSubmit}>
                <div>
                    <h4>Register!</h4>
                </div>

                <div className="input-group">
                    <label>Username</label>
                    <input type="text" name="username"></input>
                </div>

                <div className="input-group">
                    <label>Password</label>
                    <input type="password" name="password"></input>
                </div>

                <button>REGISTER</button>
            </form>
        </div>
    );
}

export default Register;