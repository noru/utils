/**
 * To test if an argument is an Array
 *
 * @export
 * @param {*} testee
 * @returns {boolean}
 */
function isArray(testee) {
    if (Array.isArray) {
        return Array.isArray(testee);
    }
    return Object.prototype.toString.call(testee) === '[object Array]';
}
/**
 * Check if an array contains any elements.
 * null/undefined are considered empty.
 *
 * @export
 * @param {(any[] | undefined | null)} arr
 * @returns
 */
function isNullOrEmpty(arr) {
    return arr === null || arr === undefined || arr.length === 0;
}
/**
 * Like flatMap, this function walks through the nested(multi-demension) array.
 * This function keep the original demesions.
 * e.g.: deepMap([1, [2, 3]], x => x + 1) => [2, [3, 4]]
 *
 * @export
 * @param {any[]} deepArray
 * @param {(item: any, cord: number[], index: number) => any} iteratee
 * @returns
 */
function deepMap(deepArray, iteratee, pos, index) {
    if (pos === void 0) { pos = []; }
    if (index === void 0) { index = { i: 0 }; }
    if (!isArray(deepArray)) {
        throw new Error("Argument is not an array: " + deepArray + ". position: " + pos);
    }
    return deepArray.map(function (item, i) {
        if (isArray(item)) {
            return deepMap(item, iteratee, pos.concat([i]), index);
        }
        else {
            return iteratee(item, pos.concat([i]), index.i++);
        }
    });
}
/**
 * Shallow compare two arrays
 *
 * @export
 * @param {any[]} a
 * @param {any[]} b
 * @returns {boolean}
 */
function shallowEqual(a, b) {
    if (a === b)
        return true;
    if (a == null || b == null)
        return false;
    if (a.length !== b.length)
        return false;
    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i])
            return false;
    }
    return true;
}

export { isArray, isNullOrEmpty, deepMap, shallowEqual };
