import { useMemo } from 'react';
import propTypes from 'prop-types';
import { MdDeleteOutline } from "react-icons/md";
import QuantityInput from '../QuantityInput';
import { formatCurrency } from '../../utils/commonUtils';

const CartItem = (props) => {

    // props
    const {
        thumbnail,
        title,
        price,
        quantity,
        discountPercentage
    } = props;

    const formatedPrice = useMemo(() => {
        return formatCurrency(price, 'USD');
    }, [price]);

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
                        <h3 className='title'>{title}</h3>
                        <div className='cart-info-wrapper'>
                            <p className='info-title'>Price</p>
                            <p className='info-text'>
                                {formatedPrice}
                                <span className='discount'>{discountPercentage}% off</span>
                            </p>
                        </div>
                        <div className='cart-delete-btn'>
                            <MdDeleteOutline className='icon' />
                            Delete
                        </div>
                    </div>
                    <div className='cart-right-panel-wrapper'>
                        <QuantityInput
                            className='cart-page-quantity-wrapper'
                            quantityValue={quantity}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

CartItem.propTypes = {
    thumbnail: propTypes.string,
    title: propTypes.string,
    quantity: propTypes.number,
    price: propTypes.number,
    discountPercentage: propTypes.number,
};

export default CartItem;
