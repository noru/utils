"use strict";
exports.__esModule = true;
var is_1 = require("./is");
/**
 * Identity function, always return input itself
 *
 * @export
 * @template T
 * @param {T} self
 * @returns {T}
 */
function identity(self) {
    return self;
}
exports.identity = identity;
/**
 * A function that does nothing
 *
 * @export
 */
function noop() {
    /* noop */
}
exports.noop = noop;
/**
 * Given an initmial argument and a list of functions, each function will be executed sequentially, and
 * the returned value is passed to the next function as argument.
 *
 * @deprecated {{in favor of compose}}{{}}
 * @export
 * @template T
 * @param {(any[] | any)} [args]
 * @param {...Func[]} funcs
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
    if (!is_1.isArray(args)) {
        args = [args];
    }
    return funcs.reduce(function (result, nextFunc) {
        return result === args ? nextFunc.apply(void 0, result) : nextFunc(result);
    }, args);
}
exports.flow = flow;
function compose() {
    var funcs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        funcs[_i] = arguments[_i];
    }
    if (funcs.length === 0) {
        return identity;
    }
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return funcs.reduce(function (result, nextFunc) {
            return result === args ? nextFunc.apply(void 0, result) : nextFunc(result);
        }, args);
    };
}
exports.compose = compose;
/**
 * Simple try catch wrapper that returns a default value if exception was raised.
 * If silent = false, there will be a 'console.error' call.
 *
 * @export
 * @param {Func} func
 * @param {*} [defaultValue]
 * @param {boolean} [silent=true]
 * @returns {*}
 */
function attempt(func, defaultValue, silent) {
    if (silent === void 0) { silent = true; }
    try {
        return func();
    }
    catch (e) {
        !silent && console.error(e);
        return defaultValue;
    }
}
exports.attempt = attempt;
