/**
 * @param func
 * @param {number} wait
 * @return {Function}
 */
export default function throttle(func, wait=0) {
    if (wait === 0) {
        return func;
    }
    let shouldThrottle = false;
    return function (...args){
        if(!shouldThrottle) {
            shouldThrottle = true;
            setTimeout(()=>{
                shouldThrottle = false;
            },wait)
            return func.apply(this, args)
        }
    }
}
