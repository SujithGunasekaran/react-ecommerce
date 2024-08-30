export const trottle = (callback, delay) => {
    let last = 0;
    return () => {
        let now = new Date().getTime();
        if ((now - last) < delay) return;
        last = now;
        callback();
    }
}