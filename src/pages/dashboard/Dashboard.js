import Sidebar from '../../components/sidebar/Sidebar';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';

import './Dashboard.css';
import Checkauth from '../../helpers/auth/CheckAuth';
import BasicAnalytics from '../../components/analytics/basic/BasicAnalytics';

const Dashboard = () => {
    return (
        <div className="dashboard">
            <Sidebar />
            <Header />
            <Checkauth />
            <BasicAnalytics></BasicAnalytics>
            <Footer />
        </div>
    );
}

export default Dashboard;