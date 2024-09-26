import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { BiCategory } from "react-icons/bi";
import { FaAngleUp } from "react-icons/fa";
import { baseUrl, categoryLoaderLength } from '../constants';
import { getArrayWithNLength } from '../utils/loaderUtils';
import { addCategory } from '../store/slice/categorySlice';
import axios from 'axios';
import CategoryItem from './CategoryItem';
import InlineMessage from './InlineMessage';
import SkeletonLoader from '../Loaders/SkeletonLoader';


const Categories = () => {

    // state
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [activeCategory, setActiveCategory] = useState('');

    // selected
    const { categories } = useSelector((state) => state.category);

    // dispatch
    const dispatch = useDispatch();

    // params
    const param = useParams();

    const fetchCategories = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${baseUrl}/products/categories`);
            dispatch(addCategory(response.data));
        } catch (error) {
            console.log('category API error', error);
            setHasError(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (param?.categoryName) {
            setActiveCategory(param.categoryName);
        }
    }, [param]);

    useEffect(() => {
        if (categories.length === 0) {
            fetchCategories();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <section className='category-container'>
                <div className='category-header'>
                    <div className='icon-wrapper'>
                        <BiCategory className='icon' />
                    </div>
                    <h2 className='title'>Categories</h2>
                </div>
                <div className='category-content'>
                    {
                        hasError &&
                        <InlineMessage
                            type='error'
                            message='Error while fetching the categories'
                        />
                    }
                    {
                        isLoading &&
                        getArrayWithNLength(categoryLoaderLength).map((_, index) => (
                            <div key={index} className='category-item-loader'>
                                <SkeletonLoader
                                    className='loader'
                                />
                            </div>
                        ))
                    }
                    {
                        categories.length > 0 &&
                        categories.map((category) => (
                            <CategoryItem
                                key={category.slug}
                                name={category.slug}
                                displayName={category.name}
                                isActiveItem={activeCategory === category.slug}
                            />
                        ))
                    }
                </div>
            </section>
            <section className='mobile-category-container'>
                {
                    showCategoryDropdown &&
                    <div className='mobile-category-item'>
                        {
                            categories.length > 0 &&
                            categories.map((category) => (
                                <CategoryItem
                                    key={category.slug}
                                    name={category.slug}
                                    displayName={category.name}
                                    isActiveItem={activeCategory === category.slug}
                                />
                            ))
                        }
                    </div>
                }
                <div className='mobile-category-header-wrapper'>
                    <h2 className='title'>Categories</h2>
                    <FaAngleUp className='icon' onClick={() => setShowCategoryDropdown(!showCategoryDropdown)} />
                </div>
            </section>
        </>

    )
}

export default Categories;
