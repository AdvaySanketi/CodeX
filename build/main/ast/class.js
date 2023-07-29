'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Class = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _definition = require('./definition');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Class = exports.Class = function (_Definition) {
    _inherits(Class, _Definition);

    function Class(name) {
        var parameters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        var superClass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
        var superClassArgs = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
        var properties = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
        var functions = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [];

        _classCallCheck(this, Class);

        var _this = _possibleConstructorReturn(this, (Class.__proto__ || Object.getPrototypeOf(Class)).call(this));

        _this.name = name;
        _this.parameters = parameters;
        _this.superClass = superClass;
        _this.superClassArgs = superClassArgs;
        _this.properties = properties;
        _this.functions = functions;
        return _this;
    }

    _createClass(Class, [{
        key: 'isClass',
        value: function isClass() {
            return true;
        }
    }, {
        key: 'hasProperty',
        value: function hasProperty(propertyName) {
            return this.properties.some(function (property) {
                return property.name === propertyName;
            });
        }
    }, {
        key: 'getProperty',
        value: function getProperty(propertyName) {
            return this.properties.find(function (property) {
                return property.name === propertyName;
            });
        }
    }, {
        key: 'hasFunctionWithName',
        value: function hasFunctionWithName(functionName) {
            return this.functions.some(function (func) {
                return func.name === functionName;
            });
        }
    }]);

    return Class;
}(_definition.Definition);
//# sourceMappingURL=class.js.map