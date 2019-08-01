"use strict";
exports.__esModule = true;
var is_1 = require("./is");
var object_1 = require("./object");
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
exports.isNullOrEmpty = isNullOrEmpty;
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
    if (!is_1.isArray(deepArray)) {
        throw new Error("Argument is not an array: " + deepArray + ". position: " + pos);
    }
    return deepArray.map(function (item, i) {
        if (is_1.isArray(item)) {
            return deepMap(item, iteratee, pos.concat([i]), index);
        }
        else {
            return iteratee(item, pos.concat([i]), index.i++);
        }
    });
}
exports.deepMap = deepMap;
/**
 * Shallow compare two arrays/objects
 *
 * @export
 * @param {(object | any[])} a
 * @param {(object | any[])} b
 * @returns {boolean}
 */
function shallowEqual(a, b) {
    if (a === b)
        return true;
    if (a == null || b == null)
        return false;
    if (a.length !== b.length)
        return false;
    for (var i in a) {
        if (a[i] !== b[i])
            return false;
    }
    return true;
}
exports.shallowEqual = shallowEqual;
/**
 * Swap value of array's two postions
 *
 * @export
 * @param {any[]} arr
 * @param {*} pos1
 * @param {*} pos2
 * @returns arr
 */
function swap(arr, pos1, pos2) {
    if (is_1.isNumber(pos1))
        pos1 = [pos1];
    if (is_1.isNumber(pos2))
        pos2 = [pos2];
    var parent1 = [];
    var parent2 = [];
    var val1 = pick.apply(void 0, [arr].concat(pos1, [parent1]));
    var val2 = pick.apply(void 0, [arr].concat(pos2, [parent2]));
    parent1[parent1.length - 1][pos1[pos1.length - 1]] = val2;
    parent2[parent2.length - 1][pos2[pos2.length - 1]] = val1;
}
exports.swap = swap;
/**
 * Pick a value from a deep array by its indices.
 * e.g.: pick(arr, 1, 2, 3) = arr[1][2][3]
 * if an array is supplied as the last parameter, it will be filled with arrays in each level
 * e.g.: [rootArray, subArray, ..., parentArray]
 * @export
 * @param {any[]} array
 * @param {any} indices target value indices in a deep array. e.g. the indice of value `arr[i1][i2][i3]` is [i1, i2, i3]
 * the last one can be an empty array to hold parents in each level
 * @returns {any}
 */
function pick(array) {
    var indices = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        indices[_i - 1] = arguments[_i];
    }
    var last = indices.pop();
    if (!is_1.isArray(last)) {
        indices.push(last);
        last = undefined;
    }
    if (indices.length === 1) {
        var i = indices[0];
        if (typeof i !== 'number') {
            throw Error("Index " + JSON.stringify(i) + " is not a number");
        }
        if (array !== undefined && array.length > i && i > -1) {
            last && last.push(array);
            return array[i];
        }
        throw Error("Out of bound");
    }
    var first = indices[0], rest = indices.slice(1);
    last && last.push(array) && rest.push(last);
    return pick.apply(void 0, [array[first]].concat(rest));
}
exports.pick = pick;
/**
 * Perform binary search on a sorted array. Element will be fed to predict function, if true, the target is
 * found and returned, otherwise onward function is called and the returned value determins the next
 * move:
 *   true  - left-ward continuance
 *   false - right-ward continuance
 *
 * null is returned if none is suitable
 *
 * @export
 * @template T
 * @param {T[]} array
 * @param {((i: T) => boolean | undefined)} predict
 * @param {(i: T) => boolean} onward
 * @returns {[T, number]| null} result and its index, null if not found
 */
function binarySearch(array, predict, onward, start, end) {
    if (start === void 0) { start = 0; }
    if (is_1.isEmpty(array))
        return null;
    end = end || array.length;
    var midIndex = ((start + end) / 2) | 0;
    var testee = array[midIndex];
    if (predict(testee)) {
        return [testee, midIndex];
    }
    if (midIndex === 0 || midIndex === array.length - 1) {
        return null;
    }
    var nextSection = onward(testee) ? [start, midIndex] : [midIndex, end];
    return binarySearch.apply(void 0, [array, predict, onward].concat(nextSection));
}
exports.binarySearch = binarySearch;
/**
 * Experiment feature...
 *
 * @export
 * @template T
 * @param {T[]} arr
 * @param {string} keyProperty
 * @param {string} linkProperty
 * @param {string} [childrenProp='__children__']
 * @returns {T[]}
 */
function unflatten(arr, keyProperty, linkProperty, childrenProp) {
    if (childrenProp === void 0) { childrenProp = '__children__'; }
    if (arr.length === 0 || arr.length === 1) {
        return arr;
    }
    var result = new Array();
    var allMap = new Map();
    var defered = new Map();
    arr.forEach(function (element) {
        var link = element[linkProperty];
        var key = element[keyProperty];
        allMap.set(key, element);
        if (!link) {
            result.push(element);
            var deferedChildren = defered.get(key);
            if (deferedChildren) {
                object_1.defaults(element, childrenProp, [])[childrenProp].push(element);
            }
        }
        else {
            var parent_1 = allMap.get(link);
            if (parent_1) {
                object_1.defaults(parent_1, childrenProp, [])[childrenProp].push(element);
            }
            else {
                var deferedList = defered.get(link) || new Array();
                deferedList.push(element);
                defered.set(link, deferedList);
            }
        }
    }) // cleanup
    ;
    [defered, allMap].forEach(function (m) { return m.clear(); });
    return result;
}
exports.unflatten = unflatten;
