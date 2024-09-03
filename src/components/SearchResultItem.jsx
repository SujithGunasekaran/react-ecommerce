import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LazyImage from './LazyImage';

const SearchResultItem = (props) => {

    // props
    const {
        index,
        productId,
        title,
        thumbnail,
        isActive
    } = props;

    return (
        <Link
            to={`/product/${productId}`}
            className={`search-dropdown-item ${index > 0 && 'border'} ${isActive && 'active'}`}
        >
            <LazyImage
                className='thumbnail'
                src={thumbnail}
                alt={title}
            />
            <p className='title'>{title}</p>
        </Link>
    )
}

SearchResultItem.propTypes = {
    index: propTypes.number,
    productId: propTypes.number,
    title: propTypes.string,
    thumbnail: propTypes.string,
    isActive: propTypes.bool,
}

export default SearchResultItem;
