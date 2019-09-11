function assert(condition, errorMsg) {
    if (!condition)
        throw new Error(errorMsg);
}
const invariant = assert;
const preCondition = assert;
const postCondition = assert;

export { assert, invariant, preCondition, postCondition };
