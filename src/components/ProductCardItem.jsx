import { useMemo } from 'react';
import propTypes from 'prop-types';
import { FaStar } from "react-icons/fa";
import { Link } from 'react-router-dom';
import LazyImage from './LazyImage';
import { formatCurrency } from '../utils/commonUtils'

const ProductCardItem = (props) => {

    // props
    const {
        product,
    } = props;

    const price = useMemo(() => {
        return product.price ? formatCurrency(product.price, 'USD') : 0;
    }, [product.price]);

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
                    <h2 className='title'>{product.title}</h2>
                    <p className='description'>{product.description}</p>
                    <span className='category'>{product.category}</span>
                </div>
                <div className='product-card-footer'>
                    <div className='product-card-footer-price'>
                        <p className='title'>Price</p>
                        <p className='price'>
                            {price}
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

ProductCardItem.propTypes = {
    product: propTypes.object,
}

export default ProductCardItem;
