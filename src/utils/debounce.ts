

const debounce = (f: (...arg: any[]) => any, ms: number) => {
    let timerId: number | null;

    return function(...arg: any[]): void {
        if (!timerId) {
            timerId = window.setTimeout(() => {
                f(...arg);
                timerId = null;
            }, ms)
        }
    }
};

export default debounce;
