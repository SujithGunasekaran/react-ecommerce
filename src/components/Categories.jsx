import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { BiCategory } from "react-icons/bi";
import { baseUrl, categoryLoaderLength } from '../constants';
import { getArrayWithNLength } from '../utils/loaderUtils';
import { addCategory } from '../store/slice/categorySlice';
import axios from 'axios';
import CategoryItem from './CategoryItem';
import LineLoader from '../skeletonLoader/Line';
import '../styles/category.css';

const Categories = () => {

    // state
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
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
    }, []);

    return (
        <div className='category-container'>
            <div className='category-header'>
                <div className='icon-wrapper'>
                    <BiCategory className='icon' />
                </div>
                <div className='title'>Categories</div>
            </div>
            <div className='category-content'>
                {
                    isLoading &&
                    getArrayWithNLength(categoryLoaderLength).map((_, index) => (
                        <div key={index} className='category-item-loader'>
                            <LineLoader
                                width='100%'
                                height='25px'
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
                            activeItem={activeCategory === category.slug}
                            displayName={category.name}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Categories;