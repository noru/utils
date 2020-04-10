function isPrimitive(obj) {
    return null == obj || 'object' !== typeof obj;
}
function isNumber(testee) {
    return typeof testee === 'number';
}
function isString(testee) {
    return typeof testee === 'string';
}
function isBoolean(testee) {
    return typeof testee === 'boolean';
}
function isFunction(testee) {
    return typeof testee === 'function';
}
function isArray(testee) {
    if (Array.isArray) {
        return Array.isArray(testee);
    }
    return Object.prototype.toString.call(testee) === '[object Array]';
}
function isUndefinedOrNull(param) {
    return param === null || param === undefined;
}
function isEmpty(obj) {
    if (obj == null)
        return true;
    if (obj.length > 0)
        return false;
    if (obj.length === 0)
        return true;
    if (typeof obj !== 'object')
        return false;
    for (let key in obj) {
        if (Object.hasOwnProperty.call(obj, key))
            return false;
    }
    return true;
}

function shallowEquals(a, b) {
    if (a === b)
        return true;
    if (a == null || b == null)
        return false;
    if (a.length !== b.length)
        return false;
    for (let i in a) {
        if (a[i] !== b[i])
            return false;
    }
    return true;
}
function recursiveCopy(source) {
    let target;
    if (isPrimitive(source))
        return source;
    if (source instanceof Date) {
        target = new Date();
        target.setTime(source.getTime());
        return target;
    }
    if (source instanceof Array) {
        target = [];
        for (let i = 0, len = source.length; i < len; i++) {
            target[i] = recursiveCopy(source[i]);
        }
        return target;
    }
    if (source instanceof Object) {
        target = {};
        for (let attr in source) {
            if (source.hasOwnProperty(attr)) {
                target[attr] = recursiveCopy(source[attr]);
            }
        }
        return target;
    }
}
function isEqual(obj1, obj2) {
    if (obj1 === obj2)
        return true;
    if (isPrimitive(obj1))
        return obj1 === obj2;
    if (obj1 instanceof Date)
        return obj1.getTime() === obj2.getTime();
    if (obj1 instanceof Array) {
        if (obj1.length !== obj2.length)
            return false;
        for (let i = 0, len = obj1.length; i < len; i++) {
            if (!isEqual(obj1[i], obj2[i]))
                return false;
        }
        return true;
    }
    if (obj1 instanceof Object) {
        for (let attr in obj1) {
            if (!obj2.hasOwnProperty(attr))
                return false;
            if (!isEqual(obj1[attr], obj2[attr]))
                return false;
        }
        return true;
    }
}
function merge(...argument) {
    return argument.reduce(function (obj1, obj2) {
        if (!isPrimitive(obj1) && !isPrimitive(obj2)) {
            for (let attr in obj2) {
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
function flattenDeepBy(obj, propNameOrGetter) {
    if (isEmpty(obj) || typeof obj === 'number' || typeof obj === 'string') {
        return [];
    }
    if (!isArray(obj)) {
        obj = [obj];
    }
    if (typeof propNameOrGetter === 'string') {
        let _propStr = propNameOrGetter;
        propNameOrGetter = (o) => o[_propStr];
    }
    let result = new Array();
    while (obj.length > 0) {
        let head = obj.shift();
        result.push(head);
        let propVal = propNameOrGetter(head);
        if (isArray(propVal)) {
            obj = propVal.concat(obj);
        }
    }
    return result;
}
function defaults(original, prop, defaultVal) {
    if (typeof original !== 'object') {
        throw Error(`Original input must be an object, not ${typeof original}`);
    }
    let val = original[prop];
    if (val === undefined) {
        original[prop] = defaultVal;
    }
    return original;
}

function isNullOrEmpty(arr) {
    return arr === null || arr === undefined || arr.length === 0;
}
function deepMap(deepArray, iteratee, pos = [], index = { i: 0 }) {
    if (!isArray(deepArray)) {
        throw new Error(`Argument is not an array: ${deepArray}. position: ${pos}`);
    }
    return deepArray.map((item, i) => {
        if (isArray(item)) {
            return deepMap(item, iteratee, [...pos, i], index);
        }
        else {
            return iteratee(item, [...pos, i], index.i++);
        }
    });
}
function swap(arr, pos1, pos2) {
    if (isNumber(pos1))
        pos1 = [pos1];
    if (isNumber(pos2))
        pos2 = [pos2];
    let parent1 = [];
    let parent2 = [];
    let val1 = pick(arr, ...pos1, parent1);
    let val2 = pick(arr, ...pos2, parent2);
    parent1[parent1.length - 1][pos1[pos1.length - 1]] = val2;
    parent2[parent2.length - 1][pos2[pos2.length - 1]] = val1;
}
function pick(array, ...indices) {
    let last = indices.pop();
    if (!isArray(last)) {
        indices.push(last);
        last = undefined;
    }
    if (indices.length === 1) {
        let [i] = indices;
        if (typeof i !== 'number') {
            throw Error(`Index ${JSON.stringify(i)} is not a number`);
        }
        if (array !== undefined && array.length > i && i > -1) {
            last && last.push(array);
            return array[i];
        }
        throw Error(`Out of bound`);
    }
    let [first, ...rest] = indices;
    last && last.push(array) && rest.push(last);
    return pick(array[first], ...rest);
}
function binarySearch(array, predict, onward, start = 0, end) {
    if (isEmpty(array))
        return null;
    end = end || array.length;
    let midIndex = ((start + end) / 2) | 0;
    let testee = array[midIndex];
    if (predict(testee)) {
        return [testee, midIndex];
    }
    if (midIndex === 0 || midIndex === array.length - 1) {
        return null;
    }
    let nextSection = onward(testee) ? [start, midIndex] : [midIndex, end];
    return binarySearch(array, predict, onward, ...nextSection);
}
function unflatten(arr, keyProperty, linkProperty, childrenProp = '__children__') {
    if (arr.length === 0 || arr.length === 1) {
        return arr;
    }
    let result = new Array();
    let allMap = new Map();
    let deferred = new Map();
    arr.forEach(element => {
        let link = element[linkProperty];
        let key = element[keyProperty];
        allMap.set(key, element);
        if (!link) {
            result.push(element);
            let deferredChildren = deferred.get(key);
            if (deferredChildren) {
                defaults(element, childrenProp, [])[childrenProp].push(element);
            }
        }
        else {
            let parent = allMap.get(link);
            if (parent) {
                defaults(parent, childrenProp, [])[childrenProp].push(element);
            }
            else {
                let deferredList = deferred.get(link) || new Array();
                deferredList.push(element);
                deferred.set(link, deferredList);
            }
        }
    })
    ;
    [deferred, allMap].forEach(m => m.clear());
    return result;
}

const isMobile = {
    Windows() {
        return /IEMobile/i.test(navigator.userAgent);
    },
    Android() {
        return /Android/i.test(navigator.userAgent);
    },
    BlackBerry() {
        return /BlackBerry/i.test(navigator.userAgent);
    },
    iOS() {
        return /iPhone|iPad|iPod/i.test(navigator.userAgent);
    },
    any() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
    },
};

function identity(self) {
    return self;
}
function noop() {
}
function flow(args, ...funcs) {
    if (funcs.length === 0) {
        return args;
    }
    if (!isArray(args)) {
        args = [args];
    }
    return funcs.reduce((result, nextFunc) => {
        return result === args ? nextFunc(...result) : nextFunc(result);
    }, args);
}
function compose(...funcs) {
    if (funcs.length === 0) {
        return identity;
    }
    return (...args) => funcs.reduce((result, nextFunc) => {
        return result === args ? nextFunc(...result) : nextFunc(result);
    }, args);
}
function attempt(func, defaultValue, silent = true) {
    try {
        return func();
    }
    catch (e) {
        !silent && console.error(e);
        return defaultValue;
    }
}

function toPercentage(num, digit = 0) {
    return (num * 100).toFixed(digit) + '%';
}
function isBetween(testee, min, max, inclusive = [true, true]) {
    let checkLeft = () => (inclusive[0] ? testee >= min : testee > min);
    let checkRight = () => (inclusive[1] ? testee <= max : testee < max);
    return checkLeft() && checkRight();
}

function random(...args) {
    if (args[0] === undefined) {
        return Math.random();
    }
    if (args.length === 1) {
        return Math.random() * args[0];
    }
    let [low, high] = args;
    return Math.random() * (high - low) + low;
}
function randomInt(...args) {
    return Math.round(random(...args));
}
function randomBool() {
    return Math.random() > 0.5;
}
function sample(array) {
    return array[(Math.random() * array.length) | 0];
}

function ellipsis(str, limit) {
    if (typeof str !== 'string') {
        throw new Error(`${JSON.stringify(str)} is not a string`);
    }
    return str.length > limit ? str.substring(0, limit) + '…' : str;
}
function parseQuery(queryString) {
    let query = {};
    let pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (let pair of pairs) {
        let [key, value] = pair.split('=');
        if (!key)
            continue;
        let prop = decodeURIComponent(key);
        let propVal = value === '' ? undefined : decodeURIComponent(value);
        if (query[prop]) {
            let val = query[prop];
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
function replaceAll(target, search, replacement) {
    return target.replace(new RegExp(search, 'g'), replacement);
}
function hashOf(str = '') {
    let hash = 0, i, chr;
    if (str === null) {
        return hash;
    }
    if (str.length === 0)
        return hash;
    for (i = 0; i < str.length; i++) {
        chr = str.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0;
    }
    return hash;
}
function padding(origin, paddingContent, threshold, left = true) {
    origin = String(origin);
    if (origin.length >= threshold) {
        return origin;
    }
    let paddingStr = Array(threshold - origin.length)
        .fill(paddingContent)
        .join('');
    return left ? paddingStr + origin : origin + paddingStr;
}
function capitalizeFirst(origin) {
    return origin.charAt(0).toUpperCase() + origin.slice(1);
}
function stripHtmlTags(origin) {
    return origin.replace(/(<([^>]+)>)/gi, '');
}

function actualBgColor(element) {
    const transparent = 'rgba(0, 0, 0, 0)';
    if (!element)
        return null;
    let bg = getComputedStyle(element).backgroundColor;
    if (bg === transparent) {
        return actualBgColor(element.parentElement);
    }
    else {
        return bg;
    }
}
function toggleFullscreen() {
    if (isFullscreen()) {
        exitFullscreen();
    }
    else {
        requestFullscreen();
    }
}
function isFullscreen() {
    let document = window.document;
    return !!document.fullscreenElement || !!document.webkitFullscreenElement;
}
function requestFullscreen() {
    let document = window.document;
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
function exitFullscreen() {
    let document = window.document;
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

function assert(condition, errorMsg) {
    if (!condition)
        throw new Error(errorMsg);
}
const invariant = assert;
const preCondition = assert;
const postCondition = assert;

const TAU = Math.PI * 2;
const PHI = 1.618033988749895;
function rotate2D(v, angle) {
    let { x, y } = v;
    return {
        x: x * Math.cos(angle) - y * Math.sin(angle),
        y: x * Math.sin(angle) + y * Math.cos(angle),
    };
}

export { PHI, TAU, actualBgColor, assert, attempt, binarySearch, capitalizeFirst, compose, deepMap, defaults, ellipsis, exitFullscreen, flattenDeepBy, flow, hashOf, identity, invariant, isArray, isBetween, isBoolean, isEmpty, isEqual, isFullscreen, isFunction, isMobile, isNullOrEmpty, isNumber, isPrimitive, isString, isUndefinedOrNull, merge, noop, padding, parseQuery, pick, postCondition, preCondition, random, randomBool, randomInt, recursiveCopy, replaceAll, requestFullscreen, rotate2D, sample, shallowEquals, stripHtmlTags, swap, toPercentage, toggleFullscreen, unflatten };
