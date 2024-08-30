import propTypes from 'prop-types';

const SkeletonLoader = (props) => {

    // props
    const { className } = props;

    return (
        <div
            className={`skeleton-box ${className}`}
        >
        </div>
    )
}

SkeletonLoader.propTypes = {
    className: propTypes.string,
};

export default SkeletonLoader;
