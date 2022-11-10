import { useState, useEffect } from 'react';
import BulkAccModal from '../../modals/bulkaccmodal/BulkAccModal';
import BulkPostModal from '../../modals/bulkpostmodal/BulkPostModal';
import PostModal from '../../modals/postmodal/PostModal';
import AccountsHead from './accounts/AccountsHead';
import AccountsItem from './accounts/AccountsItem';
import PostsHead from './posts/PostsHead';
import PostsItem from './posts/PostsItem';
import './BoxedList.css';
import UpvoteModal from '../../modals/upvotemodal/UpvoteModal';
import UpvotesHead from './upvotes/UpvotesHead';
import UpvotesItem from './upvotes/UpvotesItem';
import UsersHead from './users/Usershead';
import UsersItem from './users/UsersItem';
import AddAccountModal from '../../modals/addaccount/AddAccountModal';
import LogsHead from './logs/LogsHead';
import LogsItem from './logs/LogItem';

const BoxedList = (props) => {
    const [isBulkAccModalOpen, setIsBulkAccModalOpen] = useState(false);
    const [isBulkPostModalOpen, setIsBulkPostModalOpen] = useState(false);
    const [isAddAccountModalOpen, setIsAddAccountModalOpen] = useState(false);
    const [isBotsModalOpen, setIsBotsModalOpen] = useState(false);
    const [isUpvoteModalOpen, setIsUpvoteModalOpen] = useState(false);
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);
    const [pageSize, setPageSize] = useState(10);
    const [pageIndex, setPageIndex] = useState(1);
    const [items, setItems] = useState([]);

    useEffect(() => {
      handleItems(pageSize);
    }, [props])
    
    const handleItems = (size, index = pageIndex) => {
        let temp = [];

        for (let i = 0; i < size; i++) {
            if(props.data[((index - 1) * size) + i]) temp.push(props.data[((index - 1) * size) + i]);
        }

        setItems(temp);
    }

    const handleModal = () => {
        setIsBulkAccModalOpen(!isBulkAccModalOpen);
    }

    const handlePostModal = () => {
        setIsPostModalOpen(!isPostModalOpen);
    }

    const handleBulkPostModal = () => {
        setIsBulkPostModalOpen(!isBulkPostModalOpen);
    }

    const handleAddAccountModal = () => {
        setIsAddAccountModalOpen(!isAddAccountModalOpen);
    }

    const handleBotsModal = () => {
        setIsBotsModalOpen(!isBotsModalOpen);
    }

    const handleUpvoteModal = () => {
        setIsUpvoteModalOpen(!isUpvoteModalOpen);
    }

    const handlePageSize = (event) => {
        setPageSize(event.target.value);
        handleItems(event.target.value);
    }

    const changePageIndex = (amount) => {
        const index = pageIndex + amount;
        if(index <= 0 || index > (Math.ceil(props.data.length / pageSize))) return;
        setPageIndex(index);
        handleItems(pageSize, index)
    }

    const handlePageIndex = (amount) => {
        setPageIndex(amount);
        handleItems(pageSize, amount)
    }

    return (
        <div className="boxed-list">
            {props.type === "Accounts" && isBulkAccModalOpen && <BulkAccModal onClose={handleModal.bind()}/>}
            {props.type === "Bots" && isBotsModalOpen && <BulkAccModal onClose={handleBotsModal.bind()} type={props.type}/>}
            {props.type === "Upvotes" && isUpvoteModalOpen && <UpvoteModal onClose={handleUpvoteModal.bind()}/>}
            {props.type === "Posts" && isPostModalOpen && <PostModal onClose={handlePostModal.bind()} users={props.users}/>}
            {props.type === "Posts" && isBulkPostModalOpen && <BulkPostModal onClose={handleBulkPostModal.bind()}/>}
            {props.type === "Users" && isAddAccountModalOpen && <AddAccountModal onClose={handleAddAccountModal.bind()}/>}
            <div className="boxed-list-header">
                <div className="boxed-list-header-item">
                    {props.type === "Accounts" && <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 24 24" width="1em" class="svg-icon--material svg-icon card-icon text-success" data-name="Material--AccountCircle">
                        <path d="M0 0h24v24H0V0z" fill="none"></path>
                        <path d="M12 4c-4.41 0-8 3.59-8 8 0 1.82.62 3.49 1.64 4.83 1.43-1.74 4.9-2.33 6.36-2.33s4.93.59 6.36 2.33A7.95 7.95 0 0020 12c0-4.41-3.59-8-8-8zm0 9c-1.94 0-3.5-1.56-3.5-3.5S10.06 6 12 6s3.5 1.56 3.5 3.5S13.94 13 12 13z" opacity="0.3"></path>
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7.07 18.28c.43-.9 3.05-1.78 4.93-1.78s4.51.88 4.93 1.78C15.57 19.36 13.86 20 12 20s-3.57-.64-4.93-1.72zm11.29-1.45c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33A7.95 7.95 0 014 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83zM12 6c-1.94 0-3.5 1.56-3.5 3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 8 12 8s1.5.67 1.5 1.5S12.83 11 12 11z"></path>
                    </svg>}
                    {props.type === "Users" && <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 24 24" width="1em" class="svg-icon--material svg-icon card-icon text-success" data-name="Material--AccountCircle">
                        <path d="M0 0h24v24H0V0z" fill="none"></path>
                        <path d="M12 4c-4.41 0-8 3.59-8 8 0 1.82.62 3.49 1.64 4.83 1.43-1.74 4.9-2.33 6.36-2.33s4.93.59 6.36 2.33A7.95 7.95 0 0020 12c0-4.41-3.59-8-8-8zm0 9c-1.94 0-3.5-1.56-3.5-3.5S10.06 6 12 6s3.5 1.56 3.5 3.5S13.94 13 12 13z" opacity="0.3"></path>
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7.07 18.28c.43-.9 3.05-1.78 4.93-1.78s4.51.88 4.93 1.78C15.57 19.36 13.86 20 12 20s-3.57-.64-4.93-1.72zm11.29-1.45c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33A7.95 7.95 0 014 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83zM12 6c-1.94 0-3.5 1.56-3.5 3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 8 12 8s1.5.67 1.5 1.5S12.83 11 12 11z"></path>
                    </svg>}
                    {props.type === "Posts" && <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 24 24" width="1em" class="svg-icon--material svg-icon card-icon text-info" data-name="Material--Alarm">
                        <path d="M0 0h24v24H0V0z" fill="none"></path>
                        <path d="M12 6c-3.86 0-7 3.14-7 7s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm3.75 10.85L11 14V8h1.5v5.25l4 2.37-.75 1.23z" opacity="0.3"></path>
                        <path d="M12.5 8H11v6l4.75 2.85.75-1.23-4-2.37zm4.837-6.19l4.607 3.845-1.28 1.535-4.61-3.843zm-10.674 0l1.282 1.536L3.337 7.19l-1.28-1.536zM12 4a9 9 0 10.001 18.001A9 9 0 0012 4zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z"></path>
                    </svg>}
                    {props.type === "Upvotes" && <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 24 24" width="1em" class="svg-icon--material svg-icon btn-icon" data-name="Material--PublishedWithChanges">
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path d="M17.66 9.53l-7.07 7.07-4.24-4.24 1.41-1.41 2.83 2.83 5.66-5.66 1.41 1.41zM4 12c0-2.33 1.02-4.42 2.62-5.88L9 8.5v-6H3l2.2 2.2C3.24 6.52 2 9.11 2 12c0 5.19 3.95 9.45 9 9.95v-2.02c-3.94-.49-7-3.86-7-7.93zm18 0c0-5.19-3.95-9.45-9-9.95v2.02c3.94.49 7 3.86 7 7.93 0 2.33-1.02 4.42-2.62 5.88L15 15.5v6h6l-2.2-2.2c1.96-1.82 3.2-4.41 3.2-7.3z"></path>
                    </svg>}
                    {props.type === "Bots" && <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 24 24" width="1em" class="svg-icon--material svg-icon card-icon text-primary" data-name="Material--Person">
                        <path d="M0 0h24v24H0V0z" fill="none"></path>
                        <path d="M12 16c-2.69 0-5.77 1.28-6 2h12c-.2-.71-3.3-2-6-2z" opacity="0.3"></path>
                        <circle cx="12" cy="8" opacity="0.3" r="2"></circle>
                        <path d="M12 14c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm-6 4c.22-.72 3.31-2 6-2 2.7 0 5.8 1.29 6 2H6zm6-6c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z"></path>
                    </svg>}
                    {props.type === "Logs" && <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 24 24" width="1em" fill="currentColor" class="svg-icon--material svg-icon navigation-icon" data-name="Material--AutoStories">
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path d="M3 6.71v9.91c1.14-.41 2.31-.62 3.5-.62s2.36.21 3.5.62v-9.9C8.89 6.25 7.7 6 6.5 6c-1.22 0-2.39.24-3.5.71z" opacity="0.3"></path>
                        <path d="M19 .5l-5 5V15l5-4.5z"></path>
                        <path d="M22.47 5.2c-.47-.24-.96-.44-1.47-.61v12.03c-1.14-.41-2.31-.62-3.5-.62-1.9 0-3.78.54-5.5 1.58V5.48C10.38 4.55 8.51 4 6.5 4c-1.79 0-3.48.44-4.97 1.2-.33.16-.53.51-.53.88v12.08c0 .58.47.99 1 .99.16 0 .32-.04.48-.12C3.69 18.4 5.05 18 6.5 18c2.07 0 3.98.82 5.5 2 1.52-1.18 3.43-2 5.5-2 1.45 0 2.81.4 4.02 1.04.16.08.32.12.48.12.52 0 1-.41 1-.99V6.08c0-.37-.2-.72-.53-.88zM10 16.62C8.86 16.21 7.69 16 6.5 16s-2.36.21-3.5.62V6.71C4.11 6.24 5.28 6 6.5 6c1.2 0 2.39.25 3.5.72v9.9z"></path>
                    </svg>}
                    <h1>{props.type}</h1>
                    <h4>Items: {(pageIndex * pageSize) > props.data.length ? props.data.length : (pageIndex * pageSize)}/{props.data.length}</h4>
                </div>
                {props.type === "Accounts" && <div className="boxed-list-header-item">
                    <button className="button-succes" onClick={props.addAccount}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 24 24" width="1em" class="svg-icon--material svg-icon navigation-icon" data-name="Material--PersonAdd">
                            <path d="M0 0h24v24H0V0z" fill="none"></path>
                            <path d="M15 16c-2.69 0-5.77 1.28-6 2h12c-.2-.71-3.3-2-6-2z" opacity="0.3"></path>
                            <circle cx="15" cy="8" opacity="0.3" r="2"></circle>
                            <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 8c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm-6 4c.22-.72 3.31-2 6-2 2.7 0 5.8 1.29 6 2H9zm-3-3v-3h3v-2H6V7H4v3H1v2h3v3z"></path>
                        </svg>
                        <p>Add Account</p>
                    </button>
                    <button className="button-info" onClick={handleModal.bind()}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 24 24" width="1em" class="svg-icon--material svg-icon navigation-icon" data-name="Material--PersonAdd">
                            <path d="M0 0h24v24H0V0z" fill="none"></path>
                            <path d="M15 16c-2.69 0-5.77 1.28-6 2h12c-.2-.71-3.3-2-6-2z" opacity="0.3"></path>
                            <circle cx="15" cy="8" opacity="0.3" r="2"></circle>
                            <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 8c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm-6 4c.22-.72 3.31-2 6-2 2.7 0 5.8 1.29 6 2H9zm-3-3v-3h3v-2H6V7H4v3H1v2h3v3z"></path>
                        </svg>
                        <p>Bulk Add</p>
                    </button>
                </div>}
                {props.type === "Users" && <div className="boxed-list-header-item">
                    <button className="button-succes" onClick={handleAddAccountModal.bind()}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 24 24" width="1em" class="svg-icon--material svg-icon navigation-icon" data-name="Material--PersonAdd">
                            <path d="M0 0h24v24H0V0z" fill="none"></path>
                            <path d="M15 16c-2.69 0-5.77 1.28-6 2h12c-.2-.71-3.3-2-6-2z" opacity="0.3"></path>
                            <circle cx="15" cy="8" opacity="0.3" r="2"></circle>
                            <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 8c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm-6 4c.22-.72 3.31-2 6-2 2.7 0 5.8 1.29 6 2H9zm-3-3v-3h3v-2H6V7H4v3H1v2h3v3z"></path>
                        </svg>
                        <p>Add Account</p>
                    </button>
                </div>}
                {props.type === "Bots" && <div className="boxed-list-header-item">
                    <button className="button-info" onClick={handleBotsModal.bind()}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 24 24" width="1em" class="svg-icon--material svg-icon navigation-icon" data-name="Material--PersonAdd">
                            <path d="M0 0h24v24H0V0z" fill="none"></path>
                            <path d="M15 16c-2.69 0-5.77 1.28-6 2h12c-.2-.71-3.3-2-6-2z" opacity="0.3"></path>
                            <circle cx="15" cy="8" opacity="0.3" r="2"></circle>
                            <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 8c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm-6 4c.22-.72 3.31-2 6-2 2.7 0 5.8 1.29 6 2H9zm-3-3v-3h3v-2H6V7H4v3H1v2h3v3z"></path>
                        </svg>
                        <p>Bulk Add</p>
                    </button>
                </div>}
                {props.type === "Upvotes" && <div className="boxed-list-header-item">
                <button className="button-succes" onClick={handleUpvoteModal.bind()}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 24 24" width="1em" class="svg-icon--material svg-icon card-icon text-light" data-name="Material--RateReview">
                            <path d="M0 0h24v24H0V0z" fill="none"></path>
                            <path d="M4 17.17l.59-.59.58-.58H20V4H4v13.17zM18 14h-7.5l2-2H18v2zM6 11.53l5.88-5.88c.2-.2.51-.2.71 0l1.77 1.77c.2.2.2.51 0 .71L8.47 14H6v-2.47z" opacity="0.3"></path>
                            <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17l-.59.59-.58.58V4h16v12zm-9.5-2H18v-2h-5.5zm3.86-5.87c.2-.2.2-.51 0-.71l-1.77-1.77c-.2-.2-.51-.2-.71 0L6 11.53V14h2.47l5.89-5.87z"></path>
                        </svg>
                        <p>Upvote Post</p>
                    </button>
                </div>}
                {props.type === "Posts" && <div className="boxed-list-header-item">
                    <button className="button-succes" onClick={handlePostModal.bind()}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 24 24" width="1em" class="svg-icon--material svg-icon card-icon text-light" data-name="Material--RateReview">
                            <path d="M0 0h24v24H0V0z" fill="none"></path>
                            <path d="M4 17.17l.59-.59.58-.58H20V4H4v13.17zM18 14h-7.5l2-2H18v2zM6 11.53l5.88-5.88c.2-.2.51-.2.71 0l1.77 1.77c.2.2.2.51 0 .71L8.47 14H6v-2.47z" opacity="0.3"></path>
                            <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17l-.59.59-.58.58V4h16v12zm-9.5-2H18v-2h-5.5zm3.86-5.87c.2-.2.2-.51 0-.71l-1.77-1.77c-.2-.2-.51-.2-.71 0L6 11.53V14h2.47l5.89-5.87z"></path>
                        </svg>
                        <p>Single Post</p>
                    </button>
                    <button className="button-info" onClick={handleBulkPostModal.bind()}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 24 24" width="1em" class="svg-icon--material svg-icon card-icon text-light" data-name="Material--RateReview">
                            <path d="M0 0h24v24H0V0z" fill="none"></path>
                            <path d="M4 17.17l.59-.59.58-.58H20V4H4v13.17zM18 14h-7.5l2-2H18v2zM6 11.53l5.88-5.88c.2-.2.51-.2.71 0l1.77 1.77c.2.2.2.51 0 .71L8.47 14H6v-2.47z" opacity="0.3"></path>
                            <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17l-.59.59-.58.58V4h16v12zm-9.5-2H18v-2h-5.5zm3.86-5.87c.2-.2.2-.51 0-.71l-1.77-1.77c-.2-.2-.51-.2-.71 0L6 11.53V14h2.47l5.89-5.87z"></path>
                        </svg>
                        <p>Bulk Post</p>
                    </button>
                </div>}
            </div>
            <div className="boxed-list-content">
                <table>
                    {props.type === "Accounts" && <AccountsHead />}
                    {props.type === "Accounts" && <AccountsItem accounts={items}/>}
                    {props.type === "Users" && <UsersHead />}
                    {props.type === "Users" && <UsersItem users={items}/>}
                    {props.type === "Upvotes" && <UpvotesHead />}
                    {props.type === "Upvotes" && <UpvotesItem upvotes={items}/>}
                    {props.type === "Bots" && <AccountsHead type={props.type}/>}
                    {props.type === "Bots" && <AccountsItem accounts={items} type={props.type}/>}
                    {props.type === "Posts" && <PostsHead />}
                    {props.type === "Posts" && <PostsItem posts={items} users={props.users}/>}
                    {props.type === "Logs" && <LogsHead />}
                    {props.type === "Logs" && <LogsItem logs={items}/>}
                </table>
            </div>
            <div className="boxed-list-footer">
                <h2>Showing {1 + ((pageIndex - 1) * pageSize)} to {(pageIndex * pageSize) > props.data.length ? props.data.length : (pageIndex * pageSize)} of {props.data.length} items</h2>
                <div className="boxed-list-footer-nav">
                    <ul>
                        <li className={`page-item ${pageIndex > 1 ? "" : "disabled"}`} onClick={() => {handlePageIndex(1)}}>
                            <span role="button" class="page-link" tabindex="-1" aria-disabled="true" aria-label="null page">
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 24 24" width="1em" class="svg-icon--material svg-icon" data-name="Material--FirstPage">
                                    <path d="M24 0v24H0V0h24z" fill="none" opacity="0.87"></path>
                                    <path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6 1.41-1.41zM6 6h2v12H6V6z"></path>
                                </svg>
                            </span>
                        </li>
                        <li className={`page-item ${pageIndex > 1 ? "" : "disabled"}`} onClick={() => {changePageIndex(-1)}}>
                            <span role="button" class="page-link" tabindex="-1" aria-disabled="true" aria-label="First Page">
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 24 24" width="1em" class="svg-icon--material svg-icon" data-name="Material--ChevronLeft">
                                    <path d="M0 0h24v24H0V0z" fill="none"></path>
                                    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z"></path>
                                </svg>
                            </span>
                        </li>
                        <li class="page-item active">
                            <span role="button" class="page-link" aria-label="1 page">{pageIndex}</span>
                        </li>
                        <li className={`page-item ${pageIndex < (Math.ceil(props.data.length / pageSize)) ? "" : "disabled"}`} onClick={() => {changePageIndex(1)}}>
                            <span role="button" class="page-link" aria-label="Last Page">
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 24 24" width="1em" class="svg-icon--material svg-icon" data-name="Material--ChevronRight">
                                    <path d="M0 0h24v24H0V0z" fill="none"></path>
                                    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z"></path>
                                </svg>
                            </span>
                        </li>
                        <li className={`page-item ${pageIndex < (Math.ceil(props.data.length / pageSize)) ? "" : "disabled"}`} onClick={() => {handlePageIndex((Math.ceil(props.data.length / pageSize)))}}>
                            <span role="button" class="page-link" aria-label="null page">
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 24 24" width="1em" class="svg-icon--material svg-icon" data-name="Material--LastPage">
                                    <path d="M0 0h24v24H0V0z" fill="none" opacity="0.87"></path>
                                    <path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6-1.41 1.41zM16 6h2v12h-2V6z"></path>
                                </svg>
                            </span>
                        </li>
                    </ul>
                    <select value={pageSize} onChange={handlePageSize.bind()}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="25" >25</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export default BoxedList;