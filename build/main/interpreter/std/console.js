'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.consoleClass = undefined;

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

var _process = require('process');

var process = _interopRequireWildcard(_process);

var _readlineSync = require('readline-sync');

var readline = _interopRequireWildcard(_readlineSync);

var _class = require('../../ast/class');

var _evaluator = require('../../interpreter/evaluator');

var _formal = require('../../ast/formal');

var _func = require('../../ast/func');

var _functioncall = require('../../ast/functioncall');

var _nativeexpression = require('../../ast/nativeexpression');

var _object = require('../../interpreter/object');

var _reference = require('../../ast/reference');

var _types = require('../../types/types');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var consoleClass = exports.consoleClass = function (_Class) {
    _inherits(consoleClass, _Class);

    function consoleClass() {
        _classCallCheck(this, consoleClass);

        var _this = _possibleConstructorReturn(this, (consoleClass.__proto__ || Object.getPrototypeOf(consoleClass)).call(this));

        _this.name = _types.Types.console;

        _this.superClass = _types.Types.Object;

        _this.functions.push(new _func.Function('print', [new _formal.Formal('s', _types.Types.Object)], _types.Types.Unit, new _nativeexpression.NativeExpression(function (context) {
            var call = new _functioncall.FunctionCall(new _reference.Reference('s'), 'toString', []);

            var s = _evaluator.Evaluator.evaluate(context, call);

            console.log(s.get('value'));

            return _object.Obj.create(context, _types.Types.Unit);
        })));

        _this.functions.push(new _func.Function('print', [], _types.Types.Unit, new _nativeexpression.NativeExpression(function (context) {
            console.log();

            return _object.Obj.create(context, _types.Types.Unit);
        })));

        _this.functions.push(new _func.Function('readString', [new _formal.Formal('prompt', _types.Types.String)], _types.Types.String, new _nativeexpression.NativeExpression(function (context) {
            process.stdin.pause();

            var prompt = context.store.get(context.environment.find('prompt'));

            var input = readline.question(prompt.get('value'));

            console.log();

            var value = _object.Obj.create(context, _types.Types.String);

            value.set('value', input);

            process.stdin.resume();

            return value;
        })));

        _this.functions.push(new _func.Function('readInt', [new _formal.Formal('prompt', _types.Types.String)], _types.Types.Int, new _nativeexpression.NativeExpression(function (context) {
            process.stdin.pause();

            var prompt = context.store.get(context.environment.find('prompt'));

            var input = readline.questionInt(prompt.get('value'));

            console.log();

            var value = _object.Obj.create(context, _types.Types.Int);

            value.set('value', input);

            process.stdin.resume();

            return value;
        })));

        _this.functions.push(new _func.Function('readDouble', [new _formal.Formal('prompt', _types.Types.String)], _types.Types.Double, new _nativeexpression.NativeExpression(function (context) {
            process.stdin.pause();

            var prompt = context.store.get(context.environment.find('prompt'));

            var input = readline.questionFloat(prompt.get('value'));

            console.log();

            var value = _object.Obj.create(context, _types.Types.Double);

            value.set('value', input);

            process.stdin.resume();

            return value;
        })));

        _this.functions.push(new _func.Function('readString', [], _types.Types.String, new _nativeexpression.NativeExpression(function (context) {
            process.stdin.pause();

            var input = readline.question('');

            console.log();

            var value = _object.Obj.create(context, _types.Types.String);

            value.set('value', input);

            process.stdin.resume();

            return value;
        })));

        _this.functions.push(new _func.Function('readInt', [], _types.Types.Int, new _nativeexpression.NativeExpression(function (context) {
            process.stdin.pause();

            var input = readline.questionInt('');

            console.log();

            var value = _object.Obj.create(context, _types.Types.Int);

            value.set('value', input);

            process.stdin.resume();

            return value;
        })));

        _this.functions.push(new _func.Function('readDouble', [], _types.Types.Double, new _nativeexpression.NativeExpression(function (context) {
            process.stdin.pause();

            var input = readline.questionFloat('');

            console.log();

            var value = _object.Obj.create(context, _types.Types.Double);

            value.set('value', input);

            process.stdin.resume();

            return value;
        })));
        return _this;
    }

    return consoleClass;
}(_class.Class);
//# sourceMappingURL=console.js.map