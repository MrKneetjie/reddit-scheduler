
import { useState } from 'react';
import Footer from '../../../components/footer/Footer';
import Header from '../../../components/header/Header';
import Sidebar from '../../../components/sidebar/Sidebar';
import Checkauth from '../../../helpers/auth/CheckAuth';
import DmModal from '../../../modals/dmmodal/DmModal';
import './MassDm.css';

const MassDm = () => {
    const [isBulkDmModalOpen, setIsBulkDmModalOpen] = useState(false);

    const handleModal = () => {
        setIsBulkDmModalOpen(!isBulkDmModalOpen);
    }

    return (
        <div className="dm">
            <Checkauth perm={"redditDms"}/>
            <Sidebar />
            <Header />
            <div className="dm-content">
                <h1><span>Mass</span> DM</h1>
                <button className="button-info" onClick={handleModal.bind()}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 24 24" width="1em" class="svg-icon--material svg-icon navigation-icon" data-name="Material--Forum">
                        <path d="M0 0h24v24H0V0z" fill="none"></path>
                        <path d="M15 11V4H4v8.17L5.17 11H6z" opacity="0.3"></path>
                        <path d="M16 13c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10zm-12-.83V4h11v7H5.17L4 12.17zM22 7c0-.55-.45-1-1-1h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7z"></path>
                    </svg>
                    <p>Mass DM</p>
                </button>
            </div>
            {isBulkDmModalOpen && <DmModal onClose={handleModal.bind()}/>}
            <Footer />
        </div>
    );
}

export default MassDm;