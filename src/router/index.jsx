import { lazy, Suspense } from 'react';
import HeaderLayout from '../layouts/HeaderLayout';
import { createBrowserRouter } from 'react-router-dom';

const Home = lazy(() => import('../pages/Home'));
const Category = lazy(() => import('../pages/Category'));

const router = createBrowserRouter([
    {
        path: '/',
        element: <HeaderLayout />,
        children: [
            {
                index: true,
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <Home />
                    </Suspense>
                )
            },
            {
                path: '/category/:categoryName',
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <Category />
                    </Suspense>
                )
            }
        ]
    }
]);

export default router;