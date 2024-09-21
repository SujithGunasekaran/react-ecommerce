import { useMemo } from 'react';
import propTypes from 'prop-types';
import { formatCurrency } from '../../utils/commonUtils';

const CartSummary = (props) => {

    // props
    const {
        carts
    } = props;

    const totalPrice = useMemo(() => {
        let total = carts.length === 0 ? 0 :
            carts.reduce((curr, acc) => curr + acc.total, 0);
        return formatCurrency(total, 'USD');
    }, [carts]);

    const toalQuantity = useMemo(() => {
        return carts.length === 0 ? 0 :
            carts.reduce((curr, acc) => curr + acc.quantity, 0);
    }, [carts]);

    const formatedDiscountPrice = useMemo(() => {
        let total = carts.length === 0 ? 0 :
            carts.reduce((curr, acc) => curr + (acc.total - acc.discountedTotal), 0);
        return formatCurrency(total, 'USD');
    }, [carts]);

    const formatedFinalPrice = useMemo(() => {
        let total = carts.length === 0 ? 0 :
            carts.reduce((curr, acc) => curr + acc.discountedTotal, 0);
        return formatCurrency(total, 'USD');
    }, [carts])

    return (
        <>
            <h2 className='cart-summary-title'>Summary</h2>
            <div className='cart-summary-item-wrapper'>
                <div className='title'>Total Products</div>
                <div className='value'>{carts.length}</div>
            </div>
            <div className='cart-summary-item-wrapper'>
                <div className='title'>Total Quantity</div>
                <div className='value'>{toalQuantity}</div>
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
    carts: propTypes.array,
}

export default CartSummary;
