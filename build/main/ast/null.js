'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NullLiteral = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _expression = require('./expression');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NullLiteral = exports.NullLiteral = function (_Expression) {
    _inherits(NullLiteral, _Expression);

    function NullLiteral() {
        _classCallCheck(this, NullLiteral);

        return _possibleConstructorReturn(this, (NullLiteral.__proto__ || Object.getPrototypeOf(NullLiteral)).call(this));
    }

    _createClass(NullLiteral, [{
        key: 'isNullLiteral',
        value: function isNullLiteral() {
            return true;
        }
    }]);

    return NullLiteral;
}(_expression.Expression);
//# sourceMappingURL=null.js.map