import HeaderLayout from '../layouts/HeaderLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import LoginProtect from '../pages/LoginProtect';
import Cart from '../pages/Cart';
import ProtectedRoute from '../pages/ProtectedRoute';
import Category from '../pages/Category';
import Product from '../pages/Product';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
    {
        path: '/',
        element: <HeaderLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: '/login',
                element: (
                    <LoginProtect>
                        <Login />
                    </LoginProtect>
                )
            },
            {
                path: '/category/:categoryName',
                element: <Category />
            },
            {
                path: '/product/:productId',
                element: <Product />
            },
            {
                path: '/cart',
                element: (
                    <ProtectedRoute navigateTo={'/login'}>
                        <Cart />
                    </ProtectedRoute>
                )
            }
        ]
    }
]);

export default router;
