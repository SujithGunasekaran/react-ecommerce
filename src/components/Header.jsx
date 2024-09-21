import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { IoMdCart } from "react-icons/io";
import '../styles/header.css';

const Header = () => {

    // navigate
    const navigate = useNavigate();

    // selector
    const { userCartCount } = useSelector((store) => store.cart);

    const { userToken, resetUserAndCart } = useAuth();

    const goToLoginPage = () => {
        navigate('/login');
    }

    const logOutUser = () => {
        resetUserAndCart();
    }

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
                    <p className='cart-count'>{userCartCount > 9 ? '9+' : userCartCount}</p>
                </div>
                {
                    !userToken ?
                        <button
                            className='header-auth-btn'
                            onClick={goToLoginPage}
                        >
                            Login
                        </button>
                        : <button
                            className='header-auth-btn'
                            onClick={logOutUser}
                        >
                            Logout
                        </button>
                }
            </div>
        </header>
    )
}

export default Header;
