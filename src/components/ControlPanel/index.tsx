import Range from "../ui-kit/Range";
import React, {Dispatch, useEffect} from "react";
import {ITreatmentConfig} from "../../types";

type propsType = {
    updateConfig: Dispatch<Partial<ITreatmentConfig>>;
    config: ITreatmentConfig;
    imageRef:  React.MutableRefObject<HTMLImageElement | null>;
}

const ControlPanel: React.FC<propsType> = ({updateConfig, config, imageRef}) => {
    const {
        brightness,
        contrast,
        blur,
        imageSize
    } = config;

    useEffect(() => {
        const image = new Image(imageSize.width, imageSize.height);
        image.src = '/gachi.jpeg';
        image.onload = () => {
            imageRef.current = image;
            updateConfig({loaded: true});
        };
    }, []);


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
            <Range
                change={changeValue('blur')}
                label="Размытие"
                {...blur}
            />
        </div>
    )
}

export default ControlPanel;
