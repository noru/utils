"use strict";function __spreadArrays(){for(var e=0,r=0,t=arguments.length;r<t;r++)e+=arguments[r].length;var n=Array(e),i=0;for(r=0;r<t;r++)for(var o=arguments[r],s=0,u=o.length;s<u;s++,i++)n[i]=o[s];return n}function isPrimitive(e){return null==e||"object"!=typeof e}function isNumber(e){return"number"==typeof e}function isString(e){return"string"==typeof e}function isBoolean(e){return"boolean"==typeof e}function isFunction(e){return"function"==typeof e}function isArray(e){return Array.isArray?Array.isArray(e):"[object Array]"===Object.prototype.toString.call(e)}function isUndefinedOrNull(e){return null==e}function isEmpty(e){if(null==e)return!0;if(0<e.length)return!1;if(0===e.length)return!0;if("object"!=typeof e)return!1;for(var r in e)if(Object.hasOwnProperty.call(e,r))return!1;return!0}function shallowEqual(e,r){if(e===r)return!0;if(null==e||null==r)return!1;if(e.length!==r.length)return!1;for(var t in e)if(e[t]!==r[t])return!1;return!0}function recursiveCopy(e){var r;if(isPrimitive(e))return e;if(e instanceof Date)return(r=new Date).setTime(e.getTime()),r;if(e instanceof Array){r=[];for(var t=0,n=e.length;t<n;t++)r[t]=recursiveCopy(e[t]);return r}if(e instanceof Object){for(var i in r={},e)e.hasOwnProperty(i)&&(r[i]=recursiveCopy(e[i]));return r}}function isEqual(e,r){if(e===r)return!0;if(isPrimitive(e))return e===r;if(e instanceof Date)return e.getTime()===r.getTime();if(e instanceof Array){if(e.length!==r.length)return!1;for(var t=0,n=e.length;t<n;t++)if(!isEqual(e[t],r[t]))return!1;return!0}if(e instanceof Object){for(var i in e){if(!r.hasOwnProperty(i))return!1;if(!isEqual(e[i],r[i]))return!1}return!0}}function merge(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];return e.reduce(function(e,r){if(isPrimitive(e)||isPrimitive(r))return isUndefinedOrNull(e)||isUndefinedOrNull(r)?e||r:e=r;for(var t in r)e[t]=merge(e[t],r[t]);return e})}function flattenDeepBy(e,r){if(isEmpty(e)||"number"==typeof e||"string"==typeof e)return[];if(isArray(e)||(e=[e]),"string"==typeof r){var t=r;r=function(e){return e[t]}}for(var n=new Array;0<e.length;){var i=e.shift();n.push(i);var o=r(i);isArray(o)&&(e=o.concat(e))}return n}function defaults(e,r,t){if("object"!=typeof e)throw Error("Original input must be an object, not "+typeof e);return void 0===e[r]&&(e[r]=t),e}function isNullOrEmpty(e){return null==e||0===e.length}function deepMap(e,t,n,i){if(void 0===n&&(n=[]),void 0===i&&(i={i:0}),!isArray(e))throw new Error("Argument is not an array: "+e+". position: "+n);return e.map(function(e,r){return isArray(e)?deepMap(e,t,__spreadArrays(n,[r]),i):t(e,__spreadArrays(n,[r]),i.i++)})}function swap(e,r,t){isNumber(r)&&(r=[r]),isNumber(t)&&(t=[t]);var n=[],i=[],o=pick.apply(void 0,__spreadArrays([e],r,[n])),s=pick.apply(void 0,__spreadArrays([e],t,[i]));n[n.length-1][r[r.length-1]]=s,i[i.length-1][t[t.length-1]]=o}function pick(e){for(var r=[],t=1;t<arguments.length;t++)r[t-1]=arguments[t];var n=r.pop();if(isArray(n)||(r.push(n),n=void 0),1===r.length){var i=r[0];if("number"!=typeof i)throw Error("Index "+JSON.stringify(i)+" is not a number");if(void 0!==e&&e.length>i&&-1<i)return n&&n.push(e),e[i];throw Error("Out of bound")}var o=r[0],s=r.slice(1);return n&&n.push(e)&&s.push(n),pick.apply(void 0,__spreadArrays([e[o]],s))}function binarySearch(e,r,t,n,i){if(void 0===n&&(n=0),isEmpty(e))return null;var o=(n+(i=i||e.length))/2|0,s=e[o];if(r(s))return[s,o];if(0==o||o==e.length-1)return null;var u=t(s)?[n,o]:[o,i];return binarySearch.apply(void 0,__spreadArrays([e,r,t],u))}function unflatten(e,o,s,u){if(void 0===u&&(u="__children__"),0===e.length||1===e.length)return e;var l=new Array,a=new Map,c=new Map;return e.forEach(function(e){var r=e[s],t=e[o];if(a.set(t,e),r){var n=a.get(r);if(n)defaults(n,u,[])[u].push(e);else{var i=c.get(r)||new Array;i.push(e),c.set(r,i)}}else{l.push(e),c.get(t)&&defaults(e,u,[])[u].push(e)}}),[c,a].forEach(function(e){return e.clear()}),l}Object.defineProperty(exports,"__esModule",{value:!0});var isMobile={Windows:function(){return/IEMobile/i.test(navigator.userAgent)},Android:function(){return/Android/i.test(navigator.userAgent)},BlackBerry:function(){return/BlackBerry/i.test(navigator.userAgent)},iOS:function(){return/iPhone|iPad|iPod/i.test(navigator.userAgent)},any:function(){return isMobile.Android()||isMobile.BlackBerry()||isMobile.iOS()||isMobile.Windows()}};function identity(e){return e}function noop(){}function flow(t){for(var e=[],r=1;r<arguments.length;r++)e[r-1]=arguments[r];return 0===e.length?t:(isArray(t)||(t=[t]),e.reduce(function(e,r){return e===t?r.apply(void 0,e):r(e)},t))}function compose(){for(var r=[],e=0;e<arguments.length;e++)r[e]=arguments[e];return 0===r.length?identity:function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return r.reduce(function(e,r){return e===t?r.apply(void 0,e):r(e)},t)}}function attempt(e,r,t){void 0===t&&(t=!0);try{return e()}catch(e){return t||console.error(e),r}}function toPercentage(e,r){return void 0===r&&(r=0),(100*e).toFixed(r)+"%"}function isBetween(e,r,t,n){void 0===n&&(n=[!0,!0]);return(n[0]?r<=e:r<e)&&(n[1]?e<=t:e<t)}function random(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];if(void 0===e[0])return Math.random();if(1===e.length)return Math.random()*e[0];var t=e,n=t[0],i=t[1];return Math.random()*(i-n)+n}function randomInt(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];return Math.round(random.apply(void 0,e))}function randomBool(){return.5<Math.random()}function sample(e){return e[Math.random()*e.length|0]}function ellipsis(e,r){if("string"!=typeof e)throw new Error(JSON.stringify(e)+" is not a string");return e.length>r?e.substring(0,r)+"…":e}function parseQuery(e){for(var r={},t=0,n=("?"===e[0]?e.substr(1):e).split("&");t<n.length;t++){var i=n[t].split("="),o=i[0],s=i[1];if(o){var u=decodeURIComponent(o),l=""===s?void 0:decodeURIComponent(s);if(r[u]){var a=r[u];isArray(a)?a.push(l):r[u]=[a,l]}else r[decodeURIComponent(o)]=l}}return r}function replaceAll(e,r,t){return e.replace(new RegExp(r,"g"),t)}function hashOf(e){void 0===e&&(e="");var r,t=0;if(null===e)return t;if(0===e.length)return t;for(r=0;r<e.length;r++)t=(t<<5)-t+e.charCodeAt(r),t|=0;return t}function padding(e,r,t,n){if(void 0===n&&(n=!0),(e=String(e)).length>=t)return e;var i=Array(t-e.length).fill(r).join("");return n?i+e:e+i}function capitalizeFirst(e){return e.charAt(0).toUpperCase()+e.slice(1)}function stripHtmlTags(e){return e.replace(/(<([^>]+)>)/gi,"")}function actualBgColor(e){if(!e)return null;var r=getComputedStyle(e).backgroundColor;return"rgba(0, 0, 0, 0)"===r?actualBgColor(e.parentElement):r}function toggleFullscreen(){isFullscreen()?exitFullscreen():requestFullscreen()}function isFullscreen(){var e=window.document;return!!e.fullscreenElement||!!e.webkitFullscreenElement}function requestFullscreen(){var e=window.document;e.fullscreenElement||e.mozFullScreenElement||e.webkitFullscreenElement||e.msFullscreenElement||(e.documentElement.requestFullscreen?e.documentElement.requestFullscreen():e.documentElement.msRequestFullscreen?e.documentElement.msRequestFullscreen():e.documentElement.mozRequestFullScreen?e.documentElement.mozRequestFullScreen():e.documentElement.webkitRequestFullscreen&&e.documentElement.webkitRequestFullscreen())}function exitFullscreen(){var e=window.document;e.exitFullscreen?e.exitFullscreen():e.msExitFullscreen?e.msExitFullscreen():e.mozCancelFullScreen?e.mozCancelFullScreen():e.webkitExitFullscreen?e.webkitExitFullscreen():e.webkitCancelFullscreen&&e.webkitCancelFullscreen()}function assert(e,r){if(!e)throw new Error(r)}var invariant=assert,preCondition=assert,postCondition=assert,TAU=2*Math.PI,PHI=1.618033988749895;function rotate2D(e,r){var t=e.x,n=e.y;return{x:t*Math.cos(r)-n*Math.sin(r),y:t*Math.sin(r)+n*Math.cos(r)}}exports.PHI=PHI,exports.TAU=TAU,exports.actualBgColor=actualBgColor,exports.assert=assert,exports.attempt=attempt,exports.binarySearch=binarySearch,exports.capitalizeFirst=capitalizeFirst,exports.compose=compose,exports.deepMap=deepMap,exports.defaults=defaults,exports.ellipsis=ellipsis,exports.exitFullscreen=exitFullscreen,exports.flattenDeepBy=flattenDeepBy,exports.flow=flow,exports.hashOf=hashOf,exports.identity=identity,exports.invariant=invariant,exports.isArray=isArray,exports.isBetween=isBetween,exports.isBoolean=isBoolean,exports.isEmpty=isEmpty,exports.isEqual=isEqual,exports.isFullscreen=isFullscreen,exports.isFunction=isFunction,exports.isMobile=isMobile,exports.isNullOrEmpty=isNullOrEmpty,exports.isNumber=isNumber,exports.isPrimitive=isPrimitive,exports.isString=isString,exports.isUndefinedOrNull=isUndefinedOrNull,exports.merge=merge,exports.noop=noop,exports.padding=padding,exports.parseQuery=parseQuery,exports.pick=pick,exports.postCondition=postCondition,exports.preCondition=preCondition,exports.random=random,exports.randomBool=randomBool,exports.randomInt=randomInt,exports.recursiveCopy=recursiveCopy,exports.replaceAll=replaceAll,exports.requestFullscreen=requestFullscreen,exports.rotate2D=rotate2D,exports.sample=sample,exports.shallowEqual=shallowEqual,exports.stripHtmlTags=stripHtmlTags,exports.swap=swap,exports.toPercentage=toPercentage,exports.toggleFullscreen=toggleFullscreen,exports.unflatten=unflatten;
