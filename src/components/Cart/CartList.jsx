import propTypes from 'prop-types';
import CartItem from './CartItem';

const CartList = (props) => {

    // props
    const { carts } = props;

    return (
        <>
            {
                carts.length > 0 &&
                carts.map((cart) => (
                    <CartItem
                        key={cart.id}
                        thumbnail={cart.thumbnail}
                        title={cart.title}
                        price={cart.price}
                        quantity={cart.quantity}
                        discountPercentage={cart.discountPercentage}
                    />
                ))
            }
        </>
    )
}

CartList.propTypes = {
    carts: propTypes.array
};

export default CartList;
