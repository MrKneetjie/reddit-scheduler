const UpvotesHead = (props) => {
    return (
        <thead>
            <tr>
                <th className="col-1"><input type="checkbox" className="dark-checkbox"></input></th>
                <th className="col-3">#</th>
                <th className="col-2">Post</th>
                <th className="col-3">Amount</th>
                <th className="col-3">Status</th>
            </tr>
        </thead>
    );
}

export default UpvotesHead;