import SkeletonLoader from "./SkeletonLoader";
import { getArrayWithNLength } from '../utils/loaderUtils';

const ProductFilterLoader = () => {
    return (
        <div className='product-filter-container'>
            <SkeletonLoader className={'product-filter-header-title loader'} />
            <div className='product-filter-content'>
                {
                    getArrayWithNLength(4).map((_, index) => (
                        <SkeletonLoader key={index} className='product-filter-content-item loader' />

                    ))
                }
            </div>
        </div>
    )
}

export default ProductFilterLoader;
