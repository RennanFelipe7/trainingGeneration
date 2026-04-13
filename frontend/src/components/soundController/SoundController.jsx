import soundOn from '../../images/sound-on.png';
import soundOff from '../../images/sound-off.png';
import { useState } from 'react';
import './soundController.css'

export const SoundController = ({ shouldReproduce }) => {

    const [isSoundOn, setIsSoundOn] = useState(true);

    const ChangeButtonBackground = () => {
        setIsSoundOn(!isSoundOn);
        shouldReproduce(!isSoundOn);
    }

    return(
        <button className="soundController" onClick={ChangeButtonBackground} data-cy="checkbox sound">
          <img src={isSoundOn ? soundOn : soundOff} alt="" />
        </button>
    )
}