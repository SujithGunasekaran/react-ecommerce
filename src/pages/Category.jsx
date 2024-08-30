import { useEffect, useState, lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { updateCategoryProduct } from '../store/slice/categorySlice';
import { baseUrl } from '../constants';
import Categories from '../components/Categories';
import ProductList from '../components/ProductList';
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
            <div className='home-container'>
                <div className='home-category-container'>
                    <Categories />
                </div>
                <div className='home-product-container'>
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
                    <ProductList
                        showSkeleton={isLoading}
                        productList={categoryProduct?.[categoryName] ?? []}
                        skeletonLoaderLength={12}
                    />
                </div>
            </div>
        </>
    )
}

export default Category;
