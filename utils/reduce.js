/**
 * @template T, U
 * @param {(previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U} callbackFn
 * @param {U} [initialValue]
 * @return {U}
 */
Array.prototype.myReduce = function (callbackFn, initialValue) {

    let length = this.length;
    const hasNotInitVal = initialValue === undefined;

    if (hasNotInitVal && length === 0) {
        throw new TypeError('Reduce of empty array with no initial value');
    }

    const initialPosition = hasNotInitVal ? 1 : 0
    let accumulator = hasNotInitVal ? this[0] : initialValue;

    for (let position = initialPosition; position<length; position++){
        if(this[position] === undefined)  continue;
        accumulator = callbackFn(accumulator, this[position], position, this)
        length = this.length;
    }

    return accumulator;
};

