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
                    <h2 className='title'>{title}</h2>
                    <div className='cart-info-wrapper'>
                        <p className='info-title'>Price</p>
                        <p className='info-text'>
                            {formatedPrice}
                            <span className='discount'>{discountPercentage}% off</span>
                        </p>
                    </div>
                    <div className='cart-footer-wrapper'>
                        <QuantityInput
                            className='cart-page-quantity-wrapper'
                            quantityValue={1}
                        />
                        <button className='cart-delete-btn'>
                            <MdDeleteOutline className='icon' />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

CartItem.propTypes = {
    thumbnail: propTypes.string,
    title: propTypes.string,
    price: propTypes.number,
    discountPercentage: propTypes.number,
};

export default CartItem;
