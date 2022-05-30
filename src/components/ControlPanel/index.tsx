import Range from "../ui-kit/Range";
import React, {Dispatch} from "react";
import {IRange, ITreatmentConfig} from "../../types";

type propsType = {
    updateConfig: Dispatch<Partial<ITreatmentConfig>>;
    config: ITreatmentConfig;
}

const ControlPanel: React.FC<propsType> = ({updateConfig, config}) => {
    const {
        brightness,
        contrast
    } = config;

    const changeValue = (key: keyof ITreatmentConfig) => {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            return updateConfig({[key]: Object.assign(config[key], {value: Number(e.target.value)})})
        }
    }

    return (
        <div>
            <Range
                change={changeValue('brightness')}
                label="Яркость"
                {...brightness}
            />
            <Range
                change={changeValue('contrast')}
                label="Констраст"
                {...contrast}
            />
        </div>
    )
}

export default ControlPanel;
