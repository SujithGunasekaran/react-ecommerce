import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import CircleLoader from '../Loaders/CircleLoader';
import { FaSearch } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { baseUrl } from '../constants';
import axios from 'axios';
import '../styles/search.css';

const SearchResultItem = lazy(() => import('./SearchResultItem'));

const ProductSearchInput = () => {

    // navigate
    const navigate = useNavigate();

    // state
    const [searchQuery, setSearchQuery] = useState('');
    const [searchedProducts, setSearchProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [activeList, setActiveList] = useState(-1);

    // ref
    const abortController = useRef(null);
    const listRef = useRef(null);

    const handleSearchQuery = (event) => {
        const { value } = event.target;
        setSearchQuery(value);
    }

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
            if (error.message !== 'canceled') {
                console.log('search product api error', error);
            }
        } finally {
            setIsLoading(false);
        }
    }

    const handleKeyDown = (event) => {
        const { key } = event;
        console.log('check - 1', event);
        if (searchedProducts.length === 0) return;

        if (key === 'Enter') {
            event.preventDefault();
            const { id } = searchedProducts[activeList];
            navigate(`/product/${id}`);
        } else if (key === 'ArrowUp') {
            event.preventDefault();
            setActiveList((prevState) => {
                return prevState > 0 ? prevState - 1 : prevState;
            });
        } else if (key === 'ArrowDown') {
            event.preventDefault();
            setActiveList((prevState) => {
                return prevState < searchedProducts.length - 1 ? prevState + 1 : prevState;
            });
        }
    }

    const scrollToItem = () => {
        if (listRef.current && listRef.current.children.length > 0) {
            listRef.current.children[activeList]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    const cancelApi = () => {
        if (abortController.current) {
            abortController.current.abort();
            abortController.current = null;
        }
    }

    const resetData = (event) => {
        if (listRef.current && listRef.current.contains(event.relatedTarget)) {
            console.log('inside');
            return;
        }
        setSearchQuery('');
        setSearchProducts([]);
        setActiveList(-1);
        listRef.current = null;
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
        scrollToItem();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeList])

    return (
        <div className='search-wrapper'>
            <div className='search-input-wrapper'>
                <div className='search-icon'><FaSearch className='icon' /></div>
                <input
                    id='search-input'
                    type='text'
                    name='search-input'
                    value={searchQuery}
                    className='search-input'
                    placeholder='Search products...'
                    onChange={handleSearchQuery}
                    onKeyDown={handleKeyDown}
                    onBlur={resetData}
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
                        <MdOutlineCancel className='icon' />
                    </div>
                }
            </div>
            {
                searchedProducts.length > 0 &&
                <div className='search-dropdown-container' ref={listRef}>
                    <Suspense fallback={<div>Loading...</div>}>
                        {
                            searchedProducts.map((product, index) => (
                                <SearchResultItem
                                    key={product.id}
                                    index={index}
                                    productId={product.id}
                                    thumbnail={product.thumbnail}
                                    title={product.title}
                                    isActive={activeList === index}
                                />
                            ))
                        }
                    </Suspense>
                </div>
            }
        </div>
    )
}

export default ProductSearchInput;
