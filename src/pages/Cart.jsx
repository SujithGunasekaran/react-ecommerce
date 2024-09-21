import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import InlineMessage from '../components/InlineMessage';
import CartList from '../components/Cart/CartList';
import CartSummary from '../components/Cart/CartSummary';
import GoBackLink from '../components/GoBackLink';
import CartPageLoader from '../Loaders/CartPageLoader';
import { removeProductFromCart, updateProductQuantity } from '../store/slice/cartSlice';
import '../styles/cart.css';

const Cart = () => {

    // selecttor
    const { userCarts, userCartCount, isLoading, hasError } = useSelector((store) => store.cart);

    // dispatch
    const dispatch = useDispatch();

    const removeCart = (id) => {
        dispatch(removeProductFromCart(id));
    }

    const updateQuantity = (id, quantity) => {
        const product = userCarts.filter((product) => product.id === id)[0];
        const difference = quantity > product.quantity ? 'increase' : 'decrease';
        const totalQuantity = (difference === 'increase') ? product.quantity + 1 : (product.quantity > 1 ? product.quantity - 1 : product.quantity);
        const totalPrice = product.price * totalQuantity;
        const discountedTotal = Number((totalPrice - ((totalPrice * product.discountPercentage) / 100)).toFixed(2));
        const data = {
            ...product,
            quantity: totalQuantity,
            total: totalPrice,
            discountedTotal
        }
        dispatch(updateProductQuantity(data));
    }

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
                    {`(${userCartCount} ${userCartCount > 1 ? 'items' : 'item'})`}
                </span>
            </h2>
            <div className='cart-content-wrapper'>
                <div className='cart-list-container'>
                    {
                        isLoading &&
                        <CartPageLoader />
                    }
                    {
                        hasError &&
                        <InlineMessage
                            type='error'
                            message='Error while fetching the cart'
                        />
                    }
                    {
                        userCartCount > 0 &&
                        <CartList
                            carts={userCarts}
                            removeCart={removeCart}
                            updateQuantity={updateQuantity}
                        />
                    }
                    {
                        !isLoading && !hasError && userCartCount === 0 &&
                        <div className='empty-cart-wrapper'>
                            <h3 className='title'>No Item in the cart</h3>
                            <Link to={'/'}>Shop Now</Link>
                        </div>
                    }
                </div>
                <div className='cart-summary-container'>
                    <CartSummary
                        carts={userCarts}
                    />
                </div>
            </div>
        </main>
    )
}

export default Cart;
