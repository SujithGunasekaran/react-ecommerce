import { Link } from 'react-router-dom';
import { FaGithub } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import '../styles/header.css';

const Header = () => {

    return (
        <header className='header-container'>
            <h1 className='header-title'>
                <Link to={'/'}>React Ecommerce</Link>
            </h1>
            <div className='header-right-panel'>
                <div className='cart-link'>
                    <Link to={'/cart'}>
                        <IoMdCart className='icon' />
                    </Link>
                    <p className='cart-count'>9+</p>
                </div>
                <div className='cart-link'>
                    <Link to={'/login'}>
                        Login
                    </Link>
                </div>
                <div className='github-link'>
                    <a
                        href='https://github.com/SujithGunasekaran/react-ecommerce'
                        target="_blank"
                        rel="noreference"
                        aria-label="github link"
                    >
                        <FaGithub className='icon' />
                    </a>
                </div>
            </div>
        </header>
    )
}

export default Header;
