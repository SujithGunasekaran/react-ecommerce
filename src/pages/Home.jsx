import { useEffect, useState } from 'react';
import axios from 'axios';
import Categories from '../components/Categories';
import ProductList from '../components/ProductList';
import { baseUrl, homePageProductLimit } from '../constants';
import '../styles/home.css';

const Home = () => {

    // state
    const [productList, setProductList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);


    const fetchProduct = async () => {
        try {
            setIsLoading(true);
            const skip = currentPage * homePageProductLimit;
            const response = await axios.get(`${baseUrl}/products?limit=${homePageProductLimit}&skip=${skip}`);
            if (response.data) {
                if (response.data.limit < homePageProductLimit) {
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
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchProduct();
    }, [])

    return (
        <>
            <div className='home-container'>
                <div className='home-category-container'>
                    <Categories />
                </div>
                <div className='home-product-container'>
                    <ProductList
                        productList={productList}
                        showSkeleton={isLoading}
                    />
                    {
                        hasMore &&
                        <div className='home-footer'>
                            <button className='load-more-btn' onClick={fetchProduct}>Load More</button>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default Home;