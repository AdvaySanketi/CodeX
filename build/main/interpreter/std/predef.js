'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PredefClass = undefined;

var _class = require('../../ast/class');

var _evaluator = require('../../interpreter/evaluator');

var _formal = require('../../ast/formal');

var _func = require('../../ast/func');

var _functioncall = require('../../ast/functioncall');

var _nativeexpression = require('../../ast/nativeexpression');

var _object = require('../../interpreter/object');

var _reference = require('../../ast/reference');

var _types = require('../../types/types');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PredefClass = exports.PredefClass = function (_Class) {
    _inherits(PredefClass, _Class);

    function PredefClass() {
        _classCallCheck(this, PredefClass);

        var _this = _possibleConstructorReturn(this, (PredefClass.__proto__ || Object.getPrototypeOf(PredefClass)).call(this));

        _this.name = _types.Types.Predef;

        _this.superClass = _types.Types.Object;

        _this.functions.push(new _func.Function('toString', [], _types.Types.String, new _nativeexpression.NativeExpression(function (context) {
            var value = _object.Obj.create(context, _types.Types.String);

            value.set('value', '__predef__');

            return value;
        }), true));
        return _this;
    }

    return PredefClass;
}(_class.Class);
//# sourceMappingURL=predef.js.map