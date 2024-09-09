import { Fragment } from 'react';
import propTypes from 'prop-types';
import CheckboxFilter from './CheckboxFilter';
import '../../styles/productfilter.css';

const ProductFilters = (props) => {

    // props
    const {
        productFilters
    } = props;

    return (
        <div className='product-filter-wrapper'>
            {
                productFilters.length > 0 &&
                productFilters.map((filter) => (
                    <Fragment key={filter.key}>
                        {
                            filter.type === 'checkbox' &&
                            filter.filters.length > 0 &&
                            <CheckboxFilter
                                filterTitle={filter.displayName}
                                checkboxList={filter.filters}
                            />
                        }
                    </Fragment>
                ))
            }
        </div>
    )
}

ProductFilters.propTypes = {
    productFilters: propTypes.array,
};

export default ProductFilters;
