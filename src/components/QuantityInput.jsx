import propTypes from 'prop-types';
import { FaPlus, FaMinus } from "react-icons/fa6";

const QuantityInput = (props) => {

    // props
    const {
        className,
        quantityValue,
        updateProductQuantity,
    } = props;

    const descreaseQuantity = () => {
        const updatedQuantity = quantityValue > 1 ? quantityValue - 1 : quantityValue;
        updateProductQuantity(updatedQuantity);
    }

    const increaseQuantity = () => {
        updateProductQuantity(quantityValue + 1);
    }

    return (
        <div className={`quantity-wrapper ${className}`}>
            <div className='icon' onClick={descreaseQuantity}>
                <FaMinus />
            </div>
            <div className='input'>{quantityValue}</div>
            <div className='icon' onClick={increaseQuantity}>
                <FaPlus />
            </div>
        </div>
    )
}

QuantityInput.propTypes = {
    className: propTypes.string,
    quantityValue: propTypes.number,
    updateProductQuantity: propTypes.func,
};

export default QuantityInput;
