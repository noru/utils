function isNumber(testee) {
    return typeof testee === 'number';
}
function isArray(testee) {
    if (Array.isArray) {
        return Array.isArray(testee);
    }
    return Object.prototype.toString.call(testee) === '[object Array]';
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
function shallowEqual(a, b) {
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
    let defered = new Map();
    arr.forEach(element => {
        let link = element[linkProperty];
        let key = element[keyProperty];
        allMap.set(key, element);
        if (!link) {
            result.push(element);
            let deferedChildren = defered.get(key);
            if (deferedChildren) {
                defaults(element, childrenProp, [])[childrenProp].push(element);
            }
        }
        else {
            let parent = allMap.get(link);
            if (parent) {
                defaults(parent, childrenProp, [])[childrenProp].push(element);
            }
            else {
                let deferedList = defered.get(link) || new Array();
                deferedList.push(element);
                defered.set(link, deferedList);
            }
        }
    })
    ;
    [defered, allMap].forEach(m => m.clear());
    return result;
}

export { binarySearch, deepMap, isNullOrEmpty, pick, shallowEqual, swap, unflatten };
