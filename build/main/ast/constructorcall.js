'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ConstructorCall = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _expression = require('./expression');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ConstructorCall = exports.ConstructorCall = function (_Expression) {
    _inherits(ConstructorCall, _Expression);

    function ConstructorCall(type) {
        var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

        _classCallCheck(this, ConstructorCall);

        var _this = _possibleConstructorReturn(this, (ConstructorCall.__proto__ || Object.getPrototypeOf(ConstructorCall)).call(this));

        _this.type = type;
        _this.args = args;
        return _this;
    }

    _createClass(ConstructorCall, [{
        key: 'isConstructorCall',
        value: function isConstructorCall() {
            return true;
        }
    }]);

    return ConstructorCall;
}(_expression.Expression);
//# sourceMappingURL=constructorcall.js.map