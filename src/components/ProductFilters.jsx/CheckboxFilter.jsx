import propTypes from 'prop-types';

const CheckboxFilter = (props) => {

    // props
    const {
        filterTitle,
        checkboxList
    } = props;

    return (
        <div className='product-filter-container'>
            <h2 className='product-filter-header-title'>{filterTitle}</h2>
            <div className='product-filter-content'>
                {
                    checkboxList.map((checkbox) => (
                        <div
                            key={checkbox}
                            className='product-filter-content-item'
                        >
                            <div className='product-filter-input-wrapper'>
                                <input
                                    type='checkbox'
                                    id={checkbox.name}
                                    name={checkbox.name}
                                    value={checkbox.name}
                                    className='product-filter-checkbox'
                                />
                            </div>
                            <label className='product-filter-label'>{checkbox.displayName}</label>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

CheckboxFilter.propTypes = {
    filterTitle: propTypes.string,
    checkboxList: propTypes.array,
}

export default CheckboxFilter;
