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
        brightness: 0,
        contrast: 1,
        baw: true,
        edges: false,
        colorCount: 4,
    })

    return (
        <div className="App">
            <ControlPanel/>
            <Canvas treatmentConfig={config}/>
        </div>
    );
}

export default App;
