"use strict";
exports.__esModule = true;
exports.isMobile = {
    Windows: function () {
        return /IEMobile/i.test(navigator.userAgent);
    },
    Android: function () {
        return /Android/i.test(navigator.userAgent);
    },
    BlackBerry: function () {
        return /BlackBerry/i.test(navigator.userAgent);
    },
    iOS: function () {
        return /iPhone|iPad|iPod/i.test(navigator.userAgent);
    },
    any: function () {
        return (exports.isMobile.Android() || exports.isMobile.BlackBerry() || exports.isMobile.iOS() || exports.isMobile.Windows());
    }
};
