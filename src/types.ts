
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
    brightness: number,
    contrast: number,
    baw: boolean,
    edges: boolean,
    colorCount: number,
};
