'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SuperFunctionCall = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _expression = require('./expression');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SuperFunctionCall = exports.SuperFunctionCall = function (_Expression) {
    _inherits(SuperFunctionCall, _Expression);

    function SuperFunctionCall(functionName) {
        var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

        _classCallCheck(this, SuperFunctionCall);

        var _this = _possibleConstructorReturn(this, (SuperFunctionCall.__proto__ || Object.getPrototypeOf(SuperFunctionCall)).call(this));

        _this.functionName = functionName;
        _this.args = args;
        return _this;
    }

    _createClass(SuperFunctionCall, [{
        key: 'isSuper',
        value: function isSuper() {
            return true;
        }
    }]);

    return SuperFunctionCall;
}(_expression.Expression);
//# sourceMappingURL=superfunctioncall.js.map