import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { MdDeleteOutline } from "react-icons/md";
import QuantityInput from '../QuantityInput';
import { formatCurrency } from '../../utils/commonUtils';

const CartItem = (props) => {

    // props
    const {
        id,
        thumbnail,
        title,
        price,
        quantity,
        discountPercentage,
        removeCart,
        updateQuantity,
    } = props;

    const formatedPrice = useMemo(() => {
        return formatCurrency(price, 'USD');
    }, [price]);

    const updateProductQuantity = (quantity) => {
        updateQuantity(id, quantity);
    }

    return (
        <>
            <div className='cart-item-wrapper'>
                <div className='cart-item-image-wrapper'>
                    <img
                        src={thumbnail}
                        alt={title}
                        className='image'
                    />
                </div>
                <div className='cart-item-content-wrapper'>
                    <div className='cart-item-product-content-info'>
                        <h3 className='title'>
                            <Link to={`/product/${id}`}>{title}</Link>
                        </h3>
                        <div className='cart-info-wrapper'>
                            <p className='info-title'>Price</p>
                            <p className='info-text'>
                                {formatedPrice}
                                <span className='discount'>{discountPercentage}% off</span>
                            </p>
                        </div>
                        <div className='cart-delete-btn' onClick={() => removeCart(id)}>
                            <MdDeleteOutline className='icon' />
                            Delete
                        </div>
                    </div>
                    <div className='cart-right-panel-wrapper'>
                        <QuantityInput
                            className='cart-page-quantity-wrapper'
                            quantityValue={quantity}
                            updateProductQuantity={updateProductQuantity}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

CartItem.propTypes = {
    id: propTypes.number,
    thumbnail: propTypes.string,
    title: propTypes.string,
    quantity: propTypes.number,
    price: propTypes.number,
    discountPercentage: propTypes.number,
    removeCart: propTypes.func,
    updateQuantity: propTypes.func,
};

export default CartItem;
