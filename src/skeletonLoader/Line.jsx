/* eslint-disable react/prop-types */

const Loader = (props) => {

    // props
    const { width = '100%', height = '20px' } = props;

    return (
        <div
            className='skeleton-box'
            style={{ width, height }}
        >
        </div>
    )
}

export default Loader;