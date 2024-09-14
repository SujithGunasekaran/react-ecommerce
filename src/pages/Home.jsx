import { useEffect, useState } from 'react';
import axios from 'axios';
import { getArrayWithNLength } from '../utils/loaderUtils.js';
import ProductCardLoader from '../Loaders/ProductCardLoader.jsx';
import ProductSearchInput from '../components/ProductSearchInput';
import Categories from '../components/Categories';
import ProductCardList from '../components/ProductCardList';
import InlineMessage from '../components/InlineMessage';
import { baseUrl, productLimit } from '../constants';
import { trottle } from '../utils/commonUtils';
import '../styles/home.css';
import '../styles/category.css';
import '../styles/product.css';


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
        <main className='home-container'>
            <aside className='home-category-container'>
                <Categories />
            </aside>
            <section className='home-product-container'>
                <ProductSearchInput />
                {
                    hasError &&
                    <InlineMessage
                        type={'error'}
                        message={'Failed to load the products'}
                    />
                }
                {
                    productList.length > 0 &&
                    <ProductCardList
                        productList={productList}
                    />
                }
                {
                    isLoading &&
                    <div className='product-list-container'>
                        {
                            getArrayWithNLength(12).map((_, index) => (
                                <ProductCardLoader key={index} />
                            ))
                        }
                    </div>
                }
            </section>
        </main>
    )
}

export default Home;
