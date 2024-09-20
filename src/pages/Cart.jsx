import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import CartList from '../components/Cart/CartList';
import CartSummary from '../components/Cart/CartSummary';
import GoBackLink from '../components/GoBackLink';
import '../styles/cart.css';

const Cart = () => {

    // selecttor
    const { userCartInfo } = useSelector((store) => store.cart);

    const totalCartLength = useMemo(() => {
        return userCartInfo?.products?.length ?? 0;
    }, [userCartInfo.products])

    return (
        <main className='cart-container'>
            <div className='cart-header-nav-wrapper'>
                <GoBackLink
                    text='Home'
                    to='/'
                />
            </div>
            <h2 className='cart-list-title'>
                Shopping Carts
                <span className='sub-text'>
                    {`(${totalCartLength} ${totalCartLength > 1 ? 'items' : 'item'})`}
                </span>
            </h2>
            <div className='cart-content-wrapper'>
                <div className='cart-list-container'>
                    {
                        totalCartLength > 0 &&
                        <CartList
                            carts={userCartInfo?.products ?? []}
                        />
                    }
                </div>
                <div className='cart-summary-container'>
                    <CartSummary
                        total={userCartInfo.total}
                        totalProducts={userCartInfo.totalProducts}
                        totalQuantity={userCartInfo.totalQuantity}
                        discountedTotal={userCartInfo.discountedTotal}
                    />
                </div>
            </div>
        </main>
    )
}

export default Cart;
