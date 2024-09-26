import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { updateCategoryProduct } from '../store/slice/categorySlice';
import { baseUrl } from '../constants';
import { filterProductList } from '../utils/categoryUtils.js';
import { getArrayWithNLength } from '../utils/loaderUtils.js';
import ProductFilterLoader from '../Loaders/ProductFilterLoader.jsx';
import ProductCardLoader from '../Loaders/ProductCardLoader.jsx';
import ProductFilters from '../components/ProductFilters.jsx';
import ProductCardList from '../components/ProductCardList';
import GoBackLink from '../components/GoBackLink';
import InlineMessage from '../components/InlineMessage';
import '../styles/home.css';
import '../styles/category.css';
import '../styles/product.css';


const Category = () => {

    // state
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState({});

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

    const selectFilters = (filterName, filterValue) => {
        let modifiedFilters = { ...selectedFilters };
        if (modifiedFilters[filterName]) {
            if (modifiedFilters[filterName].includes(filterValue)) {
                modifiedFilters[filterName] = modifiedFilters[filterName].filter((name) => name !== filterValue);
            } else {
                modifiedFilters[filterName].push(filterValue);
            }
        } else {
            modifiedFilters[filterName] = [filterValue];
        }
        setSelectedFilters(modifiedFilters);
    }

    const categoryProductList = useMemo(() => {
        if (!categoryProduct?.[categoryName]?.products) return [];
        let products = categoryProduct[categoryName].products;
        let filteredList = filterProductList(selectedFilters, products);
        products = Object.keys(selectedFilters).length > 0 ? filteredList : products;
        return products;
    }, [categoryProduct, selectedFilters, categoryName])

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
                    <div className='product-filter-wrapper'>
                        {
                            categoryProduct?.[categoryName]?.productFilters.length > 0 &&
                            <ProductFilters
                                selectedFilter={selectedFilters}
                                productFilters={categoryProduct[categoryName].productFilters}
                                onCheckboxChange={selectFilters}
                            />
                        }
                        <div className='product-filter-loader'>
                            {
                                isLoading &&
                                getArrayWithNLength(2).map((_, index) => (
                                    <ProductFilterLoader key={index} />
                                ))
                            }
                        </div>

                    </div>
                </section>
                <section className='home-product-container'>
                    <GoBackLink
                        to={'/'}
                        text={'Home'}
                    />
                    {
                        hasError &&
                        <InlineMessage
                            type={'error'}
                            message={'Failed to load the catgeory products'}
                        />
                    }
                    {
                        (!isLoading && !hasError) &&
                        categoryProductList.length === 0 &&
                        <div className='empty-product'>No Product Found</div>
                    }
                    {
                        categoryProductList.length > 0 &&
                        <ProductCardList
                            productList={categoryProductList}
                        />
                    }
                    {
                        isLoading &&
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
        </>
    )
}

export default Category;
