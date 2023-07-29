'use strict';

var _assert = require('assert');

var assert = _interopRequireWildcard(_assert);

var _class = require('../../main/ast/class');

var _context = require('../../main/interpreter/context');

var _evaluator = require('../../main/interpreter/evaluator');

var _bool = require('../../main/interpreter/std/bool');

var _double = require('../../main/interpreter/std/double');

var _int = require('../../main/interpreter/std/int');

var _object = require('../../main/interpreter/std/object');

var _parser = require('../../main/parser/parser');

var _str = require('../../main/interpreter/std/str');

var _typechecker = require('../../main/semanticanalysis/typechecker');

var _typeenvironment = require('../../main/semanticanalysis/typeenvironment');

var _unit = require('../../main/interpreter/std/unit');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

describe('Evaluator', function () {

    describe('#evaluate', function () {

        var typeEnv = new _typeenvironment.TypeEnvironment();
        var context = new _context.Context();

        before(function () {
            var boolClass = new _bool.BoolClass();
            var doubleClass = new _double.DoubleClass();
            var objectClass = new _object.ObjectClass();
            var intClass = new _int.IntClass();
            var stringClass = new _str.StringClass();
            var unitClass = new _unit.UnitClass();

            typeEnv.addClass(boolClass);
            typeEnv.addClass(doubleClass);
            typeEnv.addClass(objectClass);
            typeEnv.addClass(intClass);
            typeEnv.addClass(stringClass);
            typeEnv.addClass(unitClass);

            context.addClass(boolClass);
            context.addClass(doubleClass);
            context.addClass(objectClass);
            context.addClass(intClass);
            context.addClass(stringClass);
            context.addClass(unitClass);
        });

        beforeEach(function () {
            typeEnv.symbolTable.clear();
        });

        it('should evaluate a boolean literal', function () {
            var source = 'false';

            var expression = new _parser.Parser(source).parseExpression();

            _typechecker.TypeChecker.typeCheck(typeEnv, expression);

            var value = _evaluator.Evaluator.evaluate(context, expression);

            assert.equal(false, value.get('value'));
        });

        it('should evaluate an integer literal', function () {
            var source = '42';

            var expression = new _parser.Parser(source).parseExpression();

            _typechecker.TypeChecker.typeCheck(typeEnv, expression);

            var value = _evaluator.Evaluator.evaluate(context, expression);

            assert.equal(42, value.get('value'));
        });

        it('should evaluate a decimal literal', function () {
            var source = '3.14';

            var expression = new _parser.Parser(source).parseExpression();

            _typechecker.TypeChecker.typeCheck(typeEnv, expression);

            var value = _evaluator.Evaluator.evaluate(context, expression);

            assert.equal(3.14, value.get('value'));
        });

        it('should evaluate a string literal', function () {
            var source = '"Hello, world!"';

            var expression = new _parser.Parser(source).parseExpression();

            _typechecker.TypeChecker.typeCheck(typeEnv, expression);

            var value = _evaluator.Evaluator.evaluate(context, expression);

            assert.equal('Hello, world!', value.get('value'));
        });

        it('should evaluate string concatenation', function () {
            var source = '"Hello" + " world!"';

            var expression = new _parser.Parser(source).parseExpression();

            _typechecker.TypeChecker.typeCheck(typeEnv, expression);

            var value = _evaluator.Evaluator.evaluate(context, expression);

            assert.equal('Hello world!', value.get('value'));
        });

        it('should evaluate an integer addition', function () {
            var source = '1 + 2 + 3 + 4 + 5';

            var expression = new _parser.Parser(source).parseExpression();

            _typechecker.TypeChecker.typeCheck(typeEnv, expression);

            var value = _evaluator.Evaluator.evaluate(context, expression);

            assert.equal(15, value.get('value'));
        });

        it('should evaluate an if/else expression', function () {
            var source = 'if (2 < 3) { 42 } else { 21 }';

            var expression = new _parser.Parser(source).parseExpression();

            _typechecker.TypeChecker.typeCheck(typeEnv, expression);

            var value = _evaluator.Evaluator.evaluate(context, expression);

            assert.equal('Int', value.type);
            assert.equal(42, value.get('value'));
        });

        it('should evaluate a constructor call', function () {
            var fractionClassSource = 'class Fraction(n: Int, d: Int) {\n' + 'var num: Int = n\n' + 'var den: Int = d\n' + '}';

            var fractionClass = new _parser.Parser(fractionClassSource).parseClass();

            typeEnv.addClass(fractionClass);
            context.addClass(fractionClass);

            _typechecker.TypeChecker.typeCheckClass(typeEnv, fractionClass);

            var source = 'new Fraction(3, 4)';

            var expression = new _parser.Parser(source).parseExpression();

            _typechecker.TypeChecker.typeCheck(typeEnv, expression);

            var value = _evaluator.Evaluator.evaluate(context, expression);

            assert.equal('Fraction', value.type);

            assert.equal(true, value.has('num'));
            assert.equal(true, value.has('den'));

            assert.equal(3, value.get('num').get('value'));
            assert.equal(4, value.get('den').get('value'));
        });

        it('should evaluate a simple method call', function () {
            var fractionClassSource = 'class Fraction(n: Int, d: Int) {\n' + 'var num: Int = n\n' + 'var den: Int = d\n' + '' + 'override func toString(): String = num.toString() + "/" + den.toString()\n' + '}';

            var fractionClass = new _parser.Parser(fractionClassSource).parseClass();

            typeEnv.addClass(fractionClass);
            context.addClass(fractionClass);

            _typechecker.TypeChecker.typeCheckClass(typeEnv, fractionClass);

            var source = 'let f = new Fraction(3, 4) in f.toString()';

            var expression = new _parser.Parser(source).parseExpression();

            _typechecker.TypeChecker.typeCheck(typeEnv, expression);

            context.environment.enterScope();

            var value = _evaluator.Evaluator.evaluate(context, expression);

            context.environment.exitScope();

            assert.equal('3/4', value.get('value'));
        });

        it('should evaluate a reference', function () {
            var source = 'let n = 42 in n';

            var expression = new _parser.Parser(source).parseExpression();

            _typechecker.TypeChecker.typeCheck(typeEnv, expression);

            context.environment.enterScope();

            var value = _evaluator.Evaluator.evaluate(context, expression);

            context.environment.exitScope();

            assert.equal(42, value.get('value'));
        });

        it('should evaluate a while expression', function () {
            var source = 'let counter = 0 in {\n' + 'while (counter < 10) {\n' + 'counter = counter + 1\n' + '}\n' + 'counter\n' + '}';

            var expression = new _parser.Parser(source).parseExpression();

            _typechecker.TypeChecker.typeCheck(typeEnv, expression);

            context.environment.enterScope();

            var value = _evaluator.Evaluator.evaluate(context, expression);

            context.environment.exitScope();

            assert.equal(10, value.get('value'));
        });
    });
});
//# sourceMappingURL=evaluator-test.js.map