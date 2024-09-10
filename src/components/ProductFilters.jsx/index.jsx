import { Fragment } from 'react';
import propTypes from 'prop-types';
import CheckboxFilter from './CheckboxFilter';
import '../../styles/productfilter.css';

const ProductFilters = (props) => {

    // props
    const {
        selectedFilter,
        productFilters,
        onCheckboxChange,
    } = props;

    return (
        <>
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
        </>
    )
}

ProductFilters.propTypes = {
    selectedFilter: propTypes.object,
    productFilters: propTypes.array,
    onCheckboxChange: propTypes.func,
};

export default ProductFilters;
