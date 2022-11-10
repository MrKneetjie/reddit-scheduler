
import { useEffect, useState } from 'react';
import BoxedList from '../../../components/boxedlist/BoxedList';
import Footer from '../../../components/footer/Footer';
import Header from '../../../components/header/Header';
import Sidebar from '../../../components/sidebar/Sidebar';
import Checkauth from '../../../helpers/auth/CheckAuth';
import './Upvotes.css';

const Upvotes = () => {
    const [upvotes, setUpvotes] = useState([]);

    useEffect(() => {
        getUpvotes();
    }, [])

    async function getUpvotes() {
        await fetch('https://www.onlybands.xyz/api/getUpvotes',
        {
          mode: 'no-cors'
        })
        .then(response => response.json())
        .then(upvotes => setUpvotes(upvotes));
    }

    return (
        <div className="upvotes">
            <Checkauth perm={"redditUpvotes"}/>
            <Sidebar />
            <Header />
            {upvotes && <BoxedList type="Upvotes" data={upvotes}/>}
            <Footer />
        </div>
    );
}

export default Upvotes;