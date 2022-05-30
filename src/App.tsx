import React, {useEffect, useReducer} from 'react';
import ControlPanel from "./components/ControlPanel";
import Canvas from "./components/Canvas";
import {ITreatmentConfig} from "./types";

function App() {

    const [config, updateConfig] = useReducer((prevState: ITreatmentConfig, updateState: Partial<ITreatmentConfig>) => {
        return {...prevState, ...updateState};
    }, {
        imageSize: {
            width: 0,
            height: 0
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
        baw: true,
        edges: false,
        colorCount: 2,
    })


    return (
        <div className="App">
            <ControlPanel updateConfig={updateConfig} config={config}/>
            <Canvas config={config}/>
        </div>
    );
}

export default App;
