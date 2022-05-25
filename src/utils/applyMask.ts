

const applyMask = (matrix: number[][], mask: number[][]) => {
    const cMatrix = 1;
    const newMatrix = matrix.map(i => [...i]);
    for (let r = 0; r < matrix.length; r++) {
        for (let c = 0; c < matrix[r].length; c++) {
            let acc = 0;
            for (let maskRow = 0; maskRow < mask.length; ++maskRow) {
                const matrixRow = matrix[r + maskRow - cMatrix];
                if (matrixRow === undefined) continue;
                for (let maskCol = 0; maskCol < mask.length; ++maskCol) {
                    const value = matrixRow[c + maskCol - cMatrix];
                    if (value === undefined ) continue;
                    acc += (value * mask[maskRow][maskCol]);
                };
            }
            newMatrix[r][c] = acc;
        };
    }
    return newMatrix;
}

export default applyMask;
