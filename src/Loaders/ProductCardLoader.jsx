import SkeletonLoader from "./SkeletonLoader";

const ProductCardLoader = () => {
    return (
        <div className='product-card'>
            <div className='product-card-header'>
                <SkeletonLoader className={'product-img loader'} />
            </div>
            <div className='product-card-content'>
                <SkeletonLoader className={'title loader'} />
                <SkeletonLoader className={'description loader'} />
                <SkeletonLoader className={'category loader'} />
            </div>
            <div className='product-card-footer'>
                <div>
                    <SkeletonLoader className={'product-card-footer-price loader'} />
                </div>
                <div>
                    <SkeletonLoader className={'product-card-footer-rating-loader'} />
                </div>
            </div>
        </div>
    )
}

export default ProductCardLoader;