import Proptypes from 'prop-types';
import '../styles/inlinemessage.css';

const InlineMessage = (props) => {

    const {
        type,
        message
    } = props;

    return (
        <div className={`inline-message-container ${type}`}>
            {message}
        </div>
    )
}

InlineMessage.propTypes = {
    type: Proptypes.string,
    message: Proptypes.string
};

export default InlineMessage;
