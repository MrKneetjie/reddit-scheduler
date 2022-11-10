
import { useEffect, useState } from 'react';
import BoxedList from '../../../components/boxedlist/BoxedList';
import Footer from '../../../components/footer/Footer';
import Header from '../../../components/header/Header';
import Sidebar from '../../../components/sidebar/Sidebar';
import Checkauth from '../../../helpers/auth/CheckAuth';
import './Bots.css';

const Bots = () => {
    const [bots, setBots] = useState([]);

    useEffect(() => {
        getBots();
    }, [])

    async function getBots() {
        await fetch('https://www.onlybands.xyz/api/getBots',
        {
          mode: 'no-cors'
        })
        .then(response => response.json())
        .then(bots => setBots(bots));
    }

    return (
        <div className="bots">
            <Checkauth perm={"admin"}/>
            <Sidebar />
            <Header />
            {bots && <BoxedList type="Bots" data={bots}/>}
            <Footer />
        </div>
    );
}

export default Bots;