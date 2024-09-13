import HeaderLayout from '../layouts/HeaderLayout';
import Home from '../pages/Home';
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
                element: (
                    <Home />
                )
            },
            {
                path: '/category/:categoryName',
                element: (
                    <Category />
                )
            },
            {
                path: '/product/:productId',
                element: (
                    <Product />
                )
            }
        ]
    }
]);

export default router;
