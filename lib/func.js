function isArray(testee) {
    if (Array.isArray) {
        return Array.isArray(testee);
    }
    return Object.prototype.toString.call(testee) === '[object Array]';
}

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

export { identity, noop, flow, compose, attempt };
