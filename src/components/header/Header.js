import './Header.css';

const Header = () => {
    return (
        <header>
            <h4>Hi, {localStorage.getItem('account')}!</h4>
            <h1>{localStorage.getItem('account')}</h1>
        </header>
    );
}

export default Header;