function debounce(fn: any, interval = 300) {
    let timer: any = null
    return function () {
        let args = arguments;
        let ctx: any = this;
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(function () {
            fn.apply(ctx, args)
        }, interval);
    }
}



function throttle(fn: any, interval = 600) {
    let last: number = 0;
    return function () {
        let ctx = this;
        let args = arguments;
        let now: number = new Date().getTime();
        if (last && now - last < interval) {
            return
        } else {
            last = now
            fn.apply(ctx, args)
        }
    }
}

export default {
    debounce,//防抖
    throttle //节流
}