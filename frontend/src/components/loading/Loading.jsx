import './loading.css'
import gear from '../../images/gear.png'
export const Loading = ({message, style}) => {
    return(
        <div className='parentDivOfAllLoading' style={style}>
            <div className='parentDivOfAllCircle'>
                <img src={gear} alt='engrenagem'/>
            </div>
            <div className='parentDivOfAllMessage'>
                <p data-cy={`loading ${message}`}>
                    {message} 
                    <span className='pointer'></span>
                    <span className='pointer'></span>
                    <span className='pointer'></span>
                </p>
            </div>
        </div>
    )
}