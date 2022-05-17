

const DECtoHEX = (num: number): string => {
    return `0${num.toString(16)}`.slice(-2);
}

export default DECtoHEX;
