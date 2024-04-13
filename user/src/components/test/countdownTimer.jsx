import { useState, useEffect } from 'react';

const CountdownTimer = ({ duration, stop, timeout, now }) => {
    const [timeRemaining, setTimeRemaining] = useState(duration);

    useEffect(() => {
        const timer = setInterval(() => {
            timeRemaining > 0 && setTimeRemaining((prevTime) => prevTime - 1);
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    const formatTime = (seconds) => {
        if (!stop && seconds > 0) {
            now(seconds);
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
        } else {
            timeout(true);
            return '00:00';
        }
    };

    return (
        <div className='text-white text-center'>
            <h1>Thời gian còn lại:</h1>
            <p>{formatTime(timeRemaining)}</p>
        </div>
    );
};

export default CountdownTimer;