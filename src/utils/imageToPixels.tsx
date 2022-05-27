
const imageToPixels = (imageData: ImageData, cell: number): ImageData => {
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
            for (let itr = 0; itr < cell; itr++) {
                const position = startPosition + itr * lineSize;
                for (let pxl = 0; pxl < cell; pxl++) {
                    const pxlPosition = position + pxl * 4;
                    data[pxlPosition] = colorsStore.red;
                    data[pxlPosition + 1] = colorsStore.green;
                    data[pxlPosition + 2] = colorsStore.blue;
                }
            }
        }
    }

    return imageData;
}

export default imageToPixels;
