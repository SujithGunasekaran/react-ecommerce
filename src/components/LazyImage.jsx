import { useEffect, useState, useRef } from 'react';
import propTypes from 'prop-types';
import { fallImage } from '../constants';

const LazyImage = (props) => {

    // props
    const { className, src, alt } = props;

    // state
    const [inView, setInView] = useState(false);

    // ref
    const inputRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setInView(true);
                observer.disconnect();
            }
        });
        const element = inputRef.current;

        if (element) {
            observer.observe(element);
        }

        return () => {
            observer.unobserve(element);
        }

    }, [])

    return (
        <img
            className={inView ? className : 'img-fallback'}
            src={inView ? src : fallImage}
            alt={alt}
            ref={inputRef}
            loading='lazy'
        />
    )
}

LazyImage.propTypes = {
    className: propTypes.string,
    alt: propTypes.string,
    src: propTypes.string
};

export default LazyImage;
