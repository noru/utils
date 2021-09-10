function isPrimitive(obj) {
    return null == obj || 'object' !== typeof obj;
}
function isArray(testee) {
    if (Array.isArray) {
        return Array.isArray(testee);
    }
    return Object.prototype.toString.call(testee) === '[object Array]';
}
function isUndefinedOrNull(testee) {
    return testee === null || testee === undefined;
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

export { defaults, flattenDeepBy, isEqual, merge, recursiveCopy, shallowEquals };
