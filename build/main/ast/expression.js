'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Expression = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _astnode = require('./astnode');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Expression = exports.Expression = function (_AstNode) {
    _inherits(Expression, _AstNode);

    function Expression() {
        _classCallCheck(this, Expression);

        var _this = _possibleConstructorReturn(this, (Expression.__proto__ || Object.getPrototypeOf(Expression)).call(this));

        _this.line = -1;
        _this.column = -1;
        _this.expressionType = undefined;
        return _this;
    }

    _createClass(Expression, [{
        key: 'hasType',
        value: function hasType() {
            return this.expressionType !== undefined;
        }
    }, {
        key: 'isExpression',
        value: function isExpression() {
            return true;
        }
    }, {
        key: 'isAssignment',
        value: function isAssignment() {
            return false;
        }
    }, {
        key: 'isBinaryExpression',
        value: function isBinaryExpression() {
            return false;
        }
    }, {
        key: 'isBlock',
        value: function isBlock() {
            return false;
        }
    }, {
        key: 'isBooleanLiteral',
        value: function isBooleanLiteral() {
            return false;
        }
    }, {
        key: 'isCast',
        value: function isCast() {
            return false;
        }
    }, {
        key: 'isConstructorCall',
        value: function isConstructorCall() {
            return false;
        }
    }, {
        key: 'isDecimalLiteral',
        value: function isDecimalLiteral() {
            return false;
        }
    }, {
        key: 'isFunctionCall',
        value: function isFunctionCall() {
            return false;
        }
    }, {
        key: 'isIfElse',
        value: function isIfElse() {
            return false;
        }
    }, {
        key: 'isInitialization',
        value: function isInitialization() {
            return false;
        }
    }, {
        key: 'isIntegerLiteral',
        value: function isIntegerLiteral() {
            return false;
        }
    }, {
        key: 'isLazy',
        value: function isLazy() {
            return false;
        }
    }, {
        key: 'isLet',
        value: function isLet() {
            return false;
        }
    }, {
        key: 'isNative',
        value: function isNative() {
            return false;
        }
    }, {
        key: 'isNullLiteral',
        value: function isNullLiteral() {
            return false;
        }
    }, {
        key: 'isReference',
        value: function isReference() {
            return false;
        }
    }, {
        key: 'isStringLiteral',
        value: function isStringLiteral() {
            return false;
        }
    }, {
        key: 'isSuper',
        value: function isSuper() {
            return false;
        }
    }, {
        key: 'isThis',
        value: function isThis() {
            return false;
        }
    }, {
        key: 'isUnaryExpression',
        value: function isUnaryExpression() {
            return false;
        }
    }, {
        key: 'isWhile',
        value: function isWhile() {
            return false;
        }
    }]);

    return Expression;
}(_astnode.AstNode);
//# sourceMappingURL=expression.js.map