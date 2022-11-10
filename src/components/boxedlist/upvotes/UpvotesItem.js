const UpvotesItem = (props) => {
    return (
        <tbody>
            {props.upvotes && props.upvotes.map(upvote => {
                return <tr>
                <td><input type="checkbox" className="dark-checkbox"></input></td>
                <td>{upvote._id}</td>
                <td>{upvote.post}</td>
                <td>{upvote.current}/{upvote.amount}</td>
                <td>{upvote.status}</td>
            </tr>;
            })}
        </tbody>
    );
}

export default UpvotesItem;