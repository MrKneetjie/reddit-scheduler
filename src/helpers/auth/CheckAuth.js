import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Checkauth = (props) => {
    let navigate = useNavigate();

    useEffect(() => {
        let username = localStorage.getItem('account');
        if (username != null) {
            getAuth(username);
        } else {
            navigate("/landing")
        }
    }, [])

    async function getAuth(username) {
        await fetch(`https://www.onlybands.xyz/api/getAuth/${username}`,
        {
          mode: 'no-cors'
        })
        .then(response => response.json())
        .then(auth => {
            if(auth[props.perm] === false) {
                navigate("/")
            }
        });
    }

    return (
        <></>
    );
}

export default Checkauth;