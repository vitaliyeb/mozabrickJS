import {IRGBPixel} from "./extractPalette";

const imageToPixels = (imageData: ImageData, cell: number, palette: IRGBPixel[]): ImageData => {
    const {data, width, height} = imageData;
    const lineSize = width * 4;
    const clustersOfHorizontally = width / cell;
    const clustersOfVertically = height / cell;
    const cellArea = cell**2;

    for (let row = 0; row < clustersOfVertically; row++){
        for (let col = 0; col < clustersOfHorizontally; col++){
            const startPosition = row * (cellArea * clustersOfVertically * 4) + col * (cell * 4);
            const colorsStore = {red: 0, green: 0, blue: 0};
            for (let itr = 0; itr < cell; itr++) {
                const position = startPosition + itr * lineSize;
                for (let pxl = 0; pxl < cell; pxl++) {
                    const pxlPosition = position + pxl * 4;
                    colorsStore.red+=data[pxlPosition];
                    colorsStore.green+=data[pxlPosition + 1];
                    colorsStore.blue+= data[pxlPosition + 2];
                }
            }
            colorsStore.red/=cellArea;
            colorsStore.green/=cellArea;
            colorsStore.blue/=cellArea;

            const {idx} = palette.reduce((acc, {r,g,b}, idx) => {
                const fi = 30 * Math.pow(r - colorsStore.red, 2) + 59 * Math.pow(g - colorsStore.green, 2) + 11 * Math.pow(b - colorsStore.blue, 2);
                return fi < acc.fi ? {idx, fi} : acc;
            }, {idx: 0, fi: Number.MAX_VALUE});
            const suitable = palette[idx];

            for (let itr = 0; itr < cell; itr++) {
                const position = startPosition + itr * lineSize;
                for (let pxl = 0; pxl < cell; pxl++) {
                    const pxlPosition = position + pxl * 4;
                    data[pxlPosition] = suitable.r;
                    data[pxlPosition + 1] = suitable.g;
                    data[pxlPosition + 2] = suitable.b;
                }
            }
        }
    }

    return imageData;
}

export default imageToPixels;
