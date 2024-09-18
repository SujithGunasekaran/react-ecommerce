import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import propTypes from 'prop-types';
import CircleLoader from "../Loaders/CircleLoader";
import '../styles/login.css';


const LoginProtect = ({ children }) => {

    const { isAuthenticated, isLoading, authenticateUser } = useAuth();

    // navigate
    const navigate = useNavigate();

    useEffect(() => {
        authenticateUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated])

    if (isLoading) {
        return (
            <div className='protect-page-loader-wrapper'>
                <CircleLoader className='protect-page-loader' />
            </div>
        )
    }

    if (!isAuthenticated) {
        return children;
    }

}

LoginProtect.propTypes = {
    children: propTypes.element
};

export default LoginProtect;
