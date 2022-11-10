const UsersItem = (props) => {
    const handleChange = (username, perm) => {
        togglePerms(username, perm);
    }

    const togglePerms = (username, perm) => {
        fetch('https://www.onlybands.xyz/api/togglePerms', {
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
                username,
                perm
            })
        })
        .then(response => response.json())
        .then(data => {
    
        });
    }

    const handleRemoveUser = (id) => {
        removeUser(id);
    }

    const removeUser = (id) => {
        fetch('https://www.onlybands.xyz/api/removeAccount', {
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
            {props.users && props.users.map(user => {
                return <tr>
                <td><input type="checkbox" className="dark-checkbox"></input></td>
                <td>{user.username}</td>
                <td><input type="checkbox" className="dark-checkbox" defaultChecked={user.admin} onChange={() => handleChange(user.username, "admin")}></input></td>
                <td><input type="checkbox" className="dark-checkbox" defaultChecked={user.redditPosts} onChange={() => handleChange(user.username, "posts")}></input></td>
                <td><input type="checkbox" className="dark-checkbox" defaultChecked={user.redditDms} onChange={() => handleChange(user.username, "dms")}></input></td>
                <td><input type="checkbox" className="dark-checkbox" defaultChecked={user.redditUpvotes} onChange={() => handleChange(user.username, "upvotes")}></input></td>
                <td><button className="buttonNoStyle" onClick={function(e) {handleRemoveUser(user._id)}}>❌</button></td>
            </tr>;
            })}
        </tbody>
    );
}

export default UsersItem;