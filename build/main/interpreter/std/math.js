'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MathClass = undefined;

var _class = require('../../ast/class');

var _formal = require('../../ast/formal');

var _func = require('../../ast/func');

var _nativeexpression = require('../../ast/nativeexpression');

var _object = require('../../interpreter/object');

var _types = require('../../types/types');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MathClass = exports.MathClass = function (_Class) {
    _inherits(MathClass, _Class);

    function MathClass() {
        _classCallCheck(this, MathClass);

        var _this = _possibleConstructorReturn(this, (MathClass.__proto__ || Object.getPrototypeOf(MathClass)).call(this));

        _this.name = _types.Types.Math;

        _this.superClass = _types.Types.Object;

        _this.functions.push(new _func.Function('e', [], _types.Types.Double, new _nativeexpression.NativeExpression(function (context) {
            var value = _object.Obj.create(context, _types.Types.Double);

            value.set('value', Math.E);

            return value;
        })));

        _this.functions.push(new _func.Function('ln2', [], _types.Types.Double, new _nativeexpression.NativeExpression(function (context) {
            var value = _object.Obj.create(context, _types.Types.Double);

            value.set('value', Math.LN2);

            return value;
        })));

        _this.functions.push(new _func.Function('ln10', [], _types.Types.Double, new _nativeexpression.NativeExpression(function (context) {
            var value = _object.Obj.create(context, _types.Types.Double);

            value.set('value', Math.LN10);

            return value;
        })));

        _this.functions.push(new _func.Function('log2e', [], _types.Types.Double, new _nativeexpression.NativeExpression(function (context) {
            var value = _object.Obj.create(context, _types.Types.Double);

            value.set('value', Math.LOG2E);

            return value;
        })));

        _this.functions.push(new _func.Function('log10e', [], _types.Types.Double, new _nativeexpression.NativeExpression(function (context) {
            var value = _object.Obj.create(context, _types.Types.Double);

            value.set('value', Math.LOG10E);

            return value;
        })));

        _this.functions.push(new _func.Function('pi', [], _types.Types.Double, new _nativeexpression.NativeExpression(function (context) {
            var value = _object.Obj.create(context, _types.Types.Double);

            value.set('value', Math.PI);

            return value;
        })));

        _this.functions.push(new _func.Function('abs', [new _formal.Formal('x', _types.Types.Int)], _types.Types.Int, new _nativeexpression.NativeExpression(function (context) {
            var x = context.store.get(context.environment.find('x'));

            var value = _object.Obj.create(context, _types.Types.Int);

            value.set('value', Math.abs(x.get('value')));

            return value;
        })));

        _this.functions.push(new _func.Function('abs', [new _formal.Formal('x', _types.Types.Double)], _types.Types.Double, new _nativeexpression.NativeExpression(function (context) {
            var x = context.store.get(context.environment.find('x'));

            var value = _object.Obj.create(context, _types.Types.Double);

            value.set('value', Math.abs(x.get('value')));

            return value;
        })));

        _this.functions.push(new _func.Function('acos', [new _formal.Formal('x', _types.Types.Int)], _types.Types.Int, new _nativeexpression.NativeExpression(function (context) {
            var x = context.store.get(context.environment.find('x'));

            var value = _object.Obj.create(context, _types.Types.Int);

            value.set('value', Math.acos(x.get('value')));

            return value;
        })));

        _this.functions.push(new _func.Function('acos', [new _formal.Formal('x', _types.Types.Double)], _types.Types.Double, new _nativeexpression.NativeExpression(function (context) {
            var x = context.store.get(context.environment.find('x'));

            var value = _object.Obj.create(context, _types.Types.Double);

            value.set('value', Math.acos(x.get('value')));

            return value;
        })));

        _this.functions.push(new _func.Function('acosh', [new _formal.Formal('x', _types.Types.Int)], _types.Types.Int, new _nativeexpression.NativeExpression(function (context) {
            var x = context.store.get(context.environment.find('x'));

            var value = _object.Obj.create(context, _types.Types.Int);

            value.set('value', Math.acosh(x.get('value')));

            return value;
        })));

        _this.functions.push(new _func.Function('acosh', [new _formal.Formal('x', _types.Types.Double)], _types.Types.Double, new _nativeexpression.NativeExpression(function (context) {
            var x = context.store.get(context.environment.find('x'));

            var value = _object.Obj.create(context, _types.Types.Double);

            value.set('value', Math.acosh(x.get('value')));

            return value;
        })));

        _this.functions.push(new _func.Function('asin', [new _formal.Formal('x', _types.Types.Int)], _types.Types.Int, new _nativeexpression.NativeExpression(function (context) {
            var x = context.store.get(context.environment.find('x'));

            var value = _object.Obj.create(context, _types.Types.Int);

            value.set('value', Math.asin(x.get('value')));

            return value;
        })));

        _this.functions.push(new _func.Function('asin', [new _formal.Formal('x', _types.Types.Double)], _types.Types.Double, new _nativeexpression.NativeExpression(function (context) {
            var x = context.store.get(context.environment.find('x'));

            var value = _object.Obj.create(context, _types.Types.Double);

            value.set('value', Math.asin(x.get('value')));

            return value;
        })));

        _this.functions.push(new _func.Function('asinh', [new _formal.Formal('x', _types.Types.Int)], _types.Types.Int, new _nativeexpression.NativeExpression(function (context) {
            var x = context.store.get(context.environment.find('x'));

            var value = _object.Obj.create(context, _types.Types.Int);

            value.set('value', Math.asinh(x.get('value')));

            return value;
        })));

        _this.functions.push(new _func.Function('asinh', [new _formal.Formal('x', _types.Types.Double)], _types.Types.Double, new _nativeexpression.NativeExpression(function (context) {
            var x = context.store.get(context.environment.find('x'));

            var value = _object.Obj.create(context, _types.Types.Double);

            value.set('value', Math.asinh(x.get('value')));

            return value;
        })));

        _this.functions.push(new _func.Function('atan', [new _formal.Formal('x', _types.Types.Int)], _types.Types.Int, new _nativeexpression.NativeExpression(function (context) {
            var x = context.store.get(context.environment.find('x'));

            var value = _object.Obj.create(context, _types.Types.Int);

            value.set('value', Math.atan(x.get('value')));

            return value;
        })));

        _this.functions.push(new _func.Function('atan', [new _formal.Formal('x', _types.Types.Double)], _types.Types.Double, new _nativeexpression.NativeExpression(function (context) {
            var x = context.store.get(context.environment.find('x'));

            var value = _object.Obj.create(context, _types.Types.Double);

            value.set('value', Math.atan(x.get('value')));

            return value;
        })));

        _this.functions.push(new _func.Function('atanh', [new _formal.Formal('x', _types.Types.Int)], _types.Types.Int, new _nativeexpression.NativeExpression(function (context) {
            var x = context.store.get(context.environment.find('x'));

            var value = _object.Obj.create(context, _types.Types.Int);

            value.set('value', Math.atan(x.get('value')));

            return value;
        })));

        _this.functions.push(new _func.Function('atanh', [new _formal.Formal('x', _types.Types.Double)], _types.Types.Double, new _nativeexpression.NativeExpression(function (context) {
            var x = context.store.get(context.environment.find('x'));

            var value = _object.Obj.create(context, _types.Types.Double);

            value.set('value', Math.atan(x.get('value')));

            return value;
        })));

        _this.functions.push(new _func.Function('cos', [new _formal.Formal('x', _types.Types.Int)], _types.Types.Int, new _nativeexpression.NativeExpression(function (context) {
            var x = context.store.get(context.environment.find('x'));

            var value = _object.Obj.create(context, _types.Types.Int);

            value.set('value', Math.cos(x.get('value')));

            return value;
        })));

        _this.functions.push(new _func.Function('cos', [new _formal.Formal('x', _types.Types.Double)], _types.Types.Double, new _nativeexpression.NativeExpression(function (context) {
            var x = context.store.get(context.environment.find('x'));

            var value = _object.Obj.create(context, _types.Types.Double);

            value.set('value', Math.cos(x.get('value')));

            return value;
        })));

        _this.functions.push(new _func.Function('cosh', [new _formal.Formal('x', _types.Types.Int)], _types.Types.Int, new _nativeexpression.NativeExpression(function (context) {
            var x = context.store.get(context.environment.find('x'));

            var value = _object.Obj.create(context, _types.Types.Int);

            value.set('value', Math.cosh(x.get('value')));

            return value;
        })));

        _this.functions.push(new _func.Function('ceil', [new _formal.Formal('x', _types.Types.Double)], _types.Types.Int, new _nativeexpression.NativeExpression(function (context) {
            var x = context.store.get(context.environment.find('x'));

            var value = _object.Obj.create(context, _types.Types.Int);

            value.set('value', Math.ceil(x.get('value')));

            return value;
        })));

        _this.functions.push(new _func.Function('floor', [new _formal.Formal('x', _types.Types.Double)], _types.Types.Int, new _nativeexpression.NativeExpression(function (context) {
            var x = context.store.get(context.environment.find('x'));

            var value = _object.Obj.create(context, _types.Types.Int);

            value.set('value', Math.floor(x.get('value')));

            return value;
        })));

        _this.functions.push(new _func.Function('log', [new _formal.Formal('x', _types.Types.Int)], _types.Types.Double, new _nativeexpression.NativeExpression(function (context) {
            var x = context.store.get(context.environment.find('x'));

            var value = _object.Obj.create(context, _types.Types.Double);

            value.set('value', Math.log(x.get('value')));

            return value;
        })));

        _this.functions.push(new _func.Function('log', [new _formal.Formal('x', _types.Types.Double)], _types.Types.Double, new _nativeexpression.NativeExpression(function (context) {
            var x = context.store.get(context.environment.find('x'));

            var value = _object.Obj.create(context, _types.Types.Double);

            value.set('value', Math.log(x.get('value')));

            return value;
        })));

        _this.functions.push(new _func.Function('log2', [new _formal.Formal('x', _types.Types.Int)], _types.Types.Double, new _nativeexpression.NativeExpression(function (context) {
            var x = context.store.get(context.environment.find('x'));

            var value = _object.Obj.create(context, _types.Types.Double);

            value.set('value', Math.log2(x.get('value')));

            return value;
        })));

        _this.functions.push(new _func.Function('log2', [new _formal.Formal('x', _types.Types.Double)], _types.Types.Double, new _nativeexpression.NativeExpression(function (context) {
            var x = context.store.get(context.environment.find('x'));

            var value = _object.Obj.create(context, _types.Types.Double);

            value.set('value', Math.log2(x.get('value')));

            return value;
        })));

        _this.functions.push(new _func.Function('log10', [new _formal.Formal('x', _types.Types.Int)], _types.Types.Double, new _nativeexpression.NativeExpression(function (context) {
            var x = context.store.get(context.environment.find('x'));

            var value = _object.Obj.create(context, _types.Types.Double);

            value.set('value', Math.log10(x.get('value')));

            return value;
        })));

        _this.functions.push(new _func.Function('log10', [new _formal.Formal('x', _types.Types.Double)], _types.Types.Double, new _nativeexpression.NativeExpression(function (context) {
            var x = context.store.get(context.environment.find('x'));

            var value = _object.Obj.create(context, _types.Types.Double);

            value.set('value', Math.log10(x.get('value')));

            return value;
        })));

        _this.functions.push(new _func.Function('max', [new _formal.Formal('x', _types.Types.Int), new _formal.Formal('y', _types.Types.Int)], _types.Types.Int, new _nativeexpression.NativeExpression(function (context) {
            var x = context.store.get(context.environment.find('x'));
            var y = context.store.get(context.environment.find('y'));

            var value = _object.Obj.create(context, _types.Types.Int);

            value.set('value', Math.max(x.get('value'), y.get('value')));

            return value;
        })));

        _this.functions.push(new _func.Function('max', [new _formal.Formal('x', _types.Types.Double), new _formal.Formal('y', _types.Types.Double)], _types.Types.Int, new _nativeexpression.NativeExpression(function (context) {
            var x = context.store.get(context.environment.find('x'));
            var y = context.store.get(context.environment.find('y'));

            var value = _object.Obj.create(context, _types.Types.Double);

            value.set('value', Math.max(x.get('value'), y.get('value')));

            return value;
        })));

        _this.functions.push(new _func.Function('min', [new _formal.Formal('x', _types.Types.Int), new _formal.Formal('y', _types.Types.Int)], _types.Types.Int, new _nativeexpression.NativeExpression(function (context) {
            var x = context.store.get(context.environment.find('x'));
            var y = context.store.get(context.environment.find('y'));

            var value = _object.Obj.create(context, _types.Types.Int);

            value.set('value', Math.min(x.get('value'), y.get('value')));

            return value;
        })));

        _this.functions.push(new _func.Function('min', [new _formal.Formal('x', _types.Types.Double), new _formal.Formal('y', _types.Types.Double)], _types.Types.Int, new _nativeexpression.NativeExpression(function (context) {
            var x = context.store.get(context.environment.find('x'));
            var y = context.store.get(context.environment.find('y'));

            var value = _object.Obj.create(context, _types.Types.Double);

            value.set('value', Math.min(x.get('value'), y.get('value')));

            return value;
        })));

        _this.functions.push(new _func.Function('pow', [new _formal.Formal('x', _types.Types.Int), new _formal.Formal('y', _types.Types.Int)], _types.Types.Int, new _nativeexpression.NativeExpression(function (context) {
            var x = context.store.get(context.environment.find('x'));
            var y = context.store.get(context.environment.find('y'));

            var value = _object.Obj.create(context, _types.Types.Int);

            value.set('value', Math.pow(x.get('value'), y.get('value')));

            return value;
        })));

        _this.functions.push(new _func.Function('pow', [new _formal.Formal('x', _types.Types.Double), new _formal.Formal('y', _types.Types.Double)], _types.Types.Int, new _nativeexpression.NativeExpression(function (context) {
            var x = context.store.get(context.environment.find('x'));
            var y = context.store.get(context.environment.find('y'));

            var value = _object.Obj.create(context, _types.Types.Double);

            value.set('value', Math.pow(x.get('value'), y.get('value')));

            return value;
        })));

        _this.functions.push(new _func.Function('random', [], _types.Types.Double, new _nativeexpression.NativeExpression(function (context) {
            var value = _object.Obj.create(context, _types.Types.Double);

            value.set('value', Math.random());

            return value;
        })));

        _this.functions.push(new _func.Function('random', [new _formal.Formal('min', _types.Types.Int), new _formal.Formal('max', _types.Types.Int)], _types.Types.Int, new _nativeexpression.NativeExpression(function (context) {
            var min = context.store.get(context.environment.find('min')).get('value');
            var max = context.store.get(context.environment.find('max')).get('value');

            var value = _object.Obj.create(context, _types.Types.Int);

            value.set('value', Math.floor(Math.random() * (max - min + 1) + min));

            return value;
        })));

        _this.functions.push(new _func.Function('round', [new _formal.Formal('x', _types.Types.Double)], _types.Types.Int, new _nativeexpression.NativeExpression(function (context) {
            var x = context.store.get(context.environment.find('x'));

            var value = _object.Obj.create(context, _types.Types.Int);

            value.set('value', Math.round(x.get('value')));

            return value;
        })));

        _this.functions.push(new _func.Function('sqrt', [new _formal.Formal('x', _types.Types.Int)], _types.Types.Double, new _nativeexpression.NativeExpression(function (context) {
            var x = context.store.get(context.environment.find('x'));

            var value = _object.Obj.create(context, _types.Types.Double);

            value.set('value', Math.sqrt(x.get('value')));

            return value;
        })));

        _this.functions.push(new _func.Function('sqrt', [new _formal.Formal('x', _types.Types.Double)], _types.Types.Double, new _nativeexpression.NativeExpression(function (context) {
            var x = context.store.get(context.environment.find('x'));

            var value = _object.Obj.create(context, _types.Types.Double);

            value.set('value', Math.sqrt(x.get('value')));

            return value;
        })));

        _this.functions.push(new _func.Function('sin', [new _formal.Formal('x', _types.Types.Int)], _types.Types.Double, new _nativeexpression.NativeExpression(function (context) {
            var x = context.store.get(context.environment.find('x'));

            var value = _object.Obj.create(context, _types.Types.Double);

            value.set('value', Math.sin(x.get('value')));

            return value;
        })));

        _this.functions.push(new _func.Function('sin', [new _formal.Formal('x', _types.Types.Double)], _types.Types.Double, new _nativeexpression.NativeExpression(function (context) {
            var x = context.store.get(context.environment.find('x'));

            var value = _object.Obj.create(context, _types.Types.Double);

            value.set('value', Math.sin(x.get('value')));

            return value;
        })));

        _this.functions.push(new _func.Function('trunc', [new _formal.Formal('x', _types.Types.Double)], _types.Types.Int, new _nativeexpression.NativeExpression(function (context) {
            var x = context.store.get(context.environment.find('x'));

            var value = _object.Obj.create(context, _types.Types.Int);

            value.set('value', Math.trunc(x.get('value')));

            return value;
        })));
        return _this;
    }

    return MathClass;
}(_class.Class);
//# sourceMappingURL=math.js.map