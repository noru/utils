/**
 * To test if the input is a number
 *
 * @export
 * @param {*} testee
 * @returns {testee is number}
 */
function isNumber(testee) {
    return typeof testee === 'number';
}
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
 * Check argument is premitive or not
 *
 * @export
 * @param {*} obj
 * @returns {boolean}
 */

/**
 * Deep clone one object
 * @export
 * @param {*} source any
 * @returns any
 */

/**
 * Check whether A equals B
 *
 * @export
 * @param {*} obj1
 * @param {*} obj2
 * @returns
 */

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

/**
 *  Check input param is "Empty": undefined or null or {}, []
 *
 * @export
 * @param {any} obj
 * @returns {boolean}
 */

/**
 * Like lodash.flattenDeep, except it flattens an array property of an object. e.g.:
 * {
 *   id: 1,
 *   children: [
 *     {
 *       id: 2,
 *       children: [
 *         {
 *           id: 3
 *         }
 *       ]
 *     }
 *   ]
 * }
 * become:
 * [
 *   { id: 1, children: [...] },
 *   { id: 2, children: [...] },
 *   { id: 3 },
 * ]
 *
 * @export
 * @template T
 * @param {(T | T[])} obj target to be flattened
 * @param {(string | _Function)} propNameOrGetter name or getter of the target array
 * @returns {T[]}
 */

/**
 * A simple version of lodash.defaults.
 * e.g.:
 * defaults({}, 'couldBeUndefined', { a: 1 }).countBeUndefined
 * // { a: 1 }
 * To avoid writing code like:
 * let val = obj.someProp
 * if (val === undefined) {
 *   val = obj.someProp = defaultValue
 * }
 *
 * @export
 * @template T
 * @param {T} original
 * @param {string | number} prop
 * @param {*} defaultVal
 * @returns {T} mutated original object
 */
function defaults(original, prop, defaultVal) {
    if (typeof original !== 'object') {
        throw Error("Original input must be an object, not " + typeof original);
    }
    var val = original[prop];
    if (val === undefined) {
        original[prop] = defaultVal;
    }
    return original;
}

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
function swap(arr, pos1, pos2) {
    if (isNumber(pos1))
        pos1 = [pos1];
    if (isNumber(pos2))
        pos2 = [pos2];
    var parent1 = [];
    var parent2 = [];
    var val1 = pick.apply(void 0, [arr].concat(pos1, [parent1]));
    var val2 = pick.apply(void 0, [arr].concat(pos2, [parent2]));
    parent1[parent1.length - 1][pos1[pos1.length - 1]] = val2;
    parent2[parent2.length - 1][pos2[pos2.length - 1]] = val1;
}
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
    if (!isArray(last)) {
        indices.push(last);
        last = undefined;
    }
    if (indices.length === 1) {
        var i = indices[0];
        if (typeof i !== 'number') {
            throw Error("Index " + JSON.stringify(i) + " is not a number");
        }
        if (array !== undefined && array.length > i) {
            last && last.push(array);
            return array[i];
        }
        throw Error("Out of bound");
    }
    var first = indices[0], rest = indices.slice(1);
    last && last.push(array) && rest.push(last);
    return pick.apply(void 0, [array[first]].concat(rest));
}
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
    var result = new Array;
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
                defaults(element, childrenProp, [])[childrenProp].push(element);
            }
        }
        else {
            var parent_1 = allMap.get(link);
            if (parent_1) {
                defaults(parent_1, childrenProp, [])[childrenProp].push(element);
            }
            else {
                var deferedList = defered.get(link) || new Array;
                deferedList.push(element);
                defered.set(link, deferedList);
            }
        }
    }); // cleanup
    [defered, allMap].forEach(function (m) { return m.clear(); });
    return result;
}

export { isArray, isNullOrEmpty, deepMap, shallowEqual, swap, pick, unflatten };
