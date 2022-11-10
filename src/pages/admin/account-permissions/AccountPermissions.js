
import { useEffect, useState } from 'react';
import BoxedList from '../../../components/boxedlist/BoxedList';
import Footer from '../../../components/footer/Footer';
import Header from '../../../components/header/Header';
import Sidebar from '../../../components/sidebar/Sidebar';
import Checkauth from '../../../helpers/auth/CheckAuth';
import './AccountPermissions.css';

const AccountPermissions = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, [])

    async function getUsers() {
        await fetch('https://www.onlybands.xyz/api/getAccounts',
        {
          mode: 'no-cors'
        })
        .then(response => response.json())
        .then(users => setUsers(users));
    }

    return (
        <div className="accounts">
            <Checkauth perm={"admin"}/>
            <Sidebar />
            <Header />
            {users && <BoxedList type="Users" data={users}/>}
            <Footer />
        </div>
    );
}

export default AccountPermissions;