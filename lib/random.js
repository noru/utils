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

export { random, randomInt, randomBool };
