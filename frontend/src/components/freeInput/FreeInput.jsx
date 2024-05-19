import PropTypes from 'prop-types';
import './freeInput.css'

export const FreeInput = ({description, type, placeholder, id}) => {
    return(
        <div className='parentDivOfAllFreeInput'>
            <label className='description' htmlFor={id}>{description}</label>
            <input type={type} placeholder={placeholder} className='input' id={id}/>
        </div>
    )
}

FreeInput.propTypes = {
    description: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    id: PropTypes.string
};
