import propTypes from 'prop-types';
import { FaPlus, FaMinus } from "react-icons/fa6";

const QuantityInput = (props) => {

    // props
    const {
        className,
        quantityValue,
        handleQuantityChange,
        descreaseQuantity,
        increaseQuantity
    } = props;

    return (
        <div className={`quantity-wrapper ${className}`}>
            <div className='icon' onClick={descreaseQuantity}>
                <FaMinus />
            </div>
            <input
                type='number'
                name='quantity'
                value={quantityValue}
                max={50}
                min={1}
                className='input'
                onChange={handleQuantityChange}
            />
            <div className='icon' onClick={increaseQuantity}>
                <FaPlus />
            </div>
        </div>
    )
}

QuantityInput.propTypes = {
    className: propTypes.string,
    quantityValue: propTypes.number,
    handleQuantityChange: propTypes.func,
    descreaseQuantity: propTypes.func,
    increaseQuantity: propTypes.func,
};

export default QuantityInput;
