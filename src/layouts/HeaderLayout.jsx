import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import useAuth from '../hooks/useAuth';
import useCart from '../hooks/useCart';


const HeaderLayout = () => {

    const { authenticateUser } = useAuth();
    const { fetchUserCart } = useCart();

    // selector
    const { isUserLoggedIn } = useSelector((store) => store.user);

    useEffect(() => {
        authenticateUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (isUserLoggedIn) {
            fetchUserCart();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isUserLoggedIn])

    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default HeaderLayout;
