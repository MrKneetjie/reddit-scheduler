
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import Sidebar from '../../components/sidebar/Sidebar';
import Checkauth from '../../helpers/auth/CheckAuth';
import './NoMatch.css';

const NoMatch = () => {
    let navigate = useNavigate();

    const handeNavigate = () => {
        navigate('/');
    }

    return (
        <div className="dm">
            <Sidebar />
            <Header />
            <Checkauth />
            <div className="dm-content">
                <h1><span>404</span> Not Found</h1>
                <button className="button-info" onClick={handeNavigate.bind()}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 24 24" width="1em" class="svg-icon--material svg-icon navigation-icon" data-name="Material--Dashboard">
                        <path d="M0 0h24v24H0V0z" fill="none"></path>
                        <path d="M5 5h4v6H5zm10 8h4v6h-4zM5 17h4v2H5zM15 5h4v2h-4z" opacity="0.3"></path>
                        <path d="M3 13h8V3H3v10zm2-8h4v6H5V5zm8 16h8V11h-8v10zm2-8h4v6h-4v-6zM13 3v6h8V3h-8zm6 4h-4V5h4v2zM3 21h8v-6H3v6zm2-4h4v2H5v-2z"></path>
                    </svg>
                    <p>Homepage</p>
                </button>
            </div>
            <Footer />
        </div>
    );
}

export default NoMatch;