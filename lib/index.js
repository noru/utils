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
    var checkRight = function () { return inclusive[1] ? testee <= max : testee < min; };
    return checkLeft() && checkRight();
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
    var parent1 = {};
    var parent2 = {};
    var val1 = pick.apply(void 0, [arr].concat(pos1, [parent1])); // pick (arr, 1,2,3 ,parent1)
    var val2 = pick.apply(void 0, [arr].concat(pos2, [parent2]));
    parent1.parent[pos1[pos1.length - 1]] = val2;
    parent2.parent[pos2[pos2.length - 1]] = val1;
}
/**
 * Pick a value from a deep array by its indices.
 * e.g.: pick(arr, 1, 2, 3) = arr[1][2][3]
 *
 * @export
 * @param {any[]} array
 * @param {any} indices target value indices in a deep array. e.g. the indice of value `arr[i1][i2][i3]` is [i1, i2, i3]
 * @returns {any}
 */
function pick(array) {
    var indices = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        indices[_i - 1] = arguments[_i];
    }
    var last = indices.pop();
    if (typeof last !== 'object') {
        indices.push(last);
        last = undefined;
    }
    if (indices.length === 1) {
        var i = indices[0];
        if (array !== undefined && array.length > i) {
            last && (last.parent = array);
            return array[i];
        }
        throw new Error("Out of bound");
    }
    var first = indices[0], rest = indices.slice(1);
    last && rest.push(last);
    return pick.apply(void 0, [array[first]].concat(rest));
}

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
 * @param {(any[] | any)} [args] can be a single value or a list of values
 * @param {..._Function[]} funcs
 * @returns {any}
 */
function apply(args) {
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
    return funcs.reduce(function (left, right) {
        return left === args ? right.apply(void 0, left) : right(left);
    }, args);
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

export { isArray, isNullOrEmpty, deepMap, shallowEqual, swap, pick, identity, noop, apply, isNumber, toPercentage, isBetween, random, randomInt, ellipsis, isMobile };
