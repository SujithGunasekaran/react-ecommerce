import propTypes from 'prop-types';
import { FaStar } from "react-icons/fa";
import QuantityInput from '../QuantityInput';
import { formatCurrency } from '../../utils/commonUtils';

const ProductPageRightPanel = (props) => {

    // props
    const {
        title,
        rating,
        stock,
        description,
        price,
        discountPercentage,
        brand,
        tags,
        quantityValue,
        increaseQuantity,
        decreaseQuantity,
        handleQuantityChange
    } = props;

    return (
        <div className='product-page-content-wrapper'>
            <h1 className='product-page-content-title'>{title}</h1>
            <div className='product-page-sub-header-wrapper'>
                <div className='sub-header-item'>
                    {rating}
                    <span className='icon'><FaStar /></span>
                </div>
                <div className='sub-header-item'>
                    {stock > 0 ? 'In-Stock' : 'Out-Of-Stock'}
                </div>
            </div>
            <p className='product-page-content-description'>{description}</p>
            <div className='product-page-price-wrapper'>
                <p className='title'>Price</p>
                <h2 className='value'>
                    {formatCurrency(price, 'USD')}
                    <span className='discount'>{discountPercentage}%</span>
                </h2>
            </div>
            {
                brand &&
                <div className='product-page-price-wrapper'>
                    <p className='title'>Brand</p>
                    <h2 className='value'>
                        {brand}
                    </h2>
                </div>
            }
            <div className='product-page-tag-wrapper'>
                <p className='title'>Tags</p>
                <div className='tag-wrapper'>
                    {
                        tags.map((tag) => (
                            <div key={tag} className='tag'>{tag}</div>
                        ))
                    }
                </div>
            </div>
            <QuantityInput
                quantityValue={quantityValue}
                increaseQuantity={increaseQuantity}
                descreaseQuantity={decreaseQuantity}
                handleQuantityChange={handleQuantityChange}
            />
            <button className='product-page-add-to-cart'>Add to Cart</button>
        </div>
    )
}

ProductPageRightPanel.propTypes = {
    title: propTypes.string,
    rating: propTypes.number,
    stock: propTypes.number,
    description: propTypes.string,
    price: propTypes.number,
    discountPercentage: propTypes.number,
    brand: propTypes.string,
    tags: propTypes.array,
    quantityValue: propTypes.number,
    increaseQuantity: propTypes.func,
    decreaseQuantity: propTypes.func,
    handleQuantityChange: propTypes.func,
}


export default ProductPageRightPanel;
