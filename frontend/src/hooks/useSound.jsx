import { useState, useEffect, useRef } from 'react';

export function useSound(soundFile) {
    const [runningSound, setRunningSound] = useState(false);
    const soundRef = useRef();

    useEffect(() => {
        soundRef.current = new Audio(soundFile);
    }, [soundFile]);

    useEffect(() => {
        if (runningSound) {
            soundRef.current.currentTime = 0;
            soundRef.current.play();
            setRunningSound(false);
        }
    }, [runningSound]);

    const playSound = () => setRunningSound(true);

    return { playSound };
}
