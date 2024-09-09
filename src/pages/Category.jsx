import { useEffect, useState, lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { updateCategoryProduct } from '../store/slice/categorySlice';
import { baseUrl } from '../constants';
import ProductFilters from '../components/ProductFilters.jsx';
import Categories from '../components/Categories';
import ProductCardList from '../components/ProductCardList';
import GoBackLink from '../components/GoBackLink';
import '../styles/home.css';

const InlineMessage = lazy(() => import('../components/InlineMessage'));

const Category = () => {

    // state
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    // params
    const { categoryName = null } = useParams();

    // dispatch
    const dispatch = useDispatch();

    // selector
    const { categoryProduct } = useSelector((state) => state.category);

    const fetchCategoryProducts = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${baseUrl}/products/category/${categoryName}`);
            if (response.data) {
                const { products } = response.data;
                dispatch(updateCategoryProduct({ selectedCategory: categoryName, products }));
            }
        } catch (error) {
            console.log('category product error', error);
            setHasError(true);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (!categoryName) return;
        if (!categoryProduct[categoryName]) {
            fetchCategoryProducts();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoryName])

    return (
        <>
            <main className='home-container'>
                <section className='home-category-container'>
                    <ProductFilters
                        productFilters={categoryProduct?.[categoryName]?.productFilters ?? []}
                    />
                    <Categories />
                </section>
                <section className='home-product-container'>
                    <GoBackLink
                        to={'/'}
                        text={'Home'}
                    />
                    {
                        hasError &&
                        <Suspense fallback={<div>Loading...</div>}>
                            <InlineMessage
                                type={'error'}
                                message={'Failed to load the catgeory products'}
                            />
                        </Suspense>
                    }
                    <ProductCardList
                        showSkeleton={isLoading}
                        productList={categoryProduct?.[categoryName]?.products ?? []}
                        skeletonLoaderLength={12}
                    />
                </section>
            </main>
        </>
    )
}

export default Category;
