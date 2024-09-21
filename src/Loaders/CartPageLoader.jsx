import SkeletonLoader from './SkeletonLoader';
import { getArrayWithNLength } from '../utils/loaderUtils';

const CartPageLoader = () => {
    return (
        <>
            {
                getArrayWithNLength(5).map((_, index) => (
                    <div className='cart-item-wrapper' key={index}>
                        <div className='cart-item-image-wrapper loader'>
                            <SkeletonLoader
                                className='image loader'
                            />
                        </div>
                        <div className='cart-item-content-wrapper'>
                            <div className='cart-item-product-content-info'>
                                <SkeletonLoader className='title loader' />
                                <div className='cart-info-wrapper'>
                                    <SkeletonLoader className='info-title loader' />
                                    <SkeletonLoader className='info-text loader' />
                                </div>
                                <SkeletonLoader className='cart-delete-btn loader' />
                            </div>
                            <div className='cart-right-panel-wrapper'>
                                <SkeletonLoader className='cart-page-quantity-wrapper loader' />
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default CartPageLoader;
