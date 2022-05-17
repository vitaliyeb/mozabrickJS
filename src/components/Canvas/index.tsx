import {ITreatmentConfig} from "../../types";
import React, {useEffect, useRef} from "react";
import DECtoHEX from "../../utils/DECtoHEX";
import DECtoGrayHEX from "../../utils/DECtoGrayHEX";


type CanvasProps = {
    treatmentConfig: ITreatmentConfig
}

const Canvas: React.FC<CanvasProps> = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const width = 300;
    const height = 300;

    useEffect(() => {
        const canvas = canvasRef.current as HTMLCanvasElement;
        const context2D = canvas.getContext('2d') as CanvasRenderingContext2D;

        for(let x = 1; x <= width; x++) {
            for(let y = 1; y <= height; y++) {
                const bit = DECtoGrayHEX(Math.ceil([0,0,0].reduce(acc => (acc + Math.ceil(Math.random() * 256)), 0) / 3));

                // console.log(bit);
                context2D.fillStyle = bit;
                context2D.fillRect(x, y, 1, 1);

            }

        }

    }, []);

    return (
        <div>
            <canvas
                ref={canvasRef}
                width={500}
                height={500}
            />
        </div>
    )
}

export default Canvas;
