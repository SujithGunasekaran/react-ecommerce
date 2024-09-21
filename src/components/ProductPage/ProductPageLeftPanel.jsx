import { Fragment, useState } from 'react';
import LazyImage from '../LazyImage';
import propTypes from 'prop-types';

const ProductPageLeftPanel = (props) => {

    // props
    const {
        title,
        images,
    } = props;

    // state
    const [activeImage, setActiveImage] = useState(0);

    const handleImageChange = (index) => {
        setActiveImage(index);
    }

    return (
        <Fragment>
            <div className='product-page-image-list'>
                {
                    images.map((image, index) => (
                        <div
                            key={image}
                            onClick={() => handleImageChange(index)}
                            className={`product-page-image-item ${activeImage === index && 'active'}`}
                        >
                            <LazyImage
                                className='image'
                                src={image}
                                alt={`${title}-${index}`}
                            />
                        </div>
                    ))
                }
            </div>
            <div className='product-page-main-image'>
                <LazyImage
                    className='image'
                    src={images[activeImage]}
                    alt={`${title}-image`}
                />
            </div>
        </Fragment>

    )
}

ProductPageLeftPanel.propTypes = {
    title: propTypes.string,
    images: propTypes.array,
}

export default ProductPageLeftPanel;
