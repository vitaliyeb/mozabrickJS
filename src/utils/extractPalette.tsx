export interface IRGBPixel {
    r: number;
    g: number;
    b: number;
}

const extractPalette = ({data}: ImageData, colorsCount: number): IRGBPixel[] => {
    const colors: IRGBPixel[] = [];
    for (let i = 0; i < data.length; i += 4) {
        colors.push({
            r: data[i],
            g: data[i + 1],
            b: data[i + 2],
        })
    }

    const findBiggestColorRange = (colors: IRGBPixel[]) => {
        let rMin = Number.MAX_VALUE;
        let gMin = Number.MAX_VALUE;
        let bMin = Number.MAX_VALUE;

        let rMax = Number.MIN_VALUE;
        let gMax = Number.MIN_VALUE;
        let bMax = Number.MIN_VALUE;

        colors.forEach((pixel) => {
            rMin = Math.min(rMin, pixel.r);
            gMin = Math.min(gMin, pixel.g);
            bMin = Math.min(bMin, pixel.b);

            rMax = Math.max(rMax, pixel.r);
            gMax = Math.max(gMax, pixel.g);
            bMax = Math.max(bMax, pixel.b);
        });

        const rRange = rMax - rMin;
        const gRange = gMax - gMin;
        const bRange = bMax - bMin;

        const biggestRange = Math.max(rRange, gRange, bRange);
        if (biggestRange === rRange) {
            return "r";
        } else if (biggestRange === gRange) {
            return "g";
        } else {
            return "b";
        }
    };

    const quantization = (colors: IRGBPixel[], depth: number): IRGBPixel[] => {
        if (depth === colorsCount || colors.length === 0) {
            const color = colors.reduce(
                (prev, curr) => {
                    prev.r += curr.r;
                    prev.g += curr.g;
                    prev.b += curr.b;

                    return prev;
                },
                {
                    r: 0,
                    g: 0,
                    b: 0,
                }
            );

            color.r = Math.round(color.r / colors.length);
            color.g = Math.round(color.g / colors.length);
            color.b = Math.round(color.b / colors.length);

            return [color];
        }

        const componentToSortBy = findBiggestColorRange(colors);
        colors.sort((p1, p2) => {
            return p1[componentToSortBy] - p2[componentToSortBy];
        });

        const mid = colors.length / 2;
        return [
            ...quantization(colors.slice(0, mid), depth + 1),
            ...quantization(colors.slice(mid + 1), depth + 1),
        ];
    };
    return  quantization(colors, 0);
}

export default extractPalette;
