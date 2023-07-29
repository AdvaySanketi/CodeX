'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Function = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _definition = require('./definition');

var _types = require('../types/types');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Function = exports.Function = function (_Definition) {
    _inherits(Function, _Definition);

    function Function(name) {
        var parameters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        var returnType = arguments[2];
        var body = arguments[3];
        var override = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
        var isPrivate = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

        _classCallCheck(this, Function);

        var _this = _possibleConstructorReturn(this, (Function.__proto__ || Object.getPrototypeOf(Function)).call(this));

        _this.name = name;
        _this.parameters = parameters;
        _this.returnType = returnType;
        _this.body = body;
        _this.override = override;
        _this.isPrivate = isPrivate;
        return _this;
    }

    _createClass(Function, [{
        key: 'isFunction',
        value: function isFunction() {
            return true;
        }
    }, {
        key: 'equals',
        value: function equals(method) {
            if (this.name !== method.name) {
                return false;
            }

            if (this.parameters.length !== method.parameters.length) {
                return false;
            }

            for (var i = 0, length = this.parameters.length; i < length; ++i) {
                if (this.parameters[i].type !== method.parameters[i].type) {
                    return false;
                }
            }

            if (this.returnType !== method.returnType) {
                return false;
            }

            return true;
        }
    }, {
        key: 'signature',
        value: function signature() {
            var sign = this.name + '(';
            var parametersCount = this.parameters.length;

            if (parametersCount > 0) {
                sign += this.parameters[0].identifier + ': ' + this.parameters[0].type;

                for (var i = 1; i < parametersCount; ++i) {
                    sign += ', ' + this.parameters[i].identifier + ': ' + this.parameters[i].type;
                }
            }

            sign += ')';

            if (this.returnType !== _types.Types.Unit) {
                sign += ': ' + this.returnType;
            }

            return sign;
        }
    }]);

    return Function;
}(_definition.Definition);
//# sourceMappingURL=func.js.map