
import { useState } from 'react';
import Footer from '../../../components/footer/Footer';
import Header from '../../../components/header/Header';
import Sidebar from '../../../components/sidebar/Sidebar';
import Checkauth from '../../../helpers/auth/CheckAuth';
import './Flairs.css';

const Flairs = () => {
    const [flairs, setFlairs] = useState([]);

    const handleChangeSub = (event) => {
        debounce(getFlairs("Savings-Ship2929", event.target.value), 2500);
    }

    const handleCopy = (event) => {
        console.log(event.target.name);
        navigator.clipboard.writeText(event.target.name);
    }

    const getFlairs = async (userId, subreddit) => {
        const response = await fetch('https://www.onlybands.xyz/api/getFlairs', {
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
                user: userId,
                sub: subreddit,
            })
        }).then(function(response) {
            return response.json();
          }).then(function(data) {
            setFlairs(data.flairs)
          }).catch(err => console.error(err));
    }

    const debounce = (func, waitFor) => {
        let timeout;
        return (...args) => new Promise(resolve => {
            if (timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(() => resolve(func(...args)), waitFor);
        });
    }

    return (
        <div className="posts">
            <Checkauth perm={"redditPosts"}/>
            <Sidebar />
            <Header />
            <form className="modal-form flairs-form">
                <div className="modal-form-header">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 24 24" width="1em" class="svg-icon--material svg-icon card-icon text-info" data-name="Material--Assignment">
                        <path d="M0 0h24v24H0V0z" fill="none"></path>
                        <path d="M5 5v14h14V5H5zm9 12H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" opacity="0.3"></path>
                        <path d="M7 15h7v2H7zm0-4h10v2H7zm0-4h10v2H7zm12-4h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-.14 0-.27.01-.4.04a2.008 2.008 0 00-1.44 1.19c-.1.24-.16.49-.16.77v14c0 .27.06.54.16.78s.25.45.43.64c.27.27.62.47 1.01.55.13.02.26.03.4.03h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7-.25c.41 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75zM19 19H5V5h14v14z"></path>
                    </svg>
                    <h1>Flairs</h1>
                </div>
                <div className="modal-form-card">
                    <h1>Flairs Info</h1>
                    <div className="modal-form-card-input-group">
                        <label>Subreddit</label>
                        <input onChange={(e) => handleChangeSub(e)} type="text" id="sub"></input>
                    </div>
                </div>
                <div className="modal-form-card">
                    <h1>Flairs</h1>
                    <div className="modal-form-card-input-group">
                        <label>Select post flairs</label>
                        <div className="flairs">
                            {flairs && flairs.map((flair) => {
                                return <div className="flair"><button type="button" className="button-succes flair-button" name={flair.flair_template_id} onClick={handleCopy.bind()}>{flair.flair_text}</button></div>;
                            })}
                        </div>
                    </div>
                </div>
            </form>
            <Footer />
        </div>
    );
}

export default Flairs;