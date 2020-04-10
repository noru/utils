function isArray(testee) {
    if (Array.isArray) {
        return Array.isArray(testee);
    }
    return Object.prototype.toString.call(testee) === '[object Array]';
}

function ellipsis(str, limit) {
    if (typeof str !== 'string') {
        throw new Error(`${JSON.stringify(str)} is not a string`);
    }
    return str.length > limit ? str.substring(0, limit) + '…' : str;
}
function parseQuery(queryString) {
    let query = {};
    let pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (let pair of pairs) {
        let [key, value] = pair.split('=');
        if (!key)
            continue;
        let prop = decodeURIComponent(key);
        let propVal = value === '' ? undefined : decodeURIComponent(value);
        if (query[prop]) {
            let val = query[prop];
            if (isArray(val)) {
                val.push(propVal);
            }
            else {
                query[prop] = [val, propVal];
            }
        }
        else {
            query[decodeURIComponent(key)] = propVal;
        }
    }
    return query;
}
function replaceAll(target, search, replacement) {
    return target.replace(new RegExp(search, 'g'), replacement);
}
function hashOf(str = '') {
    let hash = 0, i, chr;
    if (str === null) {
        return hash;
    }
    if (str.length === 0)
        return hash;
    for (i = 0; i < str.length; i++) {
        chr = str.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0;
    }
    return hash;
}
function padding(origin, paddingContent, threshold, left = true) {
    origin = String(origin);
    if (origin.length >= threshold) {
        return origin;
    }
    let paddingStr = Array(threshold - origin.length)
        .fill(paddingContent)
        .join('');
    return left ? paddingStr + origin : origin + paddingStr;
}
function capitalizeFirst(origin) {
    return origin.charAt(0).toUpperCase() + origin.slice(1);
}
function stripHtmlTags(origin) {
    return origin.replace(/(<([^>]+)>)/gi, '');
}

export { capitalizeFirst, ellipsis, hashOf, padding, parseQuery, replaceAll, stripHtmlTags };
