import { lazy, Suspense } from 'react';
import propTypes from 'prop-types';
import ProductCardLoader from '../Loaders/ProductCardLoader';
import { getArrayWithNLength } from '../utils/loaderUtils';
import '../styles/product.css';

const ProductCardItem = lazy(() => import('./ProductCardItem'));


const ProductList = (props) => {

    // props
    const { productList, showSkeleton, skeletonLoaderLength = 8 } = props;


    const SkeletonProductList = () => {
        return (
            getArrayWithNLength(skeletonLoaderLength).map((_, index) => (
                <ProductCardLoader key={index} />
            ))
        )
    }

    return (
        <div className='product-list-container'>
            <Suspense fallback={SkeletonProductList()}>
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
                SkeletonProductList()
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
