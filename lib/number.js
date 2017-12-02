function toPercentage(num, digit) {
    if (digit === void 0) { digit = 0; }
    return (num * 100).toFixed(digit) + '%';
}
function isBetween(testee, min, max, inclusive) {
    if (inclusive === void 0) { inclusive = [true, true]; }
    var checkLeft = function () { return inclusive[0] ? testee >= min : testee > min; };
    var checkRight = function () { return inclusive[1] ? testee <= max : testee < min; };
    return checkLeft() && checkRight();
}

export { toPercentage, isBetween };
