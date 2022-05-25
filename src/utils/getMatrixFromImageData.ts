


const getMatrixFromImageData = (arr: number[], w: number, h: number): number[][] => {
    const matrix = [];
    for (let r = 0; r < arr.length / h; r++) {
        const line = [];
        for (let c = 0; c < w; c++) {
            line.push(arr[r * w + c]);
        }
        matrix.push(line);
    }
    return matrix;
}

export default getMatrixFromImageData;
