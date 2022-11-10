
import { useEffect, useState } from 'react';
import BoxedList from '../../../components/boxedlist/BoxedList';
import Footer from '../../../components/footer/Footer';
import Header from '../../../components/header/Header';
import Sidebar from '../../../components/sidebar/Sidebar';
import Checkauth from '../../../helpers/auth/CheckAuth';
import './Logs.css';

const Logs = () => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        getLogs();
    }, [])

    async function getLogs() {
        await fetch('https://www.onlybands.xyz/api/getLogs',
        {
          mode: 'no-cors'
        })
        .then(response => response.json())
        .then(logs => setLogs(logs));
    }

    return (
        <div className="logs">
            <Checkauth perm={"admin"}/>
            <Sidebar />
            <Header />
            {logs && <BoxedList type="Logs" data={logs}/>}
            <Footer />
        </div>
    );
}

export default Logs;