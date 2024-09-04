import propTypes from 'prop-types';
import SkeletonLoader from "./SkeletonLoader";
import { getArrayWithNLength } from '../utils/loaderUtils';

const ProductPageLoader = (props) => {

    // props
    const {
        imageSkeletonCount = 3,
        tagsSkeletonCount = 3,
    } = props;

    return (
        <div className='product-page-info-wrapper'>
            <div className='product-page-image-container'>
                <div className='product-page-image-list'>
                    {
                        getArrayWithNLength(imageSkeletonCount).map((_, index) => (
                            <div key={index} className='product-page-image-item'>
                                <SkeletonLoader
                                    className={'image-loader'}
                                />
                            </div>
                        ))
                    }
                </div>
                <div className='product-page-main-image'>
                    <SkeletonLoader className={'image-loader'} />
                </div>
            </div>
            <div className='product-page-content-container'>
                <div className='product-page-content-wrapper'>
                    <SkeletonLoader className={'product-page-content-title'} />
                    <div className='product-page-sub-header-wrapper'>
                        <SkeletonLoader className={'sub-header-item-loader'} />
                        <SkeletonLoader className={'sub-header-item-loader'} />
                    </div>
                    <SkeletonLoader className={'product-page-content-description-loader'} />
                    <div className='product-page-price-wrapper-loader'>
                        <SkeletonLoader className={'title'} />
                        <SkeletonLoader className={'value'} />
                    </div>
                    <div className='product-page-price-wrapper-loader'>
                        <SkeletonLoader className={'title'} />
                        <SkeletonLoader className={'value'} />
                    </div>
                    <div className='product-page-tag-wrapper-loader'>
                        <SkeletonLoader className={'title'} />
                        <div className='tag-wrapper'>
                            {
                                getArrayWithNLength(tagsSkeletonCount).map((_, index) => (
                                    <SkeletonLoader key={index} className={'tag'} />
                                ))
                            }
                        </div>
                    </div>
                    <div className='product-page-quantity-wrapper-loader'>
                        <SkeletonLoader className={'quantity-loader'} />
                    </div>
                    <SkeletonLoader className={'add-to-card-loader'} />
                </div>
            </div>
        </div>
    )
}

ProductPageLoader.propTypes = {
    imageSkeletonCount: propTypes.number,
    tagsSkeletonCount: propTypes.number,
}

export default ProductPageLoader;
