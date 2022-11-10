const LogsItem = (props) => {
    return (
        <tbody>
            {props.logs && props.logs.map((log, index) => (
                <tr>
                    <td><input type="checkbox" className="dark-checkbox"></input></td>
                    <td>
                        {new Intl.DateTimeFormat("en-GB", {
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                        }).format(new Date(log.date))}
                    </td>
                    <td>{log.title}</td>
                    <td>{log.content}</td>
                    <td>{log.type}</td>
                </tr>
            ))}
        </tbody>
    );
}

export default LogsItem;