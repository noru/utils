"use strict";
exports.__esModule = true;
function assert(condition, errorMsg) {
    if (!condition)
        throw new Error(errorMsg);
}
exports.assert = assert;
exports.invariant = assert;
exports.preCondition = assert;
exports.postCondition = assert;
