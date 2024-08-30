import { useEffect, useState, lazy, Suspense } from 'react';
import axios from 'axios';
import Categories from '../components/Categories';
import ProductList from '../components/ProductList';
import { baseUrl, productLimit } from '../constants';
import { trottle } from '../utils/commonUtils';
import '../styles/home.css';

const InlineMessage = lazy(() => import('../components/InlineMessage'));

const Home = () => {

    // state
    const [productList, setProductList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const fetchProduct = async () => {
        try {
            setIsLoading(true);
            const skip = currentPage * productLimit;
            const response = await axios.get(`${baseUrl}/products?limit=${productLimit}&skip=${skip}`);
            if (response.data) {
                if (response.data.limit < productLimit) {
                    setHasMore(false);
                }
                setCurrentPage((prevState) => prevState + 1);
                setProductList((prevState) => {
                    let newState = [
                        ...prevState,
                        ...response.data.products
                    ];
                    return newState;
                });
            }
        } catch (error) {
            console.log('home page product api error', error);
            setHasError(true);
        } finally {
            setIsLoading(false);
        }
    }

    const handleScroll = trottle(() => {
        const windowHeight = window.innerHeight;
        const scrollPosition = window.scrollY;
        const totalHeight = document.body.scrollHeight;

        const offset = windowHeight + scrollPosition;

        if (isLoading) return;

        if (totalHeight - 500 < offset && hasMore) {
            fetchProduct();
        }
    }, 100)

    useEffect(() => {
        fetchProduct();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading])

    return (
        <>
            <div className='home-container'>
                <div className='home-category-container'>
                    <Categories />
                </div>
                <div className='home-product-container'>
                    {
                        hasError &&
                        <Suspense fallback={<div>Loading...</div>}>
                            <InlineMessage
                                type={'error'}
                                message={'Failed to load the products'}
                            />
                        </Suspense>
                    }
                    <ProductList
                        productList={productList}
                        showSkeleton={isLoading}
                        skeletonLoaderLength={12}
                    />
                </div>
            </div>
        </>
    )
}

export default Home;