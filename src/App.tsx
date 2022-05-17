import React, {useEffect, useReducer} from 'react';
import ControlPanel from "./components/ControlPanel";
import Canvas from "./components/Canvas";
import {ITreatmentConfig} from "./types";

function App() {

    const [config, updateConfig] = useReducer((prevState: ITreatmentConfig, updateState: Partial<ITreatmentConfig>) => {
        return {...prevState, ...updateState};
    }, {
        size: 100,
        brightness: 0,
        contrast: 1,
        baw: true,
        edges: false,
        colorCount: false,
    })

  return (
    <div className="App">
      <ControlPanel />
      <Canvas treatmentConfig={config}/>
    </div>
  );
}

export default App;
