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

export { isArray, isBoolean, isEmpty, isFunction, isNumber, isPrimitive, isString, isUndefinedOrNull };
