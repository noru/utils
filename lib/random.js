function random(...args) {
    if (args[0] === undefined) {
        return Math.random();
    }
    if (args.length === 1) {
        return Math.random() * args[0];
    }
    return Math.random() * (args[1] - args[0]) + args[0];
}
function randomInt(...args) {
    return Math.round(random(...args));
}
function randomBool() {
    return Math.random() > .5;
}

export { random, randomInt, randomBool };
