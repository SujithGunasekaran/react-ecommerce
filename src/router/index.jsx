import { lazy, Suspense } from 'react';
import HeaderLayout from '../layouts/HeaderLayout';
import Home from '../pages/Home';
import Category from '../pages/Category';
import Product from '../pages/Product';
import { createBrowserRouter } from 'react-router-dom';

const Login = lazy(() => import('../pages/Login'));
const Cart = lazy(() => import('../pages/Cart'));

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
                    <Suspense fallback={<div>Loading...</div>}>
                        <Login />
                    </Suspense>
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
                    <Suspense fallback={<div>Loading...</div>}>
                        <Cart />
                    </Suspense>
                )
            }
        ]
    }
]);

export default router;
