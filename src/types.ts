
export interface IRange<T extends number | string> {
    value: T;
    min: T;
    max: T;
}

export interface ITreatmentConfig {
    imageSize: {
        width: number,
        height: number
    },
    size: IRange<number>,
    brightness: IRange<number>,
    contrast: IRange<number>,
    baw: boolean,
    edges: boolean,
    colorCount: number,
};
