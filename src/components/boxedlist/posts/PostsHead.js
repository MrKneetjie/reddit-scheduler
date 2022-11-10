const PostsHead = () => {
    return (
        <thead>
            <tr>
                <th className="col-1"><input type="checkbox" className="dark-checkbox"></input></th>
                <th className="col-1">Link</th>
                <th className="col-1">User</th>
                <th className="col-1">Date</th>
                <th className="col-1">Sub</th>
                <th className="col-2">Title</th>
                <th className="col-1">Text</th>
                <th className="col-1">Posted</th>
                <th className="col-1">Score</th>
                <th className="col-1">Comment</th>
                <th className="col-1">Cancel</th>
            </tr>
        </thead>
    );
}

export default PostsHead;