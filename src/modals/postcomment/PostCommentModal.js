import { useState } from 'react';

import './PostCommentModal.css';

const PostCommentModal = (props) => {
    const [selectedUser, setSelectedUser] = useState("Select a user");

    const handleSelectedUser = (event) => {
        setSelectedUser(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        fetch('https://www.onlybands.xyz/api/commentOnPost', {
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
                postId: props.postId,
                account: event.target.account.value,
                comment: event.target.comment.value
              })
          })
          .then(response => response.json())
          .then(data => {
              props.onClose();
          });
    }

    return (
        <div className="modal">
            <div className="modal-header">
                <h4>Comment On Post</h4>
                <button class="button-close" onClick={props.onClose}></button>
            </div>
            <form className="modal-form" onSubmit={handleSubmit}>
                <div className="modal-form-header">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 24 24" width="1em" class="svg-icon--material svg-icon card-icon text-info" data-name="Material--Assignment">
                        <path d="M0 0h24v24H0V0z" fill="none"></path>
                        <path d="M5 5v14h14V5H5zm9 12H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" opacity="0.3"></path>
                        <path d="M7 15h7v2H7zm0-4h10v2H7zm0-4h10v2H7zm12-4h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-.14 0-.27.01-.4.04a2.008 2.008 0 00-1.44 1.19c-.1.24-.16.49-.16.77v14c0 .27.06.54.16.78s.25.45.43.64c.27.27.62.47 1.01.55.13.02.26.03.4.03h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7-.25c.41 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75zM19 19H5V5h14v14z"></path>
                    </svg>
                    <h1>Comment</h1>
                </div>
                <div className="modal-form-card">
                    <h1>Account</h1>
                    <div className="modal-form-card-input-group">
                        <label>{selectedUser}</label>
                        <select value={selectedUser} onChange={handleSelectedUser.bind()} id="account">
                            <option disabled>Select a user</option>
                            {props.users && props.users.map((user) => {
                                return <option value={user.refeshToken}>{user.username}</option>;
                            })}
                        </select>
                    </div>
                    <div className="modal-form-card-input-group">
                        <label>Text</label>
                        <textarea id="comment"></textarea>
                    </div>
                </div>
                <div className="modal-form-submit">
                    <button className="button-info">
                        <p>Comment!</p>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default PostCommentModal;