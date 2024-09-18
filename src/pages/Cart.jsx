import { useSelector } from 'react-redux';
import { formatCurrency } from '../utils/commonUtils';
import CartList from '../components/Cart/CartList';
import GoBackLink from '../components/GoBackLink';
import '../styles/cart.css';
import { useMemo } from 'react';

const Cart = () => {

    // selecttor
    const { userCartInfo } = useSelector((store) => store.cart);

    const totalPrice = useMemo(() => {
        return formatCurrency(userCartInfo.total, 'USD');
    }, [userCartInfo.total]);

    const discountPrice = useMemo(() => {
        const discountTotal = userCartInfo.total - userCartInfo.discountedTotal;
        return formatCurrency(discountTotal, 'USD');
    }, [userCartInfo.total, userCartInfo.discountedTotal]);

    const finalPrice = useMemo(() => {
        return formatCurrency(userCartInfo.discountedTotal, 'USD');
    }, [userCartInfo.discountedTotal])

    return (
        <main className='cart-container'>
            <div className='cart-header-nav-wrapper'>
                <GoBackLink
                    text='Home'
                    to='/'
                />
            </div>
            <div className='cart-content-wrapper'>
                <div className='cart-list-container'>
                    {
                        <CartList
                            carts={userCartInfo?.products ?? []}
                        />
                    }
                </div>
                <div className='cart-summary-container'>
                    <h2 className='cart-summary-title'>Summary</h2>
                    <div className='cart-summary-item-wrapper'>
                        <div className='title'>Total Products</div>
                        <div className='value'>{userCartInfo.totalProducts}</div>
                    </div>
                    <div className='cart-summary-item-wrapper'>
                        <div className='title'>Total Quantity</div>
                        <div className='value'>{userCartInfo.totalQuantity}</div>
                    </div>
                    <div className='cart-summary-item-wrapper'>
                        <div className='title'>Sub Total</div>
                        <div className='value'>{totalPrice}</div>
                    </div>
                    <div className='cart-summary-item-wrapper'>
                        <div className='title'>Discount</div>
                        <div className='value'>{discountPrice}</div>
                    </div>
                    <div className='cart-summary-border'></div>
                    <div className='cart-summary-item-wrapper'>
                        <div className='title'>Total</div>
                        <div className='value'>{finalPrice}</div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Cart;
