
import { useEffect, useState } from 'react';
import BoxedList from '../../../components/boxedlist/BoxedList';
import Footer from '../../../components/footer/Footer';
import Header from '../../../components/header/Header';
import Sidebar from '../../../components/sidebar/Sidebar';
import Checkauth from '../../../helpers/auth/CheckAuth';
import './Posts.css';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getPosts();
        getUsers();
    }, [])

    async function getPosts() {
        let username = localStorage.getItem('account');

        await fetch(`https://www.onlybands.xyz/api/getPosts/${username}`,
        {
          mode: 'no-cors'
        })
        .then(response => response.json())
        .then(posts => setPosts(posts));
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
        <div className="posts">
            <Checkauth perm={"redditPosts"}/>
            <Sidebar />
            <Header />
            {posts && users && <BoxedList type="Posts" data={posts} users={users}/>}
            <Footer />
        </div>
    );
}

export default Posts;