'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.StringClass = undefined;

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

var StringClass = exports.StringClass = function (_Class) {
    _inherits(StringClass, _Class);

    function StringClass() {
        _classCallCheck(this, StringClass);

        var _this = _possibleConstructorReturn(this, (StringClass.__proto__ || Object.getPrototypeOf(StringClass)).call(this));

        _this.name = _types.Types.String;

        _this.superClass = _types.Types.Object;

        _this.properties.push(new _formal.Formal('value', 'string'));

        _this.functions.push(new _func.Function('toString', [], _types.Types.String, new _nativeexpression.NativeExpression(function (context) {
            return context.self;
        }), true));

        _this.functions.push(new _func.Function('==', [new _formal.Formal('rhs', _types.Types.Object)], _types.Types.Bool, new _nativeexpression.NativeExpression(function (context) {
            var rhs = context.store.get(context.environment.find('rhs'));
            var lhs = context.self;

            var result = _object.Obj.create(context, _types.Types.Bool);

            if (rhs.type !== _types.Types.String) {
                result.set('value', false);
            } else {
                result.set('value', lhs.get('value') === rhs.get('value'));
            }

            return result;
        }), true));

        _this.functions.push(new _func.Function('+', [new _formal.Formal('rhs', _types.Types.Object)], _types.Types.String, new _nativeexpression.NativeExpression(function (context) {
            var call = new _functioncall.FunctionCall(new _reference.Reference('rhs'), 'toString', []);

            var rhs = _evaluator.Evaluator.evaluate(context, call);
            var lhs = context.self;

            var value = _object.Obj.create(context, _types.Types.String);

            value.set('value', lhs.get('value') + rhs.get('value'));

            return value;
        })));

        _this.functions.push(new _func.Function('at', [new _formal.Formal('index', _types.Types.Int)], _types.Types.String, new _nativeexpression.NativeExpression(function (context) {
            var index = context.store.get(context.environment.find('index'));
            var self = context.self;

            var value = _object.Obj.create(context, _types.Types.String);

            value.set('value', self.get('value').charAt(index.get('value')));

            return value;
        })));

        _this.functions.push(new _func.Function('length', [], _types.Types.Int, new _nativeexpression.NativeExpression(function (context) {
            var value = _object.Obj.create(context, _types.Types.Int);

            value.set('value', context.self.get('value').length);

            return value;
        })));

        _this.functions.push(new _func.Function('contains', [new _formal.Formal('s', _types.Types.String)], _types.Types.Bool, new _nativeexpression.NativeExpression(function (context) {
            var s = context.store.get(context.environment.find('s'));
            var self = context.self;

            var value = _object.Obj.create(context, _types.Types.Bool);

            value.set('value', self.get('value').search(s.get('value')) > 0);

            return value;
        })));

        _this.functions.push(new _func.Function('startsWith', [new _formal.Formal('s', _types.Types.String)], _types.Types.Bool, new _nativeexpression.NativeExpression(function (context) {
            var s = context.store.get(context.environment.find('s'));
            var self = context.self;

            var value = _object.Obj.create(context, _types.Types.Bool);

            value.set('value', self.get('value').startsWith(s.get('value')));

            return value;
        })));

        _this.functions.push(new _func.Function('endsWith', [new _formal.Formal('s', _types.Types.String)], _types.Types.Bool, new _nativeexpression.NativeExpression(function (context) {
            var s = context.store.get(context.environment.find('s'));
            var self = context.self;

            var value = _object.Obj.create(context, _types.Types.Bool);

            value.set('value', self.get('value').endsWith(s.get('value')));

            return value;
        })));

        _this.functions.push(new _func.Function('indexOf', [new _formal.Formal('s', _types.Types.String)], _types.Types.Int, new _nativeexpression.NativeExpression(function (context) {
            var s = context.store.get(context.environment.find('s'));
            var self = context.self;

            var value = _object.Obj.create(context, _types.Types.Int);

            value.set('value', self.get('value').indexOf(s.get('value')));

            return value;
        })));

        _this.functions.push(new _func.Function('toUpper', [], _types.Types.String, new _nativeexpression.NativeExpression(function (context) {
            var value = _object.Obj.create(context, _types.Types.String);

            value.set('value', context.self.get('value').toUpperCase());

            return value;
        })));

        _this.functions.push(new _func.Function('toLower', [], _types.Types.String, new _nativeexpression.NativeExpression(function (context) {
            var value = _object.Obj.create(context, _types.Types.String);

            value.set('value', context.self.get('value').toLowerCase());

            return value;
        })));

        _this.functions.push(new _func.Function('substring', [new _formal.Formal('start', _types.Types.Int)], _types.Types.String, new _nativeexpression.NativeExpression(function (context) {
            var start = context.store.get(context.environment.find('start'));

            var value = _object.Obj.create(context, _types.Types.String);

            value.set('value', context.self.get('value').substring(start.get('value')));

            return value;
        })));

        _this.functions.push(new _func.Function('substring', [new _formal.Formal('start', _types.Types.Int), new _formal.Formal('end', _types.Types.Int)], _types.Types.String, new _nativeexpression.NativeExpression(function (context) {
            var start = context.store.get(context.environment.find('start'));
            var end = context.store.get(context.environment.find('end'));

            var value = _object.Obj.create(context, _types.Types.String);

            value.set('value', context.self.get('value').substring(start.get('value'), end.get('value')));

            return value;
        })));

        _this.functions.push(new _func.Function('trim', [], _types.Types.String, new _nativeexpression.NativeExpression(function (context) {
            var value = _object.Obj.create(context, _types.Types.String);

            value.set('value', context.self.get('value').trim());

            return value;
        })));

        _this.functions.push(new _func.Function('replace', [new _formal.Formal('oldSub', _types.Types.String), new _formal.Formal('newSub', _types.Types.String)], _types.Types.String, new _nativeexpression.NativeExpression(function (context) {
            var oldSub = context.store.get(context.environment.find('oldSub'));
            var newSub = context.store.get(context.environment.find('newSub'));
            var self = context.self;

            var value = _object.Obj.create(context, _types.Types.String);

            value.set('value', self.get('value').replace(oldSub.get('value'), newSub.get('value')));

            return value;
        })));
        return _this;
    }

    return StringClass;
}(_class.Class);
//# sourceMappingURL=str.js.map