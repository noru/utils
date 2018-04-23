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
 * if an array is supplied as the last parameter, it will be filled with arrays in each level
 * e.g.: [rootArray, subArray, ..., parentArray]
 * @export
 * @param {any[]} array
 * @param {any} indices target value indices in a deep array. e.g. the indice of value `arr[i1][i2][i3]` is [i1, i2, i3]
 * the last one can be an empty array to hold parents in each level
 * @returns {any}
 */

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

/**
 * Make a long string shorter and end with "…"
 *
 * e.g.: ellipsis('helloworld!', 5) // "hello…"
 *
 * @export
 * @param {string} str
 * @param {number} limit chars to keep
 * @returns {string}
 */
function ellipsis(str, limit) {
    if (typeof str !== 'string') {
        throw new Error(JSON.stringify(str) + " is not a string");
    }
    return str.length > limit ? str.substring(0, limit) + '…' : str;
}
/**
 * Parse query string and return a key/value object
 *
 * @export
 * @param {any} queryString
 * @returns {any}
 */
function parseQuery(queryString) {
    var query = {};
    var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    // tslint:disable-next-line:prefer-for-of
    for (var _i = 0, pairs_1 = pairs; _i < pairs_1.length; _i++) {
        var pair = pairs_1[_i];
        var _a = pair.split('='), key = _a[0], value = _a[1];
        if (!key)
            continue;
        var prop = decodeURIComponent(key);
        var propVal = value === '' ? undefined : decodeURIComponent(value);
        if (query[prop]) {
            var val = query[prop];
            if (isArray(val)) {
                val.push(propVal);
            }
            else {
                query[prop] = [val, propVal];
            }
        }
        else {
            query[decodeURIComponent(key)] = propVal;
        }
    }
    return query;
}
/**
 * Like String.prototype.replace, except it replaces all occurrences
 *
 * @export
 * @param {string} target
 * @param {string} search
 * @param {string} replacement
 * @returns {string}
 */
function replaceAll(target, search, replacement) {
    return target.replace(new RegExp(search, 'g'), replacement);
}

export { ellipsis, parseQuery, replaceAll };
