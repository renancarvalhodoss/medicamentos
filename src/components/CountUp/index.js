import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

const timeout = 10;

const CountUp = props => {

    const {
        from = 0,
        to = 0,
        time = 1000,
        counting = true,
        ...other
    } = props;

    const [current, SetCurrent] = useState(from);

    const timer = useRef();
    
    const Count = () => {
        let step = (to - from) / (time / timeout);
        SetCurrent(current + step);
    }
    
    useEffect(() => {
        if (!counting) return;
        if (current > to) {
            SetCurrent(to);
            return;
        } else if (current == to) return;
        
        timer.current = setTimeout(Count, timeout);
        return () => clearTimeout(timer.current);
    });

    return (
        <div>
            {parseInt(current)}
        </div>
    );
}

CountUp.propTypes = {
    /**
    * Set the number that the counter starts counting
    * @default 0
    */
    from: PropTypes.number,
    /**
     * Set the number that the counter stops counting
     * @default 0
     */
    to: PropTypes.number,
    /**
     * Counting time in milliseconds
     * @default 1000
     */
    time: PropTypes.number,
    /**
     * If true the counter starts counting up
     * @default true
     */
    counting: PropTypes.bool
}

export default CountUp;