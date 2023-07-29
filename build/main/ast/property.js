'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Property = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _definition = require('./definition');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Property = exports.Property = function (_Definition) {
    _inherits(Property, _Definition);

    function Property(name, type, value) {
        _classCallCheck(this, Property);

        var _this = _possibleConstructorReturn(this, (Property.__proto__ || Object.getPrototypeOf(Property)).call(this));

        _this.name = name;
        _this.type = type;
        _this.value = value;
        return _this;
    }

    _createClass(Property, [{
        key: 'isProperty',
        value: function isProperty() {
            return true;
        }
    }]);

    return Property;
}(_definition.Definition);
//# sourceMappingURL=property.js.map