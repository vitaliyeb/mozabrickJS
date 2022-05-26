import {ITreatmentConfig} from "../../types";
import React, {useEffect, useRef} from "react";
import Plot from 'react-plotly.js';
// import {Plot}
import DECtoHEX from "../../utils/DECtoHEX";
import DECtoGrayHEX from "../../utils/DECtoGrayHEX";
import getLog from "../../utils/getLog";
import getMatrixFromImageData from "../../utils/getMatrixFromImageData";
import applyMask from "../../utils/applyMask";
import matrixToPicture from "../../utils/matrixToPicture";
import returnColor from "../../utils/returnColor";
import * as Plotly from "plotly.js";


type CanvasProps = {
    treatmentConfig: ITreatmentConfig
}

const Canvas: React.FC<CanvasProps> = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const canvas2Ref = useRef<HTMLCanvasElement>(null);
    const canvas3Ref = useRef<HTMLCanvasElement>(null);
    const width = 300;
    const height = 300;
    const cell = 10;
    const mask = [
        [-1, 0, 1],
        [-5, 0, 5],
        [-1, 0, 1]
    ]

    useEffect(() => {
        const canvas = canvasRef.current as HTMLCanvasElement;
        const context2D = canvas.getContext('2d') as CanvasRenderingContext2D;
        const canvas2 = canvas2Ref.current as HTMLCanvasElement;
        const context22D = canvas2.getContext('2d') as CanvasRenderingContext2D;
        const canvas3 = canvas2Ref.current as HTMLCanvasElement;
        const context32D = canvas3.getContext('2d') as CanvasRenderingContext2D;
        const image = new Image(width, height);
        const grayArray: any = [];
        image.src = '/gachi.jpeg';

        image.onload = () => {
            context2D.drawImage(image, 0, 0, width, height);
            context22D.drawImage(image, 0, 0, width, height);
            const imageData = context2D.getImageData(0, 0, width, height);
            const data = imageData.data;
            const lineSize = width * 4;
            const clustersOfHorizontally = width / cell;
            const clustersOfVertically = height / cell;
            const cellArea = cell**2;

            for (let row = 0; row < clustersOfVertically; row++){
                for (let col = 0; col < clustersOfHorizontally; col++){
                    const startPosition = row * (cellArea * clustersOfVertically * 4) + col * (cell * 4);
                    const colorsStore = {red: 0, green: 0, blue: 0};
                    for (let itr = 0; itr < cell; itr++) {
                        const position = startPosition + itr * lineSize;
                        for (let pxl = 0; pxl < cell; pxl++) {
                            const pxlPosition = position + pxl * 4;
                            colorsStore.red+=data[pxlPosition];
                            colorsStore.green+=data[pxlPosition + 1];
                            colorsStore.blue+= data[pxlPosition + 2];
                        }
                    }
                    colorsStore.red/=cellArea;
                    colorsStore.green/=cellArea;
                    colorsStore.blue/=cellArea;
                    for (let itr = 0; itr < cell; itr++) {
                        const position = startPosition + itr * lineSize;
                        for (let pxl = 0; pxl < cell; pxl++) {
                            const pxlPosition = position + pxl * 4;
                            data[pxlPosition] = colorsStore.red;
                            data[pxlPosition + 1] = colorsStore.green;
                            data[pxlPosition + 2] = colorsStore.blue;
                        }
                    }
                }
            }
            // console.log(data);

            // for (var i = 0; i < data.length; i += 4) {
            //     var avg = (data[i] * 0.3 + data[i + 1] * 0.59 + data[i + 2] * 0.11);
            //     data[i] = avg; // red
            //     data[i + 1] = avg; // green
            //     data[i + 2] = avg; // blue
            //     grayArray.push(avg);
            // }
            // const matrix = getMatrixFromImageData(grayArray, width, height);
            // const img = matrixToPicture(applyMask(matrix, mask), imageData);
            // const colorsImg = returnColor(imageData);

            context2D.putImageData(imageData, 0, 0);
        }
    }, []);


        let data = [] as Plotly.Data[];
        let layout = {
            margin: {
                l: 0,
                r: 0,
                b: 0,
                t: 0
            }
        };


        return (
            <div>
                <canvas
                    ref={canvasRef}
                    width={width}
                    height={width}
                />
                <canvas
                    ref={canvas2Ref}
                    width={width}
                    height={width}
                />
                <canvas
                    ref={canvas3Ref}
                    width={width}
                    height={width}
                />
                {/*<Plot*/}
                {/*    data={data}*/}
                {/*    layout={layout}*/}
                {/*/>*/}
            </div>
        )
    }

    export default Canvas;
