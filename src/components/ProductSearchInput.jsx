import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import CircleLoader from '../Loaders/CircleLoader';
import LazyImage from './LazyImage';
import { FaSearch } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { baseUrl } from '../constants';
import axios from 'axios';
import '../styles/search.css';

const ProductSearchInput = () => {

    // state
    const [searchQuery, setSearchQuery] = useState('');
    const [searchedProducts, setSearchProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearchQuery = (event) => {
        const { value } = event.target;
        setSearchQuery(value);
    }

    // ref
    const abortController = useRef(null);

    const searchProduct = async () => {
        try {
            setIsLoading(true);
            abortController.current = new AbortController();
            const response = await axios.get(`${baseUrl}/products/search?q=${searchQuery}`, {
                signal: abortController.current.signal
            });
            if (response.data) {
                setSearchProducts(response.data.products);
            }
        } catch (error) {
            console.log('error - 1', error);
            if (error.message !== 'canceled') {
                console.log('search product api error', error);
            }
        } finally {
            setIsLoading(false);
        }
    }

    const cancelApi = () => {
        if (abortController.current) {
            abortController.current.abort();
            abortController.current = null;
        }
    }

    const resetData = () => {
        setSearchQuery('');
        setSearchProducts([]);
    }

    useEffect(() => {
        let timerId = null;
        if (searchQuery !== '') {
            timerId = setTimeout(() => {
                searchProduct();
            }, 300);
        } else {
            setSearchProducts([]);
        }

        return () => {
            clearTimeout(timerId);
            cancelApi();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchQuery])

    useEffect(() => {
        return () => resetData();
    }, [])

    return (
        <div className='search-wrapper'>
            <div className='search-input-wrapper'>
                <input
                    id='search-input'
                    type='text'
                    name='search-input'
                    value={searchQuery}
                    className='search-input'
                    placeholder='Search products...'
                    onChange={handleSearchQuery}
                />
                {
                    isLoading &&
                    <div className='search-loader'>
                        <CircleLoader className='search-circle-loader' />
                    </div>
                }
                {
                    searchQuery &&
                    <div
                        className='search-cancel'
                        onClick={resetData}
                    >
                        <MdCancel className='icon' />
                    </div>
                }
                <div className='search-icon'><FaSearch className='icon' /></div>
            </div>
            {
                searchedProducts.length > 0 &&
                <div className='search-dropdown-container'>
                    {
                        searchedProducts.map((product, index) => (
                            <Link
                                to={`/product/${product.id}`}
                                className={`search-dropdown-item ${index > 0 && 'border'}`}
                                key={product.id}
                            >
                                <LazyImage
                                    className='thumbnail'
                                    src={product.thumbnail}
                                    alt={product.title}
                                />
                                <p className='title'>{product.title}</p>
                            </Link>
                        ))
                    }
                </div>
            }
        </div>
    )
}

export default ProductSearchInput;
