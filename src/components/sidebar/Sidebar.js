import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Sidebar.css';

const Sidebar = () => {
    const location = useLocation();
    const [isAdmin, setIsAdmin] = useState(false);
    const [redditPosts, setRedditPosts] = useState(true);
    const [redditUpvotes, setRedditUpvotes] = useState(true);
    const [redditDms, setRedditDms] = useState(true);

    useEffect(() => {
        let username = localStorage.getItem('account');
        if (username != null) {
            getAuth(username);
        }
    }, [])

    async function getAuth(username) {
        await fetch(`https://www.onlybands.xyz/api/getAuth/${username}`,
        {
          mode: 'no-cors'
        })
        .then(response => response.json())
        .then(auth => {
            setIsAdmin(auth.admin);
            setRedditPosts(auth.redditPosts);
            setRedditUpvotes(auth.redditUpvotes);
            setRedditDms(auth.redditDms);
        });
    }
    return (
        <div className="sidebar">
            <div className="sidebar-top">
                <p>Onlybands</p>
            </div>

            <div className="sidebar-mid">
                <ul className="sidebar-nav-list">
                    <li>
                        <Link to="/" className={`sidebar-nav-item ${location.pathname === "/" ? "active" : ""}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 24 24" width="1em" class="svg-icon--material svg-icon navigation-icon" data-name="Material--Dashboard">
                                <path d="M0 0h24v24H0V0z" fill="none"></path>
                                <path d="M5 5h4v6H5zm10 8h4v6h-4zM5 17h4v2H5zM15 5h4v2h-4z" opacity="0.3"></path>
                                <path d="M3 13h8V3H3v10zm2-8h4v6H5V5zm8 16h8V11h-8v10zm2-8h4v6h-4v-6zM13 3v6h8V3h-8zm6 4h-4V5h4v2zM3 21h8v-6H3v6zm2-4h4v2H5v-2z"></path>
                            </svg>
                            <p>Dashboard</p>
                        </Link>
                    </li>
                </ul>
                <hr></hr>
                <h4>Reddit</h4>
                <ul className="sidebar-nav-list">
                {redditPosts && <li>
                        <Link to="/reddit/posts" className={`sidebar-nav-item ${location.pathname === "/reddit/posts" ? "active" : ""}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 24 24" width="1em" class="svg-icon--material svg-icon navigation-icon" data-name="Material--Article">
                                <path fill="none" d="M0 0h24v24H0z"></path>
                                <path d="M5 5v14h14V5H5zm9 12H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" opacity="0.3"></path>
                                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-2-6H7v-2h10v2zm0-4H7V7h10v2zm-3 8H7v-2h7v2z"></path>
                            </svg>
                            <p>Posts</p>
                        </Link>
                    </li>}
                    {redditPosts && <li>
                        <Link to="/reddit/flairs" className={`sidebar-nav-item ${location.pathname === "/reddit/flairs" ? "active" : ""}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 24 24" width="1em" class="svg-icon--material svg-icon navigation-icon" data-name="Material--Article">
                                <path fill="none" d="M0 0h24v24H0z"></path>
                                <path d="M5 5v14h14V5H5zm9 12H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" opacity="0.3"></path>
                                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-2-6H7v-2h10v2zm0-4H7V7h10v2zm-3 8H7v-2h7v2z"></path>
                            </svg>
                            <p>Flairs</p>
                        </Link>
                    </li>}
                    {redditPosts && <li>
                        <Link to="/reddit/accounts" className={`sidebar-nav-item ${location.pathname === "/reddit/accounts" ? "active" : ""}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 24 24" width="1em" class="svg-icon--material svg-icon navigation-icon" data-name="Material--PersonAdd">
                                <path d="M0 0h24v24H0V0z" fill="none"></path>
                                <path d="M15 16c-2.69 0-5.77 1.28-6 2h12c-.2-.71-3.3-2-6-2z" opacity="0.3"></path>
                                <circle cx="15" cy="8" opacity="0.3" r="2"></circle>
                                <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 8c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm-6 4c.22-.72 3.31-2 6-2 2.7 0 5.8 1.29 6 2H9zm-3-3v-3h3v-2H6V7H4v3H1v2h3v3z"></path>
                            </svg>
                            <p>Accounts</p>
                        </Link>
                    </li>}
                    {redditDms && <li>
                        <Link to="/reddit/messages" className={`sidebar-nav-item ${location.pathname === "/reddit/messages" ? "active" : ""}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 24 24" width="1em" class="svg-icon--material svg-icon navigation-icon" data-name="Material--Forum">
                                <path d="M0 0h24v24H0V0z" fill="none"></path>
                                <path d="M15 11V4H4v8.17L5.17 11H6z" opacity="0.3"></path>
                                <path d="M16 13c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10zm-12-.83V4h11v7H5.17L4 12.17zM22 7c0-.55-.45-1-1-1h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7z"></path>
                            </svg>
                            <p>Direct Messages</p>
                        </Link>
                    </li>}
                    {redditUpvotes && <li>
                        <Link to="/reddit/upvotes" className={`sidebar-nav-item ${location.pathname === "/reddit/upvotes" ? "active" : ""}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 24 24" width="1em" class="svg-icon--material svg-icon btn-icon" data-name="Material--PublishedWithChanges">
                                <path fill="none" d="M0 0h24v24H0z"></path>
                                <path d="M17.66 9.53l-7.07 7.07-4.24-4.24 1.41-1.41 2.83 2.83 5.66-5.66 1.41 1.41zM4 12c0-2.33 1.02-4.42 2.62-5.88L9 8.5v-6H3l2.2 2.2C3.24 6.52 2 9.11 2 12c0 5.19 3.95 9.45 9 9.95v-2.02c-3.94-.49-7-3.86-7-7.93zm18 0c0-5.19-3.95-9.45-9-9.95v2.02c3.94.49 7 3.86 7 7.93 0 2.33-1.02 4.42-2.62 5.88L15 15.5v6h6l-2.2-2.2c1.96-1.82 3.2-4.41 3.2-7.3z"></path>
                            </svg>
                            <p>Upvotes</p>
                        </Link>
                    </li>}
                </ul>
                {isAdmin && <div>
                    <h4>Admin</h4>
                    <ul className="sidebar-nav-list">
                        <li>
                            <Link to="/admin/permissions" className={`sidebar-nav-item ${location.pathname === "/admin/permissions" ? "active" : ""}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 24 24" width="1em" class="svg-icon--material svg-icon card-icon text-primary" data-name="Material--Person">
                                    <path d="M0 0h24v24H0V0z" fill="none"></path>
                                    <path d="M12 16c-2.69 0-5.77 1.28-6 2h12c-.2-.71-3.3-2-6-2z" opacity="0.3"></path>
                                    <circle cx="12" cy="8" opacity="0.3" r="2"></circle>
                                    <path d="M12 14c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm-6 4c.22-.72 3.31-2 6-2 2.7 0 5.8 1.29 6 2H6zm6-6c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z"></path>
                                </svg>
                                <p>Permissions</p>
                            </Link>
                        </li>
                        <li>
                            <Link to="/reddit/bots" className={`sidebar-nav-item ${location.pathname === "/reddit/bots" ? "active" : ""}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 24 24" width="1em" class="svg-icon--material svg-icon card-icon text-primary" data-name="Material--Person">
                                    <path d="M0 0h24v24H0V0z" fill="none"></path>
                                    <path d="M12 16c-2.69 0-5.77 1.28-6 2h12c-.2-.71-3.3-2-6-2z" opacity="0.3"></path>
                                    <circle cx="12" cy="8" opacity="0.3" r="2"></circle>
                                    <path d="M12 14c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm-6 4c.22-.72 3.31-2 6-2 2.7 0 5.8 1.29 6 2H6zm6-6c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z"></path>
                                </svg>
                                <p>Bots</p>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/logs" className={`sidebar-nav-item ${location.pathname === "/admin/logs" ? "active" : ""}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 24 24" width="1em" fill="currentColor" class="svg-icon--material svg-icon navigation-icon" data-name="Material--AutoStories">
                                    <path fill="none" d="M0 0h24v24H0z"></path>
                                    <path d="M3 6.71v9.91c1.14-.41 2.31-.62 3.5-.62s2.36.21 3.5.62v-9.9C8.89 6.25 7.7 6 6.5 6c-1.22 0-2.39.24-3.5.71z" opacity="0.3"></path>
                                    <path d="M19 .5l-5 5V15l5-4.5z"></path>
                                    <path d="M22.47 5.2c-.47-.24-.96-.44-1.47-.61v12.03c-1.14-.41-2.31-.62-3.5-.62-1.9 0-3.78.54-5.5 1.58V5.48C10.38 4.55 8.51 4 6.5 4c-1.79 0-3.48.44-4.97 1.2-.33.16-.53.51-.53.88v12.08c0 .58.47.99 1 .99.16 0 .32-.04.48-.12C3.69 18.4 5.05 18 6.5 18c2.07 0 3.98.82 5.5 2 1.52-1.18 3.43-2 5.5-2 1.45 0 2.81.4 4.02 1.04.16.08.32.12.48.12.52 0 1-.41 1-.99V6.08c0-.37-.2-.72-.53-.88zM10 16.62C8.86 16.21 7.69 16 6.5 16s-2.36.21-3.5.62V6.71C4.11 6.24 5.28 6 6.5 6c1.2 0 2.39.25 3.5.72v9.9z"></path>
                                </svg>
                                <p>Logs</p>
                            </Link>
                        </li>
                    </ul>
                </div>}
            </div>

            <div className="sidebar-bottom">
                <img src="https://png.pngtree.com/png-vector/20190221/ourlarge/pngtree-male-avatar-vector-icon-png-image_691595.jpg"></img>
                <div className="sidebar-bottom-text">
                    <h1>David K</h1>
                    <h4>Lead Developer</h4>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;