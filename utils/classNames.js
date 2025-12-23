/**
 * @param {...(any|Object|Array<any|Object|Array>)} args
 * @return {string}
 */
export default function classNames(...args) {
    const finalArray = []
    args.forEach(arg => {
        if(!arg) { }
        else if(Array.isArray(arg)) {finalArray.push(classNames(...arg))}
        else if(typeof arg === "string" || typeof arg === "number")  finalArray.push(arg)
        else if(typeof arg === "object"){
           (Object.keys(arg).filter(element => arg[element]))
               .forEach(element => finalArray.push(element))
        }
    })
    return finalArray.join(' ')
}
