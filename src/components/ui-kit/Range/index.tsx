import React from "react";
import styles from './style.module.css';

type PropsType = {
    value: number,
    max: number,
    min: number,
    label: string;
    change: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Range: React.FC<PropsType> = ({change, value, max, min, label}) => {
    return (
        <div className={styles.wrapper}>
            <label htmlFor={label}>{label}</label>
            <input
                onChange={change}
                type="range"
                id={label}
                name="points"
                min={min}
                max={max}
                value={value}
            />
            <p>{ value }</p>
        </div>
    )
}

export default Range;
