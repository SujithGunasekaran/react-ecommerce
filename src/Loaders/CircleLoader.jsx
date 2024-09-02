import propsTypes from 'prop-types';

const CircleLoader = ({ className }) => {
    return (
        <div className='circle-loader-container'>
            <div className={`circle-loader ${className}`}></div>
        </div>
    )
}

CircleLoader.propTypes = {
    className: propsTypes.string
}

export default CircleLoader;
