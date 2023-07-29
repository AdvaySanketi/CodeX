'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BoolClass = undefined;

var _class = require('../../ast/class');

var _evaluator = require('../../interpreter/evaluator');

var _formal = require('../../ast/formal');

var _func = require('../../ast/func');

var _nativeexpression = require('../../ast/nativeexpression');

var _object = require('../../interpreter/object');

var _types = require('../../types/types');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BoolClass = exports.BoolClass = function (_Class) {
    _inherits(BoolClass, _Class);

    function BoolClass() {
        _classCallCheck(this, BoolClass);

        var _this = _possibleConstructorReturn(this, (BoolClass.__proto__ || Object.getPrototypeOf(BoolClass)).call(this));

        _this.name = _types.Types.Bool;

        _this.superClass = _types.Types.Object;

        _this.properties.push(new _formal.Formal('value', 'bool'));

        _this.functions.push(new _func.Function('toString', [], _types.Types.String, new _nativeexpression.NativeExpression(function (context) {
            var value = _object.Obj.create(context, _types.Types.String);

            value.set('value', context.self.get('value').toString());

            return value;
        }), true));

        _this.functions.push(new _func.Function('==', [new _formal.Formal('rhs', _types.Types.Object)], _types.Types.Bool, new _nativeexpression.NativeExpression(function (context) {
            var rhs = context.store.get(context.environment.find('rhs'));
            var lhs = context.self;

            var value = _object.Obj.create(context, _types.Types.Bool);

            if (rhs.type !== _types.Types.Bool) {
                value.set('value', false);
            } else {
                value.set('value', lhs.get('value') === rhs.get('value'));
            }

            return value;
        }), true));

        _this.functions.push(new _func.Function('unary_!', [], _types.Types.Bool, new _nativeexpression.NativeExpression(function (context) {
            var result = _object.Obj.create(context, _types.Types.Bool);

            result.set('value', !context.self.get('value'));

            return result;
        })));

        _this.functions.push(new _func.Function('&&', [new _formal.Formal('rhs', _types.Types.Bool, true)], _types.Types.Bool, new _nativeexpression.NativeExpression(function (context) {
            var lhs = context.self;

            var value = _object.Obj.create(context, _types.Types.Bool);

            if (lhs.get('value') === false) {
                value.set('value', false);
            } else {
                var address = context.environment.find('rhs');

                var rhs = context.store.get(address);

                rhs = _evaluator.Evaluator.evaluate(rhs.context, rhs.expression);

                context.store.put(address, rhs);

                value.set('value', rhs.get('value'));
            }

            return value;
        })));

        _this.functions.push(new _func.Function('||', [new _formal.Formal('rhs', _types.Types.Bool, true)], _types.Types.Bool, new _nativeexpression.NativeExpression(function (context) {
            var lhs = context.self;

            var value = _object.Obj.create(context, _types.Types.Bool);

            if (lhs.get('value') === true) {
                value.set('value', true);
            } else {
                var address = context.environment.find('rhs');

                var rhs = context.store.get(address);

                rhs = _evaluator.Evaluator.evaluate(rhs.context, rhs.expression);

                context.store.put(address, rhs);

                value.set('value', rhs.get('value'));
            }

            return value;
        })));
        return _this;
    }

    return BoolClass;
}(_class.Class);
//# sourceMappingURL=bool.js.map