import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    let navigate = useNavigate();

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
    
        const response = await fetch('https://www.onlybands.xyz/api/login', {
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
            response.json().then(data => console.log(data));
            localStorage.setItem('account', event.target.username.value);
            navigate('/');
        } else if (response.status === 401) {
            console.log("Wrong password");
        } else if (response.status === 404) {
            console.log("Account not found");
        } else if (response.status === 500) {
            console.log("Server error");
        }
        });
    }

    return (
        <div className="login">
            <form onSubmit={handleLoginSubmit}>
                <div>
                    <h4>Login!</h4>
                </div>

                <div className="input-group">
                    <label>Username</label>
                    <input type="text" name="username"></input>
                </div>

                <div className="input-group">
                    <label>Password</label>
                    <input type="password" name="password"></input>
                </div>

                <button>LOGIN</button>
            </form>
        </div>
    );
}

export default Login;