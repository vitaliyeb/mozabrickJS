import {ITreatmentConfig} from "../../types";
import React, {useEffect, useRef} from "react";
import DECtoHEX from "../../utils/DECtoHEX";
import DECtoGrayHEX from "../../utils/DECtoGrayHEX";
import getLog from "../../utils/getLog";
import getMatrixFromImageData from "../../utils/getMatrixFromImageData";
import applyMask from "../../utils/applyMask";
import matrixToPicture from "../../utils/matrixToPicture";


type CanvasProps = {
    treatmentConfig: ITreatmentConfig
}

const Canvas: React.FC<CanvasProps> = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const width = 300;
    const height = 300;
    const mask = [
        [0.11,0.11,0.11],
        [0.11,0.11,0.11],
        [0.11,0.11,0.11]
    ]


    useEffect(() => {
        const canvas = canvasRef.current as HTMLCanvasElement;
        const context2D = canvas.getContext('2d') as CanvasRenderingContext2D;
        const image = new Image(width, height);
        const grayArray: any = [];
        image.src = '/gachi.jpeg';

        image.onload = () => {
            context2D.drawImage(image, 0, 0, width, height);
            const imageData = context2D.getImageData(0, 0, width, height);
            const data = imageData.data;
            for (var i = 0; i < data.length; i += 4) {
                var avg = (data[i] * 0.3 + data[i + 1] * 0.59 + data[i+2]*0.11);
                data[i]     = avg; // red
                data[i + 1] = avg; // green
                data[i + 2] = avg; // blue
                grayArray.push(avg);
            }
            const matrix = getMatrixFromImageData(grayArray, width, height);
            const img = matrixToPicture(applyMask(matrix, mask), imageData);

            context2D.putImageData(img, 0, 0);
        }

        // for(let x = 1; x <= width; x++) {
        //     for(let y = 1; y <= height; y++) {
        //         const bit = DECtoGrayHEX(Math.ceil([0,0,0].reduce(acc => (acc + Math.ceil(Math.random() * 256)), 0) / 3));
        //
        //         // console.log(bit);
        //         context2D.fillStyle = bit;
        //         context2D.fillRect(x, y, 1, 1);
        //
        //     }
        //
        // }

    }, []);

    return (
        <div>
            <canvas
                ref={canvasRef}
                width={width}
                height={width}
            />
        </div>
    )
}

export default Canvas;
