const UsersHead = (props) => {
    return (
        <thead>
            <tr>
                <th className="col-1"><input type="checkbox" className="dark-checkbox"></input></th>
                <th className="col-2">Username</th>
                <th className="col-2">Admin</th>
                <th className="col-2">Reddit Posts</th>
                <th className="col-2">Reddit Dms</th>
                <th className="col-2">Reddit Upvotes</th>
                <th className="col-1">Delete</th>
            </tr>
        </thead>
    );
}

export default UsersHead;