import HeaderLayout from '../layouts/HeaderLayout';
import Home from '../pages/Home';
import Category from '../pages/Category';
import Product from '../pages/Product';
import Login from '../pages/Login';
import Cart from '../pages/Cart';
import LoginProtect from '../pages/LoginProtect';
import ProtectedRoute from '../pages/ProtectedRoute';
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
