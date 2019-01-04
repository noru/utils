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
function toPercentage(num, digit) {
    if (digit === void 0) { digit = 0; }
    return (num * 100).toFixed(digit) + '%';
}
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
function isBetween(testee, min, max, inclusive) {
    if (inclusive === void 0) { inclusive = [true, true]; }
    var checkLeft = function () { return inclusive[0] ? testee >= min : testee > min; };
    var checkRight = function () { return inclusive[1] ? testee <= max : testee < max; };
    return checkLeft() && checkRight();
}

///<reference path="./global.d.ts"/>
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
    return param === null || param === undefined;
}
/**
 *  Check input param is "Empty": undefined or null or {}, []
 *
 * @export
 * @param {any} obj
 * @returns {boolean}
 */
function isEmpty(obj) {
    // null and undefined are "empty"
    if (obj == null)
        return true;
    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)
        return false;
    if (obj.length === 0)
        return true;
    // If it isn't an object at this point
    // it is empty, but it can't be anything *but* empty
    // Is it empty?  Depends on your application.
    if (typeof obj !== 'object')
        return false;
    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (Object.hasOwnProperty.call(obj, key))
            return false;
    }
    return true;
}
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
function flattenDeepBy(obj, propNameOrGetter) {
    if (isEmpty(obj) || typeof obj === 'number' || typeof obj === 'string') {
        return [];
    }
    if (!isArray(obj)) {
        obj = [obj];
    }
    if (typeof propNameOrGetter === 'string') {
        var _propStr_1 = propNameOrGetter;
        propNameOrGetter = function (o) { return o[_propStr_1]; };
    }
    var result = new Array;
    while (obj.length > 0) {
        var head = obj.shift();
        result.push(head);
        var propVal = propNameOrGetter(head);
        if (isArray(propVal)) {
            obj = propVal.concat(obj);
        }
    }
    return result;
}
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
    if (isEmpty(array))
        return null;
    end = end || array.length;
    var midIndex = (start + end) / 2 | 0;
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

var isMobile = {
    Windows: function () {
        return /IEMobile/i.test(navigator.userAgent);
    },
    Android: function () {
        return /Android/i.test(navigator.userAgent);
    },
    BlackBerry: function () {
        return /BlackBerry/i.test(navigator.userAgent);
    },
    iOS: function () {
        return /iPhone|iPad|iPod/i.test(navigator.userAgent);
    },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
    },
};

///<reference path="./global.d.ts"/>
/**
 * Identity function, always return input itself
 *
 * @export
 * @param {any} self
 * @returns
 */
function identity(self) { return self; }
/**
 * A function that does nothing
 *
 * @export
 */
function noop() { }
/**
 * Given an initmial argument and a list of functions, each function will be executed sequentially, and
 * the returned value is passed to the next function as argument.
 *
 * @export
 * @template T
 * @param {(any[] | any)} [args]
 * @param {..._Function[]} funcs
 * @returns {T}
 */
function flow(args) {
    var funcs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        funcs[_i - 1] = arguments[_i];
    }
    if (funcs.length === 0) {
        return args;
    }
    if (!isArray(args)) {
        args = [args];
    }
    return funcs.reduce(function (result, nextFunc) {
        return result === args ? nextFunc.apply(void 0, result) : nextFunc(result);
    }, args);
}
/**
 * Deprectated. Rename it to 'flow' as lodash
 *
 * @deprecated {{flow}}{{}}
 * @export
 * @param {(any[] | any)} [args] can be a single value or a list of values
 * @param {..._Function[]} funcs
 * @returns {any}
 */
function apply() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return flow.apply(void 0, args);
}
/**
 * Simple try catch wrapper that returns a default value if exception was raised
 *
 * @export
 * @param {() => any} func
 * @param {*} defaultValue
 * @returns {*}
 */
function attempt(func, defaultValue) {
    try {
        return func();
    }
    catch (_a) {
        return defaultValue;
    }
}
/**
 * Simple try catch wrapper that returns a default value if exception was raised
 *
 * @deprecated {{renamed to attempt}}{{}}
 * @export
 * @param {() => any} func
 * @param {*} defaultValue
 * @returns {*}
 */
function Try(func, defaultValue) {
    return attempt(func, defaultValue);
}

/**
 * random with range
 *
 * e.g.:
 *   random()     // equal Math.random()
 *   random(3)    // a random number from 0 to 3
 *   random(1, 9) // a random number from 1 to 9
 *
 * @export
 * @param {any} args
 * @returns {number}
 */
function random() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (args[0] === undefined) {
        return Math.random();
    }
    if (args.length === 1) {
        return Math.random() * args[0];
    }
    return Math.random() * (args[1] - args[0]) + args[0];
}
/**
 * Like random, but return integer only
 *
 * @export
 * @param {any} args
 * @returns {number}
 */
function randomInt() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return Math.round(random.apply(void 0, args));
}
/**
 * Random boolean value
 *
 * @export
 * @param {any} args
 * @returns {boolean}
 */
function randomBool() {
    return Math.random() > .5;
}

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
/**
 * calculate hash (32bit integer) from a string
 * @param str
 */
function hashOf(str) {
    if (str === void 0) { str = ''; }
    var hash = 0, i, chr;
    if (str === null) {
        return hash;
    }
    if (str.length === 0)
        return hash;
    for (i = 0; i < str.length; i++) {
        chr = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}
/**
 * Padding a string or number with assigned content
 *
 * @export
 * @param {(string | number)} origin target string
 * @param {string} paddingContent, can be more than 1 char, however this function does not trim
 * @param {number} threshold target length with padding
 * @param {boolean} [left=true] padding left or right
 * @returns {string}
 */
function padding(origin, paddingContent, threshold, left) {
    if (left === void 0) { left = true; }
    origin = String(origin);
    if (origin.length >= threshold) {
        return origin;
    }
    var paddingStr = Array(threshold - origin.length).fill(paddingContent).join('');
    return left ? paddingStr + origin : origin + paddingStr;
}

/**
 * Get the background color of an element, if the element's background color is
 * not set(transparent), try its parents recursively
 *
 * @export
 * @param {any} element: HTMLElement
 * @returns {string}
 */
function actualBgColor(element) {
    var transparent = 'rgba(0, 0, 0, 0)';
    if (!element)
        return null;
    var bg = getComputedStyle(element).backgroundColor;
    if (bg === transparent) {
        return actualBgColor(element.parentElement);
    }
    else {
        return bg;
    }
}
/**
 * Toggle fullscreen mode
 *
 * @export
 */
/* istanbul ignore next */
function toggleFullscreen() {
    if (isFullscreen()) {
        exitFullscreen();
    }
    else {
        requestFullscreen();
    }
}
/**
 * Check if the window is currently in fullscreen mode
 *
 * @export
 * @returns {boolean}
 */
/* istanbul ignore next */
function isFullscreen() {
    return !!document.fullscreenElement || !!document.webkitFullscreenElement;
}
/**
 * Request entering fullscreen mode
 *
 * @export
 */
/* istanbul ignore next */
function requestFullscreen() {
    var document = window.document;
    if (!document.fullscreenElement &&
        !document.mozFullScreenElement &&
        !document.webkitFullscreenElement &&
        !document.msFullscreenElement) {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        }
        else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        }
        else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        }
        else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen();
        }
    }
}
/**
 * Request exiting fullscreen mode
 *
 * Note: may not warking on Android
 *
 * @export
 */
/* istanbul ignore next */
function exitFullscreen() {
    var document = window.document;
    if (document.exitFullscreen) {
        document.exitFullscreen();
    }
    else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
    else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    }
    else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
    else if (document.webkitCancelFullscreen) {
        document.webkitCancelFullscreen();
    }
}

export { isArray, isNullOrEmpty, deepMap, shallowEqual, swap, pick, binarySearch, unflatten, isMobile, identity, noop, flow, apply, attempt, Try, isNumber, toPercentage, isBetween, isPremitive, recursiveCopy, isEqual, merge, isEmpty, flattenDeepBy, defaults, random, randomInt, randomBool, ellipsis, parseQuery, replaceAll, hashOf, padding, actualBgColor, toggleFullscreen, isFullscreen, requestFullscreen, exitFullscreen };
