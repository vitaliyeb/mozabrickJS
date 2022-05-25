

const matrixToPicture = (matrix: number[][], baseImageData: ImageData): ImageData => {
    const rows = baseImageData.height;
    const columns = baseImageData.width;
    let acc = 0;

    for(let row = 0; row < rows; row++) {
        for(let col = 0; col < columns; col++) {
            baseImageData.data[acc] = matrix[row][col];
            baseImageData.data[acc+1] = matrix[row][col];
            baseImageData.data[acc+2] = matrix[row][col];
            acc+=4;
        }
    }


    return baseImageData;
}

export default matrixToPicture;
