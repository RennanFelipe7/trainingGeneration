import PropTypes from 'prop-types';

import './informativeParagraph.css'

export const InformativeParagraph = ({message}) => {
    return(
        <div className='parentDivOfAllParagraph'>
            <p className='message'data-cy={`informativeParagraph ${message}`}>{message}</p>
        </div>
    )
}

InformativeParagraph.propTypes = {
    message: PropTypes.string.isRequired
};
