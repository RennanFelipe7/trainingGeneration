import PropTypes from 'prop-types';
import './form.css'
export const Form = ({action, inputs, value}) => {
    return(
        <div className='parentDivOfAllForm'>
            <form action={action} className='styleForm' method='POST'>
                <div className='styleContainerInputs'>
                    {inputs.map((inputElement, index) => inputElement)}
                </div>
                <div className='submitContainer'>
                    <input type="submit" value={value}/>
                </div>
            </form>
        </div>
    )
}

Form.propTypes = {
    action: PropTypes.string.isRequired,
    inputs: PropTypes.array.isRequired,
    value: PropTypes.string.isRequired
};