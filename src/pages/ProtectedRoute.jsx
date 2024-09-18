import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import propTypes from 'prop-types';

const ProtectedRoute = ({ children, navigateTo }) => {

    const token = sessionStorage.getItem('accessToken');

    // navigate
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate(navigateTo);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token])

    if (token) {
        return children;
    }
}

ProtectedRoute.propTypes = {
    children: propTypes.element,
    navigateTo: propTypes.string,
};

export default ProtectedRoute;
