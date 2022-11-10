const AccountsItem = (props) => {
    const handleRemoveAccount = (id) => {
        removeUser(id);
    }

    const handleRemoveBot = (id) => {
        removeBot(id);
    }

    const handleCleanseAccount = (id) => {
        cleanseUser(id);
    }

    const removeUser = (id) => {
        fetch('https://www.onlybands.xyz/api/removeUser', {
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
                id,
            })
        })
        .then(response => response.json())
        .then(data => {
    
        });
    }

    const removeBot = (id) => {
        fetch('https://www.onlybands.xyz/api/removeBot', {
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
                id,
            })
        })
        .then(response => response.json())
        .then(data => {
    
        });
    }

    const cleanseUser = (id) => {
        fetch('https://www.onlybands.xyz/api/cleanseUser', {
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
                id,
            })
        })
        .then(response => response.json())
        .then(data => {
    
        });
    }

    return (
        <tbody>
            {props.accounts && props.accounts.map(account => {
                return <tr>
                <td><input type="checkbox" className="dark-checkbox"></input></td>
                <td>{account._id}</td>
                <td>{account.username}</td>
                {props.type !== "Bots" && <td><button className="buttonNoStyle" onClick={function(e) {handleCleanseAccount(account._id)}}>🗑️</button></td>}
                {props.type !== "Bots" && <td><button className="buttonNoStyle" onClick={function(e) {handleRemoveAccount(account._id)}}>❌</button></td>}
                {props.type === "Bots" && <td><button className="buttonNoStyle" onClick={function(e) {handleRemoveBot(account._id)}}>❌</button></td>}
            </tr>;
            })}
        </tbody>
    );
}

export default AccountsItem;