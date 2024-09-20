import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { resetUserCartInfo } from '../store/slice/cartSlice';
import { setUserInfo, setIsUserLoggedIn, resetUserInfo } from '../store/slice/userSlice';
import { useEffect } from 'react';

const useAuth = () => {

    // state
    const [isLoading, setIsLoading] = useState(true);
    const [userToken, setUserToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // dispatch
    const dispatch = useDispatch();

    // location
    const location = useLocation();

    // token
    const token = sessionStorage.getItem('accessToken') || null;

    // navigate
    const navigate = useNavigate();

    const resetUserAndCart = () => {
        dispatch(resetUserInfo());
        dispatch(resetUserCartInfo());
        setUserToken(null);
        sessionStorage.removeItem('accessToken');
        if (location.pathname === '/cart') {
            navigate('/');
        }
    }

    const authenticateUser = async () => {
        try {
            const userToken = sessionStorage.getItem('accessToken');
            if (!userToken) {
                throw new Error('Token is not available');
            }
            const response = await axios.get('https://dummyjson.com/user/me', {
                headers: {
                    'Authorization': `Bearer ${userToken}`
                },
            });
            if (response.data) {
                setIsAuthenticated(true);
                dispatch(setIsUserLoggedIn(true));
                dispatch(setUserInfo(response.data));
            }
        } catch {
            setIsAuthenticated(false);
            resetUserAndCart();
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        setUserToken(token);
    }, [token])

    return {
        userToken,
        isAuthenticated,
        isLoading,
        setUserToken,
        authenticateUser,
        resetUserAndCart
    }

}

export default useAuth;
