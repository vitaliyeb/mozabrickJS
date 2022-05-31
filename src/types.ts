
export interface IRange<T extends number | string> {
    value: T;
    min: T;
    max: T;
}

export interface ITreatmentConfig {
    loaded: boolean,
    imageSize: {
        width: number,
        height: number
    },
    size: IRange<number>,
    brightness: IRange<number>,
    contrast: IRange<number>,
    blur: IRange<number>,
    baw: boolean,
    edges: boolean,
    colorCount: number,
};
