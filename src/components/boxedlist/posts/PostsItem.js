import { useState, useEffect } from "react";
import PostCommentModal from "../../../modals/postcomment/PostCommentModal";

const PostsItem = (props) => {
    const [isPostCommentModalOpen, setIsPostCommentModalOpen] = useState(false);
    const [postId, setPostId] = useState(0);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, [])

    const handleCancelPost = (id) => {
        cancelPost(id);
    }

    const handleCommentOnPost = (id) => {
        setPostId(id);
        setIsPostCommentModalOpen(true);
    }

    const cancelPost = (id) => {
        fetch('https://www.onlybands.xyz/api/cancelPost', {
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

    const handleModal = () => {
        setIsPostCommentModalOpen(!isPostCommentModalOpen);
    }

    async function getUsers() {
        await fetch('https://www.onlybands.xyz/api/getUsers',
        {
          mode: 'no-cors'
        })
        .then(response => response.json())
        .then(users => setUsers(users));
    }

    return (
        <tbody>
            {isPostCommentModalOpen && <PostCommentModal onClose={handleModal.bind()} postId={postId} users={users}/>}
            {props.posts && props.posts.map(post => {
                return <tr>
                <td><input type="checkbox" className="dark-checkbox"></input></td>
                <td>{post.link}</td>
                <td>{props.users[0] ? (props.users.filter((user) => {return user.refreshToken === post.code})[0] ? props.users.filter((user) => {return user.refreshToken === post.code})[0].username : "undefined") : "undefined"}</td>
                <td>{new Intl.DateTimeFormat("en-GB", {
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                }).format(new Date(post.date))}</td>
                <td>{post.sub}</td>
                <td>{post.title.substring(0,40) + (post.title.length > 40 ? "..." : "")}</td>
                <td>{post.text.substring(0,40) + (post.text.length > 40 ? "..." : "")}</td>
                <td>{post.posted ? "✅" : "👎🏽"}</td>
                <td>🤏🏽 {post.score ? post.score : "0"} 👀 {post.views ? post.views : "0"} 💬 {post.comments ? post.comments : "0"}</td>
                <td><button className="buttonNoStyle" onClick={function(e) {handleCommentOnPost(post.link)}}>💬</button></td>
                <td><button className="buttonNoStyle" onClick={function(e) {handleCancelPost(post._id)}}>❌</button></td>
            </tr>;
            })}
        </tbody>
    );
}

export default PostsItem;