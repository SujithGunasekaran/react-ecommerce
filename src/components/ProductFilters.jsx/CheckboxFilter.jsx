import propTypes from 'prop-types';


const CheckboxFilter = (props) => {

    // props
    const {
        filterKey,
        filterTitle,
        checkboxList,
        selectedFilter,
        onCheckboxChange,
    } = props;

    return (
        <>
            <div className='product-filter-container'>
                <h2 className='product-filter-header-title'>{filterTitle}</h2>
                <div className='product-filter-content'>
                    {
                        checkboxList.map((checkbox) => (
                            <div
                                key={checkbox.name}
                                className='product-filter-content-item'
                            >
                                <input
                                    type='checkbox'
                                    id={checkbox.name}
                                    name={checkbox.name}
                                    value={checkbox.name}
                                    checked={selectedFilter[filterKey]?.includes(checkbox.name)}
                                    onChange={() => onCheckboxChange(filterKey, checkbox.name)}
                                    className='product-filter-checkbox'
                                />
                                <label
                                    htmlFor={checkbox.name}
                                    className='product-filter-label'
                                >
                                    {checkbox.displayName}
                                </label>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>

    )
}

CheckboxFilter.propTypes = {
    filterKey: propTypes.string,
    filterTitle: propTypes.string,
    checkboxList: propTypes.array,
    selectedFilter: propTypes.object,
    onCheckboxChange: propTypes.func,
}

export default CheckboxFilter;
