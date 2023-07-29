'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ObjectClass = undefined;

var _class = require('../../ast/class');

var _evaluator = require('../../interpreter/evaluator');

var _formal = require('../../ast/formal');

var _func = require('../../ast/func');

var _functioncall = require('../../ast/functioncall');

var _nativeexpression = require('../../ast/nativeexpression');

var _object = require('../../interpreter/object');

var _reference = require('../../ast/reference');

var _this2 = require('../../ast/this');

var _typechecker = require('../../semanticanalysis/typechecker');

var _types = require('../../types/types');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ObjectClass = exports.ObjectClass = function (_Class) {
    _inherits(ObjectClass, _Class);

    function ObjectClass() {
        _classCallCheck(this, ObjectClass);

        var _this = _possibleConstructorReturn(this, (ObjectClass.__proto__ || Object.getPrototypeOf(ObjectClass)).call(this));

        _this.name = _types.Types.Object;

        _this.functions.push(new _func.Function('instanceOf', [new _formal.Formal('type', _types.Types.String)], _types.Types.Bool, new _nativeexpression.NativeExpression(function (context) {
            var type = context.store.get(context.environment.find('type'));
            var self = context.self;

            var value = _object.Obj.create(context, _types.Types.Bool);

            value.set('value', self.type === type.get('value'));

            return value;
        })));

        _this.functions.push(new _func.Function('toString', [], _types.Types.String, new _nativeexpression.NativeExpression(function (context) {
            var value = _object.Obj.create(context, _types.Types.String);

            value.set('value', context.self.type + '@' + context.self.address);

            return value;
        })));

        _this.functions.push(new _func.Function('==', [new _formal.Formal('rhs', _types.Types.Object)], _types.Types.Bool, new _nativeexpression.NativeExpression(function (context) {
            var rhs = context.store.get(context.environment.find('rhs'));

            var value = _object.Obj.create(context, _types.Types.Bool);

            if (context.self.type !== rhs.type) {
                value.set('value', false);
            } else {
                value.set('value', context.self.address === rhs.address);
            }

            return value;
        })));

        _this.functions.push(new _func.Function('!=', [new _formal.Formal('rhs', _types.Types.Object)], _types.Types.Bool, new _nativeexpression.NativeExpression(function (context) {
            var rhs = context.store.get(context.environment.find('rhs'));

            var object = new _this2.This();
            object.expressionType = _types.Types.Object;

            var arg = new _reference.Reference('rhs');
            arg.expressionType = _types.Types.Object;

            var call = new _functioncall.FunctionCall(object, '==', [arg]);

            var value = _evaluator.Evaluator.evaluate(context, call);

            value.set('value', !value.get('value'));

            return value;
        })));

        _this.functions.push(new _func.Function('!=', [new _formal.Formal('rhs', _types.Types.Null)], _types.Types.Bool, new _nativeexpression.NativeExpression(function (context) {
            var value = _object.Obj.create(context, _types.Types.Bool);

            value.set('value', context.self.type !== _types.Types.Null);

            return value;
        })));

        _this.functions.push(new _func.Function('+', [new _formal.Formal('rhs', _types.Types.String)], _types.Types.String, new _nativeexpression.NativeExpression(function (context) {
            var rhs = context.store.get(context.environment.find('rhs'));

            var object = new _this2.This();
            object.expressionType = _types.Types.Object;

            var call = new _functioncall.FunctionCall(object, 'toString', []);

            var self = _evaluator.Evaluator.evaluate(context, call);

            var value = _object.Obj.create(context, _types.Types.String);

            value.set('value', self.get('value') + rhs.get('value'));

            return value;
        })));
        return _this;
    }

    return ObjectClass;
}(_class.Class);
//# sourceMappingURL=object.js.map