import { useMemo } from 'react';
import propTypes from 'prop-types';
import { formatCurrency } from '../../utils/commonUtils';

const CartSummary = (props) => {

    // props
    const {
        totalProducts,
        totalQuantity,
        total,
        discountedTotal,
    } = props;

    const totalPrice = useMemo(() => {
        return formatCurrency(total, 'USD');
    }, [total]);

    const formatedDiscountPrice = useMemo(() => {
        const discountTotal = total - discountedTotal;
        return formatCurrency(discountTotal, 'USD');
    }, [total, discountedTotal]);

    const formatedFinalPrice = useMemo(() => {
        return formatCurrency(discountedTotal, 'USD');
    }, [discountedTotal])

    return (
        <>
            <h2 className='cart-summary-title'>Summary</h2>
            <div className='cart-summary-item-wrapper'>
                <div className='title'>Total Products</div>
                <div className='value'>{totalProducts}</div>
            </div>
            <div className='cart-summary-item-wrapper'>
                <div className='title'>Total Quantity</div>
                <div className='value'>{totalQuantity}</div>
            </div>
            <div className='cart-summary-item-wrapper'>
                <div className='title'>Sub Total</div>
                <div className='value'>{totalPrice}</div>
            </div>
            <div className='cart-summary-item-wrapper'>
                <div className='title'>Discount</div>
                <div className='value'>{formatedDiscountPrice}</div>
            </div>
            <div className='cart-summary-border'></div>
            <div className='cart-summary-item-wrapper'>
                <div className='title'>Total</div>
                <div className='value'>{formatedFinalPrice}</div>
            </div>
        </>
    )
}

CartSummary.propTypes = {
    totalProducts: propTypes.number,
    totalQuantity: propTypes.number,
    total: propTypes.number,
    discountedTotal: propTypes.number,
}

export default CartSummary;
