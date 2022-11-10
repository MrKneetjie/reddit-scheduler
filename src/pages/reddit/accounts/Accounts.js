
import { useEffect, useState } from 'react';
import BoxedList from '../../../components/boxedlist/BoxedList';
import Footer from '../../../components/footer/Footer';
import Header from '../../../components/header/Header';
import Sidebar from '../../../components/sidebar/Sidebar';
import Checkauth from '../../../helpers/auth/CheckAuth';
import './Accounts.css';

const Accounts = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, [])

    async function getUsers() {
        await fetch('https://www.onlybands.xyz/api/getUsers',
        {
          mode: 'no-cors'
        })
        .then(response => response.json())
        .then(users => setUsers(users));
    }

    const addAccount = async () => {
        fetch('https://www.onlybands.xyz/api/authUrl',
          {
            mode: 'no-cors'
          })
          .then(response => response.json())
          .then(data => window.location.href = data.url);
    }

    return (
        <div className="accounts">
            <Checkauth perm={"redditPosts"}/>
            <Sidebar />
            <Header />
            {users && <BoxedList type="Accounts" data={users} addAccount={addAccount}/>}
            <Footer />
        </div>
    );
}

export default Accounts;