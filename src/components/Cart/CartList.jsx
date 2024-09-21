import propTypes from 'prop-types';
import CartItem from './CartItem';

const CartList = (props) => {

    // props
    const { carts, removeCart, updateQuantity } = props;

    return (
        <>
            {
                carts.length > 0 &&
                carts.map((cart) => (
                    <CartItem
                        key={cart.id}
                        id={cart.id}
                        thumbnail={cart.thumbnail}
                        title={cart.title}
                        price={cart.price}
                        quantity={cart.quantity}
                        discountPercentage={cart.discountPercentage}
                        removeCart={removeCart}
                        updateQuantity={updateQuantity}
                    />
                ))
            }
        </>
    )
}

CartList.propTypes = {
    carts: propTypes.array,
    removeCart: propTypes.func,
    updateQuantity: propTypes.func,
};

export default CartList;
