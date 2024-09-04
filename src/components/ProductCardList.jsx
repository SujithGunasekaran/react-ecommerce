import { lazy, Suspense } from 'react';
import propTypes from 'prop-types';
import ProductCardLoader from '../Loaders/ProductCardLoader';
import { getArrayWithNLength } from '../utils/loaderUtils';
import '../styles/product.css';

const ProductCardItem = lazy(() => import('./ProductCardItem'));

const ProductList = (props) => {

    // props
    const { productList, showSkeleton, skeletonLoaderLength = 8 } = props;

    return (
        <div className='product-list-container'>
            <Suspense fallback={<div>Loading...</div>}>
                {
                    productList.length > 0 &&
                    productList.map((product) => (
                        <ProductCardItem
                            key={product.id}
                            product={product}
                        />
                    ))
                }
            </Suspense>
            {
                showSkeleton &&
                getArrayWithNLength(skeletonLoaderLength).map((_, index) => (
                    <ProductCardLoader key={index} />
                ))
            }
        </div>
    )
}

ProductList.propTypes = {
    productList: propTypes.array,
    showSkeleton: propTypes.bool,
    skeletonLoaderLength: propTypes.number
};

export default ProductList;
