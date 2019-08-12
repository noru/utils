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
exports.__esModule = true;
var react_1 = require("react");
var func_1 = require("../../func");
function hocWithConfig(Component, effect) {
    var Composed = /** @class */ (function (_super) {
        __extends(Composed, _super);
        function Composed() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.teardown = func_1.noop;
            return _this;
        }
        Composed.prototype.componentDidMount = function () {
            this.teardown = effect();
        };
        Composed.prototype.componentWillUnmount = function () {
            this.teardown();
        };
        Composed.prototype.render = function () {
            return <Component {...this.props}/>;
        };
        Composed.displayName = "withEffect<" + (Component.displayName || Component.name || 'Unknown') + ">";
        return Composed;
    }(react_1["default"].Component));
    return Composed;
}
function withEffect(effect) {
    return function (Component) { return hocWithConfig(Component, effect); };
}
exports.withEffect = withEffect;
