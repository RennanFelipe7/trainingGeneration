import PropTypes from 'prop-types';

import './informativeParagraph.css'

export const InformativeParagraph = ({message, styleDiv}) => {
    return(
        <div style={styleDiv}>
            <p className='message'>{message}</p>
        </div>
    )
}

InformativeParagraph.propTypes = {
    message: PropTypes.string.isRequired,
    styleDiv: PropTypes.object.isRequired
};
