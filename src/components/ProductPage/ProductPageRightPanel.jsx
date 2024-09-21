import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import propTypes from 'prop-types';
import { FaStar } from "react-icons/fa";
import QuantityInput from '../QuantityInput';
import { addProductToCart } from '../../store/slice/cartSlice';
import { formatCurrency } from '../../utils/commonUtils';

const ProductPageRightPanel = (props) => {

    // props
    const {
        id,
        title,
        rating,
        stock,
        thumbnail,
        description,
        price,
        discountPercentage,
        brand,
        tags,
        isProductInCart,
    } = props;

    // state
    const [productQuantity, setProductQuantity] = useState(1);

    // navigate
    const navigate = useNavigate();

    // dispatch
    const dispatch = useDispatch();

    const addToCart = () => {
        const totalPrice = price * productQuantity;
        const discountedTotal = Number((totalPrice - ((totalPrice * discountPercentage) / 100)).toFixed(2));
        const productInfo = {
            id,
            title,
            thumbnail,
            price,
            quantity: productQuantity,
            total: totalPrice,
            discountPercentage,
            discountedTotal
        }
        dispatch(addProductToCart(productInfo));
    }

    const goToCart = () => {
        navigate('/cart');
    }

    const updateProductQuantity = (quantity) => {
        setProductQuantity(Number(quantity));
    }

    return (
        <div className='product-page-content-wrapper'>
            <h1 className='product-page-content-title'>{title}</h1>
            <div className='product-page-sub-header-wrapper'>
                <div className='sub-header-item'>
                    {rating}
                    <span className='icon'><FaStar /></span>
                </div>
                <div className='sub-header-item'>
                    {stock > 0 ? 'In-Stock' : 'Out-Of-Stock'}
                </div>
            </div>
            <p className='product-page-content-description'>{description}</p>
            <div className='product-page-price-wrapper'>
                <p className='title'>Price</p>
                <h2 className='value'>
                    {formatCurrency(price, 'USD')}
                    <span className='discount'>{discountPercentage}%</span>
                </h2>
            </div>
            {
                brand &&
                <div className='product-page-price-wrapper'>
                    <p className='title'>Brand</p>
                    <h2 className='value'>
                        {brand}
                    </h2>
                </div>
            }
            <div className='product-page-tag-wrapper'>
                <p className='title'>Tags</p>
                <div className='tag-wrapper'>
                    {
                        tags.map((tag) => (
                            <div key={tag} className='tag'>{tag}</div>
                        ))
                    }
                </div>
            </div>
            <QuantityInput
                quantityValue={productQuantity}
                updateProductQuantity={updateProductQuantity}
            />
            {
                isProductInCart ?
                    <button
                        onClick={goToCart}
                        className='product-page-add-to-cart'
                    >
                        Go to Cart
                    </button> :
                    <button
                        onClick={addToCart}
                        className='product-page-add-to-cart'
                    >
                        Add to Cart
                    </button>
            }
        </div>
    )
}

ProductPageRightPanel.propTypes = {
    id: propTypes.number,
    title: propTypes.string,
    rating: propTypes.number,
    thumbnail: propTypes.string,
    stock: propTypes.number,
    description: propTypes.string,
    price: propTypes.number,
    discountPercentage: propTypes.number,
    brand: propTypes.string,
    tags: propTypes.array,
    isProductInCart: propTypes.bool,
}


export default ProductPageRightPanel;
