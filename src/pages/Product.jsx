import { useEffect, useState, Suspense, lazy, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { FaPlus, FaMinus } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import axios from 'axios';
import ProductPageLoader from '../Loaders/ProductPageLoader';
import ProductPageLeftPanel from '../components/ProductPageLeftPanel';
import GoBackLink from '../components/GoBackLink';
import { baseUrl } from '../constants';
import '../styles/productpage.css';

const InlineMessage = lazy(() => import('../components/InlineMessage'));

const Product = () => {

    // params
    const { productId = null } = useParams();

    // state
    const [productInfo, setProductInfo] = useState(null);
    const [productQuantity, setProductQuantity] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [activeImage, setActiveImage] = useState(0);

    const fetchProduct = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${baseUrl}/products/${productId}`);
            if (response.data) {
                setProductInfo(response.data);
            }
        } catch (error) {
            console.log('product page error', error);
            setHasError(true);
        } finally {
            setIsLoading(false);
        }
    }

    const handleImageChange = (index) => {
        setActiveImage(index);
    }

    const handleProductQuantity = (event) => {
        const { value = 1 } = event.target;
        setProductQuantity(Number(value));
    }

    const increaseQuantity = () => {
        setProductQuantity((prevState) => prevState <= 50 ? prevState + 1 : prevState);
    }

    const descreaseQuantity = () => {
        setProductQuantity((prevState) => prevState > 1 ? prevState - 1 : prevState);
    }

    const price = useMemo(() => {
        return productInfo?.price ? new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(productInfo.price) : 0;
    }, [productInfo])

    useEffect(() => {
        if (!productId) return;
        fetchProduct();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productId])


    if (hasError) {
        return (
            <Suspense fallback={<div>Loading...</div>}>
                <InlineMessage
                    type={'error'}
                    message={'Failed to load the product info'}
                />
            </Suspense>
        );
    }

    if (isLoading) {
        return (
            <ProductPageLoader />
        )
    }

    if (!productInfo && !isLoading && !hasError) {
        return <div></div>
    }

    return (
        <div className='product-page-container'>
            <GoBackLink
                to={'/'}
                text={'Home'}
            />
            <div className='product-page-info-wrapper'>
                <div className='product-page-image-container'>
                    <ProductPageLeftPanel
                        title={productInfo.title}
                        images={productInfo.images}
                        thumbnail={productInfo.thumbnail}
                        activeImage={activeImage}
                        handleImageChange={handleImageChange}
                    />
                </div>
                <div className='product-page-content-container'>
                    <div className='product-page-content-wrapper'>
                        <h1 className='product-page-content-title'>{productInfo.title}</h1>
                        <div className='product-page-sub-header-wrapper'>
                            <div className='sub-header-item'>
                                {productInfo.rating}
                                <span className='icon'><FaStar /></span>
                            </div>
                            <div className='sub-header-item'>
                                {productInfo.stock > 0 ? 'In-Stock' : 'Out-Of-Stock'}
                            </div>
                        </div>
                        <p className='product-page-content-description'>{productInfo.description}</p>
                        <div className='product-page-price-wrapper'>
                            <p className='title'>Price</p>
                            <h2 className='value'>
                                {price}
                                <span className='discount'>{productInfo.discountPercentage}%</span>
                            </h2>
                        </div>
                        <div className='product-page-price-wrapper'>
                            <p className='title'>Brand</p>
                            <h2 className='value'>
                                {productInfo.brand}
                            </h2>
                        </div>
                        <div className='product-page-tag-wrapper'>
                            <p className='title'>Tags</p>
                            <div className='tag-wrapper'>
                                {
                                    productInfo.tags.map((tag) => (
                                        <div key={tag} className='tag'>{tag}</div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className='product-page-quantity-wrapper'>
                            <div className='icon' onClick={descreaseQuantity}>
                                <FaMinus />
                            </div>
                            <input
                                type='number'
                                name='quantity'
                                value={productQuantity}
                                max={50}
                                min={1}
                                className='input'
                                onChange={handleProductQuantity}
                            />
                            <div className='icon' onClick={increaseQuantity}>
                                <FaPlus />
                            </div>
                        </div>
                        <button className='product-page-add-to-cart'>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product;
