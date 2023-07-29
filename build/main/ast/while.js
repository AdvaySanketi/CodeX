'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.While = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _expression = require('./expression');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var While = exports.While = function (_Expression) {
    _inherits(While, _Expression);

    function While(condition, body) {
        _classCallCheck(this, While);

        var _this = _possibleConstructorReturn(this, (While.__proto__ || Object.getPrototypeOf(While)).call(this));

        _this.condition = condition;
        _this.body = body;
        return _this;
    }

    _createClass(While, [{
        key: 'isWhile',
        value: function isWhile() {
            return true;
        }
    }]);

    return While;
}(_expression.Expression);
//# sourceMappingURL=while.js.map