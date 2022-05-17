import DECtoHEX from "./DECtoHEX";


const DECtoGrayHEX = (num: number): string => {
    return Array.from({ length: 3}).fill(num).reduce((acc, n) => acc+DECtoHEX(n as number), '#') as string;
}

export default DECtoGrayHEX;
