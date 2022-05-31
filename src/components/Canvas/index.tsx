import {ITreatmentConfig} from "../../types";
import React, {useCallback, useEffect, useRef, useState} from "react";
import DECtoHEX from "../../utils/DECtoHEX";
import DECtoGrayHEX from "../../utils/DECtoGrayHEX";
import getLog from "../../utils/getLog";
import getMatrixFromImageData from "../../utils/getMatrixFromImageData";
import applyMask from "../../utils/applyMask";
import matrixToPicture from "../../utils/matrixToPicture";
import returnColor from "../../utils/returnColor";
import imageToPixels from "../../utils/imageToPixels";
import extractPalette from "../../utils/extractPalette";
import debounce from "../../utils/debounce";


type CanvasProps = {
    config: ITreatmentConfig;
    imageRef: React.MutableRefObject<HTMLImageElement | null>;
}

const Canvas: React.FC<CanvasProps> = ({config, imageRef}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [palette, setPalette] = useState<string[]>([]);
    const {
        imageSize: {width, height}
    } = config;
    const cell = 10;
    const mask = [
        [-1, 0, 1],
        [-5, 0, 5],
        [-1, 0, 1]
    ]

    const transform = useCallback(debounce(() => {
        const canvas = canvasRef.current as HTMLCanvasElement;
        const context2D = canvas.getContext('2d') as CanvasRenderingContext2D;
        context2D.filter = `brightness(${config.brightness.value}%) contrast(${config.contrast.value}%) blur(${config.blur.value}px)`;
        context2D.drawImage(imageRef.current as HTMLImageElement, 0, 0, width, height);

        const imageData = context2D.getImageData(0, 0, width, height);
        const data = imageData.data;
        const palette = extractPalette(imageData, config.colorCount);

        // const pixels = imageToPixels(imageData, cell, palette);
        //

        setPalette(palette.map(({r, g, b}): string => `#${DECtoHEX(r)}${DECtoHEX(g)}${DECtoHEX(b)}`))

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
    }, 100), []);

    useEffect(() => {
        if (config.loaded && imageRef.current) transform();
    }, [config]);

    return (
        <div>
            <canvas
                ref={canvasRef}
                width={width}
                height={width}
            />
            <div style={{display: 'flex'}}>
                {
                    palette.map((color, i) => (<div
                        key={i}
                        style={{
                            backgroundColor: color,
                            width: '50px',
                            height: '50px'
                        }}
                    />))
                }
            </div>
            {/*<Plot*/}
            {/*    data={data}*/}
            {/*    layout={layout}*/}
            {/*/>*/}
        </div>
    )
}

export default Canvas;
