function toPercentage(num, digit = 0) {
    return (num * 100).toFixed(digit) + '%';
}
function isBetween(testee, min, max, inclusive = [true, true]) {
    let checkLeft = () => (inclusive[0] ? testee >= min : testee > min);
    let checkRight = () => (inclusive[1] ? testee <= max : testee < max);
    return checkLeft() && checkRight();
}

export { isBetween, toPercentage };
