!function(n,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t(n.Utils={})}(this,function(n){"use strict";function t(n){return Array.isArray?Array.isArray(n):"[object Array]"===Object.prototype.toString.call(n)}function r(n,e,o,i){if(void 0===o&&(o=[]),void 0===i&&(i={i:0}),!t(n))throw new Error("Argument is not an array: "+n+". position: "+o);return n.map(function(n,u){return t(n)?r(n,e,o.concat([u]),i):e(n,o.concat([u]),i.i++)})}function e(){for(var n=[],t=0;t<arguments.length;t++)n[t]=arguments[t];return void 0===n[0]?Math.random():1===n.length?Math.random()*n[0]:Math.random()*(n[1]-n[0])+n[0]}n.isArray=t,n.isNullOrEmpty=function(n){return null===n||void 0===n||0===n.length},n.deepMap=r,n.shallowEqual=function(n,t){if(n===t)return!0;if(null==n||null==t)return!1;if(n.length!==t.length)return!1;for(var r=0;r<n.length;++r)if(n[r]!==t[r])return!1;return!0},n.identity=function(n){return n},n.noop=function(){},n.toPercentage=function(n,t){return void 0===t&&(t=0),(100*n).toFixed(t)+"%"},n.isBetween=function(n,t,r,e){return void 0===e&&(e=[!0,!0]),(e[0]?n>=t:n>t)&&(e[1]?n<=r:n<t)},n.random=e,n.randomInt=function(){for(var n=[],t=0;t<arguments.length;t++)n[t]=arguments[t];return Math.round(e.apply(void 0,n))},n.ellipsis=function(n,t){if("string"!=typeof n)throw new Error(JSON.stringify(n)+" is not a string");return n.length>t?n.substring(0,t)+"…":n},Object.defineProperty(n,"__esModule",{value:!0})});
