'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Definition = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _astnode = require('./astnode');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Definition = exports.Definition = function (_AstNode) {
    _inherits(Definition, _AstNode);

    function Definition() {
        _classCallCheck(this, Definition);

        var _this = _possibleConstructorReturn(this, (Definition.__proto__ || Object.getPrototypeOf(Definition)).call(this));

        _this.line = -1;
        _this.column = -1;
        return _this;
    }

    _createClass(Definition, [{
        key: 'isDefinition',
        value: function isDefinition() {
            return true;
        }
    }, {
        key: 'isClass',
        value: function isClass() {
            return false;
        }
    }, {
        key: 'isProperty',
        value: function isProperty() {
            return false;
        }
    }, {
        key: 'isFunction',
        value: function isFunction() {
            return false;
        }
    }]);

    return Definition;
}(_astnode.AstNode);
//# sourceMappingURL=definition.js.map