'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Assignment = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _expression = require('./expression');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Assignment = exports.Assignment = function (_Expression) {
    _inherits(Assignment, _Expression);

    function Assignment(identifier, operator, value) {
        _classCallCheck(this, Assignment);

        var _this = _possibleConstructorReturn(this, (Assignment.__proto__ || Object.getPrototypeOf(Assignment)).call(this));

        _this.identifier = identifier;
        _this.operator = operator;
        _this.value = value;
        return _this;
    }

    _createClass(Assignment, [{
        key: 'isAssignment',
        value: function isAssignment() {
            return true;
        }
    }]);

    return Assignment;
}(_expression.Expression);
//# sourceMappingURL=assignment.js.map