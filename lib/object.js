/**
 * To test if the input is a number
 *
 * @export
 * @param {*} testee
 * @returns {testee is number}
 */

/**
 * Convert a number to percentage
 * e.g.: 0.98 => 98%
 *
 * @export
 * @param {number} num
 * @param {number} [digit=0] digits to keep
 * @returns
 */

/**
 * Test if a number is within a range
 *
 * @export
 * @param {number} testee
 * @param {number} min
 * @param {number} max
 * @param {[boolean, boolean]} [inclusive=[true, true]] [left, right] side inclusive or not
 * @returns
 */

/**
 * To test if an argument is an Array
 *
 * @export
 * @param {*} testee
 * @returns {boolean}
 */

/**
 * Check if an array contains any elements.
 * null/undefined are considered empty.
 *
 * @export
 * @param {(any[] | undefined | null)} arr
 * @returns
 */

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
/**
 * Swap value of array's two postions
 *
 * @export
 * @param {any[]} arr
 * @param {*} pos1
 * @param {*} pos2
 * @returns arr
 */

/**
 * Pick a value from a deep array by its indices.
 * e.g.: pick(arr, 1, 2, 3) = arr[1][2][3]
 *
 * @export
 * @param {any[]} array
 * @param {any} indices target value indices in a deep array. e.g. the indice of value `arr[i1][i2][i3]` is [i1, i2, i3]
 * @returns {any}
 */

/**
 * Check argument is premitive or not
 *
 * @export
 * @param {*} obj
 * @returns {boolean}
 */
function isPremitive(obj) {
    return null == obj || 'object' !== typeof obj;
}
/**
 * Deep clone one object
 * @export
 * @param {*} source any
 * @returns any
 */
function recursiveCopy(source) {
    var target;
    if (isPremitive(source))
        return source;
    if (source instanceof Date) {
        target = new Date();
        target.setTime(source.getTime());
        return target;
    }
    if (source instanceof Array) {
        target = [];
        for (var i = 0, len = source.length; i < len; i++) {
            target[i] = recursiveCopy(source[i]);
        }
        return target;
    }
    if (source instanceof Object) {
        target = {};
        for (var attr in source) {
            if (source.hasOwnProperty(attr)) {
                target[attr] = recursiveCopy(source[attr]);
            }
        }
        return target;
    }
}
/**
 * Check whether A equals B
 *
 * @export
 * @param {*} obj1
 * @param {*} obj2
 * @returns
 */
function isEqual(obj1, obj2) {
    if (obj1 === obj2)
        return true;
    if (isPremitive(obj1))
        return obj1 === obj2;
    if (obj1 instanceof Date)
        return obj1.getTime() === obj2.getTime();
    if (obj1 instanceof Array) {
        if (obj1.length !== obj2.length)
            return false;
        for (var i = 0, len = obj1.length; i < len; i++) {
            if (!isEqual(obj1[i], obj2[i]))
                return false;
        }
        return true;
    }
    if (obj1 instanceof Object) {
        for (var attr in obj1) {
            if (!obj2.hasOwnProperty(attr))
                return false;
            if (!isEqual(obj1[attr], obj2[attr]))
                return false;
        }
        return true;
    }
}
/**
 * Merge Objects from left to right
 * Array and plain object properties are merged recursively.
 * Other objects and value types are overridden by assignment
 * Subsequent object overwrite property assignments of previous object.
 *
 * @export
 * @param {...any[]} argument
 * @returns
 */
function merge() {
    var argument = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        argument[_i] = arguments[_i];
    }
    return argument.reduce(function (obj1, obj2) {
        if (!isPremitive(obj1) && !isPremitive(obj2)) {
            for (var attr in obj2) {
                obj1[attr] = merge(obj1[attr], obj2[attr]);
            }
            return obj1;
        }
        if (isUndefinedOrNull(obj1) || isUndefinedOrNull(obj2)) {
            return obj1 || obj2;
        }
        obj1 = obj2;
        return obj1;
    });
}
/**
 * Check input param is undefined or null
 *
 * @param {*} param
 * @returns {boolean}
 */
function isUndefinedOrNull(param) {
    return param == null || param === undefined;
}

export { isPremitive, recursiveCopy, isEqual, merge, shallowEqual };
