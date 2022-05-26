

const returnColor = (imageData: ImageData): ImageData => {
    for (let i = 0; i < imageData.data.length; i+=4) {
        const percent = imageData.data[i] / 100;
        imageData.data[i] = percent * 50.3;
        imageData.data[i+1] = percent * 3;
        imageData.data[i+2] = percent * 3;
    }
    return imageData;
}

export default returnColor;
