import React, {useEffect, useReducer, useRef} from 'react';
import ControlPanel from "./components/ControlPanel";
import Canvas from "./components/Canvas";
import {ITreatmentConfig} from "./types";

function App() {
    const [config, updateConfig] = useReducer((prevState: ITreatmentConfig, updateState: Partial<ITreatmentConfig>) => {
        return {...prevState, ...updateState};
    }, {
        loaded: false,
        imageSize: {
            width: 300,
            height: 300
        },
        size: {
            value: 0,
            min: 0,
            max: 0
        },
        brightness: {
            value: 100,
            min: 0,
            max: 200
        },
        contrast: {
            value: 100,
            min: 0,
            max: 200
        },
        blur: {
            value: 0,
            min: 0,
            max: 5
        },
        baw: true,
        edges: false,
        colorCount: 2,
    })
    const imageRef = useRef<HTMLImageElement | null>(null);


    return (
        <div className="App">
            <ControlPanel imageRef={imageRef} updateConfig={updateConfig} config={config}/>
            <Canvas imageRef={imageRef} config={config}/>
        </div>
    );
}

export default App;
