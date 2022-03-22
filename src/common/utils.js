export function debounce(func, delay) {
    let timer = null;
    return function (...args) {
        //这个args以备函数有参数
        if (timer) clearTimeout(timer);

        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}