import Proptypes from 'prop-types';
import { Link } from 'react-router-dom';

const CategoryItem = (props) => {

    // props
    const {
        name,
        displayName,
        isActiveItem,
    } = props;

    return (
        <Link className={`category-item ${isActiveItem && 'active'}`} to={`/category/${name}`}>
            {displayName}
        </Link>
    )
}

CategoryItem.propTypes = {
    name: Proptypes.string,
    displayName: Proptypes.string,
    isActiveItem: Proptypes.bool
};

export default CategoryItem;
