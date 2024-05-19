import './head.css'
import TrainingGenerationLogo from '../../images/TrainingGenerationLogo.png'

export const Head = () => {
    return(
        <div className="head">
            <img src={TrainingGenerationLogo} alt="" className="logoImage" />
        </div>
    )
}
