import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    // selector
    const { userCarts } = useSelector((store) => store.cart);

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

    useEffect(() => {
        if (!productId) return;
        fetchProduct();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productId])

    const isProductInCart = useMemo(() => {
        if (userCarts.length > 0) {
            return userCarts?.some((product) => product.id === +productId);
        }
        return false;
    }, [productId, userCarts])


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
                        />
                    </div>
                    <div className='product-page-content-container'>
                        <ProductPageRightPanel
                            id={productInfo.id}
                            title={productInfo.title}
                            rating={productInfo.rating}
                            stock={productInfo.stock}
                            thumbnail={productInfo.thumbnail}
                            description={productInfo.description}
                            price={productInfo.price}
                            discountPercentage={productInfo.discountPercentage}
                            brand={productInfo.brand}
                            tags={productInfo.tags}
                            isProductInCart={isProductInCart}
                        />
                    </div>
                </div>
            }
        </div>
    )
}

export default Product;
