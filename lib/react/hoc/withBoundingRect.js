"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var react_1 = require("react");
var react_dom_1 = require("react-dom");
var func_1 = require("../../func");
var defaultConfig = {
    debounceFunc: func_1.identity,
    delay: 1000
};
function hocWithConfig(Component, config) {
    var Composed = /** @class */ (function (_super) {
        __extends(Composed, _super);
        function Composed() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.state = {
                width: 0,
                height: 0,
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            };
            _this.calcRect = config.debounceFunc(function () {
                var node = react_dom_1["default"].findDOMNode(_this);
                // ! to get correct client rect, have to remove all children
                // then append them back after the calculation !
                var children = [];
                while (node.firstChild) {
                    children.push(node.removeChild(node.firstChild));
                }
                setTimeout(function () {
                    var rect = node.getBoundingClientRect();
                    children.forEach(function (e) { return node.appendChild(e); });
                    _this.setState({
                        width: rect.width,
                        height: rect.height,
                        left: rect.left,
                        right: rect.right,
                        top: rect.top,
                        bottom: rect.bottom
                    });
                }, config.delay);
            });
            return _this;
        }
        Composed.prototype.componentDidMount = function () {
            var _this = this;
            setTimeout(function () { return _this.calcRect(); });
            window.addEventListener('resize', this.calcRect);
            window.addEventListener('resize-custom', this.calcRect);
        };
        Composed.prototype.componentWillUnmount = function () {
            window.removeEventListener('resize', this.calcRect);
            window.removeEventListener('resize-custom', this.calcRect);
        };
        Composed.prototype.render = function () {
            return <Component {...this.props} clientRect={__assign({}, this.state)}/>;
        };
        Composed.displayName = "withBoundingRect<" + (Component.displayName || Component.name || 'Unknown') + ">";
        return Composed;
    }(react_1["default"].Component));
    return Composed;
}
function withBoundingRect(config) {
    if (config === void 0) { config = {}; }
    return function (Component) { return hocWithConfig(Component, Object.assign({}, defaultConfig, config)); };
}
exports.withBoundingRect = withBoundingRect;
