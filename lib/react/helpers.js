"use strict";
exports.__esModule = true;
var React = require("react");
var __1 = require("..");
function appendClass(child) {
    var classes = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        classes[_i - 1] = arguments[_i];
    }
    if (__1.isString(child) || __1.isNumber(child)) {
        return child;
    }
    var className = child.props.className + "  " + classes.join(' ');
    return overrideProps(child, function (_) { return ({ className: className }); });
}
exports.appendClass = appendClass;
function overrideProps(child, propsMapper) {
    if (__1.isString(child) || __1.isNumber(child)) {
        return child;
    }
    return React.cloneElement(child, propsMapper(child.props));
}
exports.overrideProps = overrideProps;
function overrideEventhandler(child, eventName, deligator) {
    var handlerName = 'on' + __1.capitalizeFirst(eventName);
    return overrideProps(child, function (props) {
        var _a;
        return (_a = {}, _a[handlerName] = deligator(props[handlerName]), _a);
    });
}
exports.overrideEventhandler = overrideEventhandler;
