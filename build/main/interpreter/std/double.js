'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DoubleClass = undefined;

var _class = require('../../ast/class');

var _formal = require('../../ast/formal');

var _func = require('../../ast/func');

var _nativeexpression = require('../../ast/nativeexpression');

var _object = require('../../interpreter/object');

var _types = require('../../types/types');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DoubleClass = exports.DoubleClass = function (_Class) {
    _inherits(DoubleClass, _Class);

    function DoubleClass() {
        _classCallCheck(this, DoubleClass);

        var _this = _possibleConstructorReturn(this, (DoubleClass.__proto__ || Object.getPrototypeOf(DoubleClass)).call(this));

        _this.name = _types.Types.Double;

        _this.superClass = _types.Types.Object;

        _this.properties.push(new _formal.Formal('value', 'double'));

        _this.functions.push(new _func.Function('toString', [], _types.Types.String, new _nativeexpression.NativeExpression(function (context) {
            var value = _object.Obj.create(context, _types.Types.String);

            value.set('value', context.self.get('value').toString());

            return value;
        }), true));

        _this.functions.push(new _func.Function('==', [new _formal.Formal('rhs', _types.Types.Object)], _types.Types.Bool, new _nativeexpression.NativeExpression(function (context) {
            var rhs = context.store.get(context.environment.find('rhs'));
            var lhs = context.self;

            var value = _object.Obj.create(context, _types.Types.Bool);

            if (rhs.type !== _types.Types.Int && rhs.type !== _types.Types.Double) {
                value.set('value', false);;
            } else {
                value.set('value', lhs.get('value') === rhs.get('value'));
            }

            return value;
        }), true));

        _this.functions.push(new _func.Function('unary_-', [], _types.Types.Double, new _nativeexpression.NativeExpression(function (context) {
            var value = _object.Obj.create(context, _types.Types.Double);

            value.set('value', -context.self.get('value'));

            return value;
        })));

        _this.functions.push(new _func.Function('+', [new _formal.Formal('rhs', _types.Types.Double)], _types.Types.Double, new _nativeexpression.NativeExpression(function (context) {
            var rhs = context.store.get(context.environment.find('rhs'));
            var lhs = context.self;

            var result = _object.Obj.create(context, _types.Types.Double);
            result.set('value', lhs.get('value') + rhs.get('value'));

            return result;
        })));

        _this.functions.push(new _func.Function('+', [new _formal.Formal('rhs', _types.Types.Int)], _types.Types.Double, new _nativeexpression.NativeExpression(function (context) {
            var rhs = context.store.get(context.environment.find('rhs'));
            var lhs = context.self;

            var result = _object.Obj.create(context, _types.Types.Double);
            result.set('value', lhs.get('value') + rhs.get('value'));

            return result;
        })));

        _this.functions.push(new _func.Function('-', [new _formal.Formal('rhs', _types.Types.Double)], _types.Types.Double, new _nativeexpression.NativeExpression(function (context) {
            var rhs = context.store.get(context.environment.find('rhs'));
            var lhs = context.self;

            var result = _object.Obj.create(context, _types.Types.Double);
            result.set('value', lhs.get('value') - rhs.get('value'));

            return result;
        })));

        _this.functions.push(new _func.Function('-', [new _formal.Formal('rhs', _types.Types.Int)], _types.Types.Double, new _nativeexpression.NativeExpression(function (context) {
            var rhs = context.store.get(context.environment.find('rhs'));
            var lhs = context.self;

            var result = _object.Obj.create(context, _types.Types.Double);
            result.set('value', lhs.get('value') - rhs.get('value'));

            return result;
        })));

        _this.functions.push(new _func.Function('*', [new _formal.Formal('rhs', _types.Types.Double)], _types.Types.Double, new _nativeexpression.NativeExpression(function (context) {
            var rhs = context.store.get(context.environment.find('rhs'));
            var lhs = context.self;

            var result = _object.Obj.create(context, _types.Types.Double);
            result.set('value', lhs.get('value') * rhs.get('value'));

            return result;
        })));

        _this.functions.push(new _func.Function('*', [new _formal.Formal('rhs', _types.Types.Int)], _types.Types.Double, new _nativeexpression.NativeExpression(function (context) {
            var rhs = context.store.get(context.environment.find('rhs'));
            var lhs = context.self;

            var result = _object.Obj.create(context, _types.Types.Double);
            result.set('value', lhs.get('value') * rhs.get('value'));

            return result;
        })));

        _this.functions.push(new _func.Function('/', [new _formal.Formal('rhs', _types.Types.Double)], _types.Types.Double, new _nativeexpression.NativeExpression(function (context) {
            var rhs = context.store.get(context.environment.find('rhs'));
            var lhs = context.self;

            var result = _object.Obj.create(context, _types.Types.Double);
            result.set('value', lhs.get('value') / rhs.get('value'));

            return result;
        })));

        _this.functions.push(new _func.Function('/', [new _formal.Formal('rhs', _types.Types.Int)], _types.Types.Double, new _nativeexpression.NativeExpression(function (context) {
            var rhs = context.store.get(context.environment.find('rhs'));
            var lhs = context.self;

            var result = _object.Obj.create(context, _types.Types.Double);
            result.set('value', lhs.get('value') / rhs.get('value'));

            return result;
        })));

        _this.functions.push(new _func.Function('%', [new _formal.Formal('rhs', _types.Types.Double)], _types.Types.Double, new _nativeexpression.NativeExpression(function (context) {
            var rhs = context.store.get(context.environment.find('rhs'));
            var lhs = context.self;

            var result = _object.Obj.create(context, _types.Types.Double);
            result.set('value', lhs.get('value') % rhs.get('value'));

            return result;
        })));

        _this.functions.push(new _func.Function('%', [new _formal.Formal('rhs', _types.Types.Int)], _types.Types.Double, new _nativeexpression.NativeExpression(function (context) {
            var rhs = context.store.get(context.environment.find('rhs'));
            var lhs = context.self;

            var result = _object.Obj.create(context, _types.Types.Double);
            result.set('value', lhs.get('value') % rhs.get('value'));

            return result;
        })));

        _this.functions.push(new _func.Function('>', [new _formal.Formal('rhs', _types.Types.Double)], _types.Types.Bool, new _nativeexpression.NativeExpression(function (context) {
            var rhs = context.store.get(context.environment.find('rhs'));
            var lhs = context.self;

            var result = _object.Obj.create(context, _types.Types.Bool);
            result.set('value', lhs.get('value') > rhs.get('value'));

            return result;
        })));

        _this.functions.push(new _func.Function('>', [new _formal.Formal('rhs', _types.Types.Int)], _types.Types.Bool, new _nativeexpression.NativeExpression(function (context) {
            var rhs = context.store.get(context.environment.find('rhs'));
            var lhs = context.self;

            var result = _object.Obj.create(context, _types.Types.Bool);
            result.set('value', lhs.get('value') > rhs.get('value'));

            return result;
        })));

        _this.functions.push(new _func.Function('>=', [new _formal.Formal('rhs', _types.Types.Double)], _types.Types.Bool, new _nativeexpression.NativeExpression(function (context) {
            var rhs = context.store.get(context.environment.find('rhs'));
            var lhs = context.self;

            var result = _object.Obj.create(context, _types.Types.Bool);
            result.set('value', lhs.get('value') >= rhs.get('value'));

            return result;
        })));

        _this.functions.push(new _func.Function('>=', [new _formal.Formal('rhs', _types.Types.Int)], _types.Types.Bool, new _nativeexpression.NativeExpression(function (context) {
            var rhs = context.store.get(context.environment.find('rhs'));
            var lhs = context.self;

            var result = _object.Obj.create(context, _types.Types.Bool);
            result.set('value', lhs.get('value') >= rhs.get('value'));

            return result;
        })));

        _this.functions.push(new _func.Function('<', [new _formal.Formal('rhs', _types.Types.Double)], _types.Types.Bool, new _nativeexpression.NativeExpression(function (context) {
            var rhs = context.store.get(context.environment.find('rhs'));
            var lhs = context.self;

            var result = _object.Obj.create(context, _types.Types.Bool);
            result.set('value', lhs.get('value') < rhs.get('value'));

            return result;
        })));

        _this.functions.push(new _func.Function('<', [new _formal.Formal('rhs', _types.Types.Int)], _types.Types.Bool, new _nativeexpression.NativeExpression(function (context) {
            var rhs = context.store.get(context.environment.find('rhs'));
            var lhs = context.self;

            var result = _object.Obj.create(context, _types.Types.Bool);
            result.set('value', lhs.get('value') < rhs.get('value'));

            return result;
        })));

        _this.functions.push(new _func.Function('<=', [new _formal.Formal('rhs', _types.Types.Double)], _types.Types.Bool, new _nativeexpression.NativeExpression(function (context) {
            var rhs = context.store.get(context.environment.find('rhs'));
            var lhs = context.self;

            var result = _object.Obj.create(context, _types.Types.Bool);
            result.set('value', lhs.get('value') <= rhs.get('value'));

            return result;
        })));

        _this.functions.push(new _func.Function('<=', [new _formal.Formal('rhs', _types.Types.Int)], _types.Types.Bool, new _nativeexpression.NativeExpression(function (context) {
            var rhs = context.store.get(context.environment.find('rhs'));
            var lhs = context.self;

            var result = _object.Obj.create(context, _types.Types.Bool);
            result.set('value', lhs.get('value') <= rhs.get('value'));

            return result;
        })));
        return _this;
    }

    return DoubleClass;
}(_class.Class);
//# sourceMappingURL=double.js.map