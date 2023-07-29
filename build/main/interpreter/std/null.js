'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NullClass = undefined;

var _class = require('../../ast/class');

var _formal = require('../../ast/formal');

var _func = require('../../ast/func');

var _nativeexpression = require('../../ast/nativeexpression');

var _object = require('../object');

var _types = require('../../types/types');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NullClass = exports.NullClass = function (_Class) {
    _inherits(NullClass, _Class);

    function NullClass() {
        _classCallCheck(this, NullClass);

        var _this = _possibleConstructorReturn(this, (NullClass.__proto__ || Object.getPrototypeOf(NullClass)).call(this));

        _this.name = _types.Types.Null;

        _this.functions.push(new _func.Function('toString', [], _types.Types.String, new _nativeexpression.NativeExpression(function (context) {
            var value = _object.Obj.create(context, _types.Types.String);

            value.set('value', 'null');

            return value;
        }), true));

        _this.functions.push(new _func.Function('==', [new _formal.Formal('rhs', _types.Types.Object)], _types.Types.Bool, new _nativeexpression.NativeExpression(function (context) {
            var value = _object.Obj.create(context, _types.Types.Bool);

            value.set('value', context.store.get(context.environment.find('rhs')).type === _types.Types.Null);

            return value;
        })));

        _this.functions.push(new _func.Function('!=', [new _formal.Formal('rhs', _types.Types.Object)], _types.Types.Bool, new _nativeexpression.NativeExpression(function (context) {
            var value = _object.Obj.create(context, _types.Types.Bool);

            value.set('value', context.store.get(context.environment.find('rhs')).type !== _types.Types.Null);

            return value;
        })));
        return _this;
    }

    return NullClass;
}(_class.Class);
//# sourceMappingURL=null.js.map