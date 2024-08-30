import propTypes from 'prop-types';
import { FaStar } from "react-icons/fa";
import { Link } from 'react-router-dom';
import LazyImage from './LazyImage';

const ProductItem = (props) => {

    // props
    const {
        product,
    } = props;

    return (
        <>
            <Link to={`/product/${product.id}`} className='product-card'>
                <div className='product-card-header'>
                    <LazyImage
                        className='product-img'
                        src={product.thumbnail}
                        alt={product.title}
                    />
                </div>
                <div className='product-card-content'>
                    <p className='title'>{product.title}</p>
                    <p className='description'>{product.description}</p>
                    <span className='category'>{product.category}</span>
                </div>
                <div className='product-card-footer'>
                    <div className='product-card-footer-price'>
                        <p className='title'>Price</p>
                        <p className='price'>
                            ${product.price}
                            <span className='discount'>
                                {`${product.discountPercentage}% off`}
                            </span>
                        </p>
                    </div>
                    <p className='product-card-footer-rating'>
                        {product.rating}
                        <span className='icon'><FaStar /></span>
                    </p>
                </div>
            </Link>
        </>
    )
}

ProductItem.propTypes = {
    product: propTypes.object,
}

export default ProductItem;
