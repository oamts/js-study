/**
 * @param {Array<*|Array>} value
 * @return {Array}
 */
/*export default function flatten(value) {
    while (value.some(Array.isArray)) {
        value = [].concat(...value);
    }
    return value;
}*/

export default function flatten(value) {
    const final = [];
    let copy = [...value]

    while(copy.length){
        const [first, ...rest] = copy;
        if(!Array.isArray(first)){
            final.push(first);
            copy = rest
        }else{
            copy = [...first,...rest]
        }
    }

    return final;
}
