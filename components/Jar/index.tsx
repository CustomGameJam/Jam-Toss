import {useRef, useState} from "react";
import {IJar} from "components/Jar/index.types";
const Jar = ({onRelease}: IJar) => {
    const [duration, setDuration] = useState(0);
    const timerRef = useRef<number | null>(null);

    const handleMouseDown = () => {
        timerRef.current = window.setInterval(() => {
            setDuration(prevDuration => {
                if (prevDuration >= 3) {
                    return 3*2;
                }
                return (prevDuration + 1)*2;
            });
        }, 300);
    };

    const handleMouseUp = () => {
        window.clearInterval(timerRef.current!);
        onRelease(duration);
        setDuration(0);
    };

    return (
        <button id="jar" className='jar' onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
            Log Click Duration
        </button>
    );
};

export default Jar;
