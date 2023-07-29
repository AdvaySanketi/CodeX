'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LazyExpression = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _expression = require('./expression');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LazyExpression = exports.LazyExpression = function (_Expression) {
    _inherits(LazyExpression, _Expression);

    function LazyExpression(expression, context) {
        _classCallCheck(this, LazyExpression);

        var _this = _possibleConstructorReturn(this, (LazyExpression.__proto__ || Object.getPrototypeOf(LazyExpression)).call(this));

        _this.expression = expression;
        _this.context = context;
        return _this;
    }

    _createClass(LazyExpression, [{
        key: 'isLazy',
        value: function isLazy() {
            return true;
        }
    }]);

    return LazyExpression;
}(_expression.Expression);
//# sourceMappingURL=lazyexpression.js.map