import ProductCardLoader from './ProductCardLoader';
import SkeletonLoader from './SkeletonLoader';
import { categoryLoaderLength } from '../constants';
import { getArrayWithNLength } from '../utils/loaderUtils';

const HomePageLoader = () => {
    return (
        <main className='home-container'>
            <aside className='home-category-container'>
                <section className='category-container'>
                    <div className='category-content'>
                        {
                            getArrayWithNLength(categoryLoaderLength).map((_, index) => (
                                <div key={index} className='category-item-loader'>
                                    <SkeletonLoader
                                        className='loader'
                                    />
                                </div>
                            ))
                        }
                    </div>
                </section>
            </aside>
            <section className='home-product-container'>
                {
                    <div className='product-list-container'>
                        {
                            getArrayWithNLength(12).map((_, index) => (
                                <ProductCardLoader key={index} />
                            ))
                        }
                    </div>
                }
            </section>
        </main>
    )
}

export default HomePageLoader;
