import { Fragment, useState } from 'react';
import propTypes from 'prop-types';
import { FaAngleUp } from "react-icons/fa";
import CheckboxFilter from './CheckboxFilter';
import '../../styles/productfilter.css';

const ProductFilters = (props) => {

    // props
    const {
        selectedFilter,
        productFilters,
        onCheckboxChange,
    } = props;

    // state
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);

    return (
        <>
            <div className='product-filter-parent'>
                {
                    productFilters.length > 0 &&
                    productFilters.map((filter) => (
                        <Fragment key={filter.name}>
                            {
                                filter.type === 'checkbox' &&
                                filter.filters.length > 0 &&
                                <CheckboxFilter
                                    selectedFilter={selectedFilter}
                                    filterKey={filter.name}
                                    filterTitle={filter.displayName}
                                    checkboxList={filter.filters}
                                    onCheckboxChange={onCheckboxChange}
                                />
                            }
                        </Fragment>
                    ))
                }
            </div>
            <div className='mobile-product-filter-container'>
                {
                    showFilterDropdown &&
                    <div className='mobile-product-filter-item'>
                        {
                            productFilters.length > 0 &&
                            productFilters.map((filter) => (
                                <Fragment key={filter.name}>
                                    {
                                        filter.type === 'checkbox' &&
                                        filter.filters.length > 0 &&
                                        <CheckboxFilter
                                            selectedFilter={selectedFilter}
                                            filterKey={filter.name}
                                            filterTitle={filter.displayName}
                                            checkboxList={filter.filters}
                                            onCheckboxChange={onCheckboxChange}
                                        />
                                    }
                                </Fragment>
                            ))
                        }
                    </div>
                }
                <div className='mobile-product-filter-header-wrapper'>
                    <h2 className='title'>Filters</h2>
                    <FaAngleUp className='icon' onClick={() => setShowFilterDropdown(!showFilterDropdown)} />
                </div>
            </div>
        </>
    )
}

ProductFilters.propTypes = {
    selectedFilter: propTypes.object,
    productFilters: propTypes.array,
    onCheckboxChange: propTypes.func,
};

export default ProductFilters;
