/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

const CategoryItem = (props) => {

    // props
    const {
        name,
        displayName,
        activeItem,
    } = props;

    return (
        <Link className={`category-item ${activeItem && 'active'}`} to={`/category/${name}`}>
            {displayName}
        </Link>
    )
}

export default CategoryItem;