export const trottle = (callback, delay) => {
    let last = 0;
    return () => {
        let now = new Date().getTime();
        if ((now - last) < delay) return;
        last = now;
        callback();
    }
}

export const formatCurrency = (price, currencyCode) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode,
    }).format(price);
}
