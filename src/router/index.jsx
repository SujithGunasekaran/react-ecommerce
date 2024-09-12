import { lazy, Suspense } from 'react';
import HomePageLoader from '../Loaders/HomePageLoader';
import HeaderLayout from '../layouts/HeaderLayout';
import { createBrowserRouter } from 'react-router-dom';

const Home = lazy(() => import('../pages/Home'));
const Category = lazy(() => import('../pages/Category'));
const Product = lazy(() => import('../pages/Product'));

const router = createBrowserRouter([
    {
        path: '/',
        element: <HeaderLayout />,
        children: [
            {
                index: true,
                element: (
                    <Suspense fallback={<HomePageLoader />}>
                        <Home />
                    </Suspense>
                )
            },
            {
                path: '/category/:categoryName',
                element: (
                    <Suspense fallback={<HomePageLoader />}>
                        <Category />
                    </Suspense>
                )
            },
            {
                path: '/product/:productId',
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <Product />
                    </Suspense>
                )
            }
        ]
    }
]);

export default router;
