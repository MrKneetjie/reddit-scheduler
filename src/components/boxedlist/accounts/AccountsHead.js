const AccountsHead = (props) => {
    return (
        <thead>
            <tr>
                <th className="col-1"><input type="checkbox" className="dark-checkbox"></input></th>
                <th className="col-3">#</th>
                <th className="col-4">Username</th>
                {props.type !== "Bots" && <th className="col-2">Cleanse</th>}
                <th className="col-2">Delete</th>
            </tr>
        </thead>
    );
}

export default AccountsHead;