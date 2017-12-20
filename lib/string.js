/**
 * Make a long string shorter and end with "…"
 *
 * e.g.: ellipsis('helloworld!', 5) // "hello…"
 *
 * @export
 * @param {string} str
 * @param {number} limit chars to keep
 * @returns {string}
 */
function ellipsis(str, limit) {
    if (typeof str !== 'string') {
        throw new Error(JSON.stringify(str) + " is not a string");
    }
    return str.length > limit ? str.substring(0, limit) + '…' : str;
}
/**
 * Parse query string and return a key/value object
 *
 * @export
 * @param {any} queryString
 * @returns {object}
 */
function parseQuery(queryString) {
    var query = {};
    var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    // tslint:disable-next-line:prefer-for-of
    for (var _i = 0, pairs_1 = pairs; _i < pairs_1.length; _i++) {
        var pair = pairs_1[_i];
        var _a = pair.split('='), key = _a[0], value = _a[1];
        if (!key)
            continue;
        query[decodeURIComponent(key)] = decodeURIComponent(value || '');
    }
    return query;
}

export { ellipsis, parseQuery };
