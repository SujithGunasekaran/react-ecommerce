import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductPageLoader from '../Loaders/ProductPageLoader';
import ProductPageLeftPanel from '../components/ProductPage/ProductPageLeftPanel';
import ProductPageRightPanel from '../components/ProductPage/ProductPageRightPanel';
import GoBackLink from '../components/GoBackLink';
import InlineMessage from '../components/InlineMessage';
import { baseUrl } from '../constants';
import '../styles/productpage.css';

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

    const decreaseQuantity = () => {
        setProductQuantity((prevState) => prevState > 1 ? prevState - 1 : prevState);
    }

    useEffect(() => {
        if (!productId) return;
        fetchProduct();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productId])


    if (!productInfo && !isLoading && !hasError) {
        return <div></div>
    }

    return (
        <div className='product-page-container'>
            <GoBackLink
                to={'/'}
                text={'Home'}
            />
            {
                isLoading && <ProductPageLoader />
            }
            {
                hasError &&
                <InlineMessage
                    type={'error'}
                    message={'Failed to load the product info'}
                />
            }
            {
                productInfo &&
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
                        <ProductPageRightPanel
                            title={productInfo.title}
                            rating={productInfo.rating}
                            stock={productInfo.stock}
                            description={productInfo.description}
                            price={productInfo.price}
                            discountPercentage={productInfo.discountPercentage}
                            brand={productInfo.brand}
                            tags={productInfo.tags}
                            quantityValue={productQuantity}
                            increaseQuantity={increaseQuantity}
                            decreaseQuantity={decreaseQuantity}
                            handleQuantityChange={handleProductQuantity}
                        />
                    </div>
                </div>
            }
        </div>
    )
}

export default Product;
