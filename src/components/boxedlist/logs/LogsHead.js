const LogsHead = () => {
    return (
        <thead>
            <tr>
                <th className="col-1"><input type="checkbox" className="dark-checkbox"></input></th>
                <th className="col-2">Timestamp</th>
                <th className="col-3">Title</th>
                <th className="col-5">Content</th>
                <th className="col-1">Type</th>
            </tr>
        </thead>
    );
}

export default LogsHead;