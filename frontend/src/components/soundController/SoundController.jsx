import soundOn from '../../images/sound-on.png';
import soundOff from '../../images/sound-off.png';
import { useState, useEffect } from 'react';
import './soundController.css'

export const SoundController = ({ shouldReproduce, referenceInLocalStorage }) => {

    const [isSoundOn, setIsSoundOn] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);

    const ChangeButtonBackground = () => {
        setIsSoundOn(!isSoundOn);
        shouldReproduce(!isSoundOn);
    }

    useEffect(() => {
        const stored = localStorage.getItem(referenceInLocalStorage);
        if (stored !== null) {
            setIsSoundOn(stored === 'true');
        }
        setIsLoaded(true);
    }, []);

    return(
        <button className="soundController" onClick={ChangeButtonBackground} data-cy="checkbox sound">
          <img src={isSoundOn ? soundOn : soundOff} alt="" />
        </button>
    )
}