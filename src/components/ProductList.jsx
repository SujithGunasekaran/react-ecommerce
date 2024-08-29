import { lazy, Suspense } from 'react';
import propTypes from 'prop-types';
import ProductCardLoader from '../skeletonLoader/ProductCardLoader';
import { getArrayWithNLength } from '../utils/loaderUtils';
import '../styles/product.css';

const ProductItem = lazy(() => import('./ProductItem'));

const ProductList = (props) => {

    // props
    const { productList, showSkeleton } = props;

    return (
        <div className='product-container'>
            <Suspense fallback={<div>Loading...</div>}>
                {
                    productList.length > 0 &&
                    productList.map((product) => (
                        <ProductItem
                            key={product.id}
                            product={product}
                        />
                    ))
                }
            </Suspense>
            {
                showSkeleton &&
                getArrayWithNLength(8).map((_, index) => (
                    <ProductCardLoader key={index} />
                ))
            }
        </div>
    )
}

ProductList.propTypes = {
    productList: propTypes.array,
    showSkeleton: propTypes.bool
};

export default ProductList;