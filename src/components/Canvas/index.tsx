import {ITreatmentConfig} from "../../types";
import React from "react";


type CanvasProps = {
    treatmentConfig: ITreatmentConfig
}

const Canvas: React.FC<CanvasProps> = () => {

    return (
        <div>
            <canvas

            />
        </div>
    )
}

export default Canvas;
