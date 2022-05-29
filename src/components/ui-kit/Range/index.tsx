import React from "react";

type PropsType = {
    value: number,
    max: number,
    min: number,
    label: string;
}

const Range: React.FC<PropsType> = ({value, max, min, label}) => {
    return (
        <div>
            <input type="range" id="points" name="points" min={min} max={max} value={value}/>
        </div>
    )
}

export default Range;
