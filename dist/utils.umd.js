!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n(e.Utils={})}(this,function(e){"use strict";function n(e){return"number"==typeof e}function r(e){return null==e||"object"!=typeof e}function t(e){var n;if(r(e))return e;if(e instanceof Date)return(n=new Date).setTime(e.getTime()),n;if(e instanceof Array){n=[];for(var u=0,i=e.length;u<i;u++)n[u]=t(e[u]);return n}if(e instanceof Object){n={};for(var o in e)e.hasOwnProperty(o)&&(n[o]=t(e[o]));return n}}function u(e,n){if(e===n)return!0;if(r(e))return e===n;if(e instanceof Date)return e.getTime()===n.getTime();if(e instanceof Array){if(e.length!==n.length)return!1;for(var t=0,i=e.length;t<i;t++)if(!u(e[t],n[t]))return!1;return!0}if(e instanceof Object){for(var o in e){if(!n.hasOwnProperty(o))return!1;if(!u(e[o],n[o]))return!1}return!0}}function i(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];return e.reduce(function(e,n){if(!r(e)&&!r(n)){for(var t in n)e[t]=i(e[t],n[t]);return e}return o(e)||o(n)?e||n:e=n})}function o(e){return null===e||void 0===e}function l(e){if(null==e)return!0;if(e.length>0)return!1;if(0===e.length)return!0;if("object"!=typeof e)return!1;for(var n in e)if(Object.hasOwnProperty.call(e,n))return!1;return!0}function c(e,n,r){if("object"!=typeof e)throw Error("Original input must be an object, not "+typeof e);return void 0===e[n]&&(e[n]=r),e}function f(e){return Array.isArray?Array.isArray(e):"[object Array]"===Object.prototype.toString.call(e)}function a(e,n,r,t){if(void 0===r&&(r=[]),void 0===t&&(t={i:0}),!f(e))throw new Error("Argument is not an array: "+e+". position: "+r);return e.map(function(e,u){return f(e)?a(e,n,r.concat([u]),t):n(e,r.concat([u]),t.i++)})}function s(e){for(var n=[],r=1;r<arguments.length;r++)n[r-1]=arguments[r];var t=n.pop();if(f(t)||(n.push(t),t=void 0),1===n.length){var u=n[0];if("number"!=typeof u)throw Error("Index "+JSON.stringify(u)+" is not a number");if(void 0!==e&&e.length>u)return t&&t.push(e),e[u];throw Error("Out of bound")}var i=n[0],o=n.slice(1);return t&&t.push(e)&&o.push(t),s.apply(void 0,[e[i]].concat(o))}function d(e,n,r,t,u){if(void 0===t&&(t=0),l(e))return null;var i=(t+(u=u||e.length))/2|0,o=e[i];if(n(o))return[o,i];if(0===i||i===e.length-1)return null;var c=r(o)?[t,i]:[i,u];return d.apply(void 0,[e,n,r].concat(c))}function p(e){for(var n=[],r=1;r<arguments.length;r++)n[r-1]=arguments[r];return 0===n.length?e:(f(e)||(e=[e]),n.reduce(function(n,r){return n===e?r.apply(void 0,n):r(n)},e))}function g(e,n){try{return e()}catch(e){return n}}function h(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];return void 0===e[0]?Math.random():1===e.length?Math.random()*e[0]:Math.random()*(e[1]-e[0])+e[0]}function m(e){if(!e)return null;var n=getComputedStyle(e).backgroundColor;return"rgba(0, 0, 0, 0)"===n?m(e.parentElement):n}function v(){return!!document.fullscreenElement||!!document.webkitFullscreenElement}function y(){var e=window.document;e.fullscreenElement||e.mozFullScreenElement||e.webkitFullscreenElement||e.msFullscreenElement||(e.documentElement.requestFullscreen?e.documentElement.requestFullscreen():e.documentElement.msRequestFullscreen?e.documentElement.msRequestFullscreen():e.documentElement.mozRequestFullScreen?e.documentElement.mozRequestFullScreen():e.documentElement.webkitRequestFullscreen&&e.documentElement.webkitRequestFullscreen())}function w(){var e=window.document;e.exitFullscreen?e.exitFullscreen():e.msExitFullscreen?e.msExitFullscreen():e.mozCancelFullScreen?e.mozCancelFullScreen():e.webkitExitFullscreen?e.webkitExitFullscreen():e.webkitCancelFullscreen&&e.webkitCancelFullscreen()}var b={Windows:function(){return/IEMobile/i.test(navigator.userAgent)},Android:function(){return/Android/i.test(navigator.userAgent)},BlackBerry:function(){return/BlackBerry/i.test(navigator.userAgent)},iOS:function(){return/iPhone|iPad|iPod/i.test(navigator.userAgent)},any:function(){return b.Android()||b.BlackBerry()||b.iOS()||b.Windows()}};e.isArray=f,e.isNullOrEmpty=function(e){return null===e||void 0===e||0===e.length},e.deepMap=a,e.shallowEqual=function(e,n){if(e===n)return!0;if(null==e||null==n)return!1;if(e.length!==n.length)return!1;for(var r in e)if(e[r]!==n[r])return!1;return!0},e.swap=function(e,r,t){n(r)&&(r=[r]),n(t)&&(t=[t]);var u=[],i=[],o=s.apply(void 0,[e].concat(r,[u])),l=s.apply(void 0,[e].concat(t,[i]));u[u.length-1][r[r.length-1]]=l,i[i.length-1][t[t.length-1]]=o},e.pick=s,e.binarySearch=d,e.unflatten=function(e,n,r,t){if(void 0===t&&(t="__children__"),0===e.length||1===e.length)return e;var u=new Array,i=new Map,o=new Map;return e.forEach(function(e){var l=e[r],f=e[n];if(i.set(f,e),l){var a=i.get(l);if(a)c(a,t,[])[t].push(e);else{var s=o.get(l)||new Array;s.push(e),o.set(l,s)}}else u.push(e),o.get(f)&&c(e,t,[])[t].push(e)}),[o,i].forEach(function(e){return e.clear()}),u},e.isMobile=b,e.identity=function(e){return e},e.noop=function(){},e.flow=p,e.apply=function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];return p.apply(void 0,e)},e.attempt=g,e.Try=function(e,n){return g(e,n)},e.isNumber=n,e.toPercentage=function(e,n){return void 0===n&&(n=0),(100*e).toFixed(n)+"%"},e.isBetween=function(e,n,r,t){return void 0===t&&(t=[!0,!0]),(t[0]?e>=n:e>n)&&(t[1]?e<=r:e<r)},e.isPremitive=r,e.recursiveCopy=t,e.isEqual=u,e.merge=i,e.isEmpty=l,e.flattenDeepBy=function(e,n){if(l(e)||"number"==typeof e||"string"==typeof e)return[];if(f(e)||(e=[e]),"string"==typeof n){var r=n;n=function(e){return e[r]}}for(var t=new Array;e.length>0;){var u=e.shift();t.push(u);var i=n(u);f(i)&&(e=i.concat(e))}return t},e.defaults=c,e.random=h,e.randomInt=function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];return Math.round(h.apply(void 0,e))},e.randomBool=function(){return Math.random()>.5},e.ellipsis=function(e,n){if("string"!=typeof e)throw new Error(JSON.stringify(e)+" is not a string");return e.length>n?e.substring(0,n)+"…":e},e.parseQuery=function(e){for(var n={},r=0,t=("?"===e[0]?e.substr(1):e).split("&");r<t.length;r++){var u=t[r].split("="),i=u[0],o=u[1];if(i){var l=decodeURIComponent(i),c=""===o?void 0:decodeURIComponent(o);if(n[l]){var a=n[l];f(a)?a.push(c):n[l]=[a,c]}else n[decodeURIComponent(i)]=c}}return n},e.replaceAll=function(e,n,r){return e.replace(new RegExp(n,"g"),r)},e.hashOf=function(e){void 0===e&&(e="");var n,r=0;if(null===e)return r;if(0===e.length)return r;for(n=0;n<e.length;n++)r=(r<<5)-r+e.charCodeAt(n),r|=0;return r},e.padding=function(e,n,r,t){if(void 0===t&&(t=!0),(e=String(e)).length>=r)return e;var u=Array(r-e.length).fill(n).join("");return t?u+e:e+u},e.actualBgColor=m,e.toggleFullscreen=function(){v()?w():y()},e.isFullscreen=v,e.requestFullscreen=y,e.exitFullscreen=w,Object.defineProperty(e,"__esModule",{value:!0})});
