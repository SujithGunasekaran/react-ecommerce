import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FiChevronLeft } from "react-icons/fi";


const GoBackLink = (props) => {

    // props
    const { text, to } = props;

    return (
        <Link to={to} className='go-back-wrapper'>
            <FiChevronLeft className='icon' />
            <p className='text'>{text}</p>
        </Link>
    )
}

GoBackLink.propTypes = {
    text: propTypes.string,
    to: propTypes.string | propTypes.number
};

export default GoBackLink;
