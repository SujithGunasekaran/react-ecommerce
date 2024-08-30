import { FaGithub } from "react-icons/fa";
import '../styles/header.css';

const Header = () => {
    return (
        <header className='header-container'>
            <h1 className='header-title'>React Ecommerce</h1>
            <div className='header-link'>
                <FaGithub className='icon' />
            </div>
        </header>
    )
}

export default Header;
