'use strict';

var _assert = require('assert');

var assert = _interopRequireWildcard(_assert);

var _class = require('../../main/ast/class');

var _typeenvironment = require('../../main/semanticanalysis/typeenvironment');

var _parser = require('../../main/parser/parser');

var _typechecker = require('../../main/semanticanalysis/typechecker');

var _types = require('../../main/types/types');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

describe('TypeChecker', function () {

    describe('#typeCheck', function () {
        it('should throw an error if trying to assign to value of a different type than the one declared', function () {
            var parser = new _parser.Parser('let x: Int in x = "Hello"');

            var env = new _typeenvironment.TypeEnvironment();
            env.addClass(new _class.Class('Object'));
            env.addClass(new _class.Class('Int', [], 'Object'));
            env.addClass(new _class.Class('String', [], 'String'));

            assert.throws(function () {
                _typechecker.TypeChecker.typeCheck(env, parser.parseExpression());
            }, Error, "Cannot assign value of type 'String' to variable 'x' declared with type 'Int'.");
        });

        it('should throw an error if trying to assign to a non declared variable', function () {
            var parser = new _parser.Parser('let x: Int in y = 42');

            var env = new _typeenvironment.TypeEnvironment();
            env.addClass(new _class.Class('Object'));
            env.addClass(new _class.Class('Int', [], 'Object'));

            assert.throws(function () {
                _typechecker.TypeChecker.typeCheck(env, parser.parseExpression());
            }, Error, '1:15: Assignment to an undefined variable \'y\'.');
        });

        it('should throw an error if trying to reference to a non declared variable', function () {
            var parser = new _parser.Parser('let x: Double in y + x');

            var env = new _typeenvironment.TypeEnvironment();
            env.addClass(new _class.Class('Object'));
            env.addClass(new _class.Class('Double', [], 'Object'));

            assert.throws(function () {
                _typechecker.TypeChecker.typeCheck(env, parser.parseExpression());
            }, Error, '1:18: Reference to an undefined identifier \'y\'.');
        });

        it('should infer the type of a variable during initialization if the type is not specified', function () {
            var parser = new _parser.Parser('let x = 42 in x');

            var expression = parser.parseExpression();

            var env = new _typeenvironment.TypeEnvironment();
            env.addClass(new _class.Class('Object'));
            env.addClass(new _class.Class('Int', [], 'Object'));

            _typechecker.TypeChecker.typeCheck(env, expression);

            var init = expression.initializations[0];

            assert.equal('Int', init.type);
            assert.equal('Int', init.expressionType);
        });

        it('should not throw an error if the assignment is valid', function () {
            var parser = new _parser.Parser('let x: Int in x = 42');

            var env = new _typeenvironment.TypeEnvironment();
            env.addClass(new _class.Class('Object'));
            env.addClass(new _class.Class('Int', [], 'Object'));
            env.addClass(new _class.Class('String', [], 'Object'));

            _typechecker.TypeChecker.typeCheck(env, parser.parseExpression());
        });

        it('should throw an error if there are 2 variables with the same name in a let binding', function () {
            var parser = new _parser.Parser('let x: Int = 42, x: Double = 3.14 in x + y');

            var env = new _typeenvironment.TypeEnvironment();
            env.addClass(new _class.Class('Object'));
            env.addClass(new _class.Class('Int', [], 'Object'));
            env.addClass(new _class.Class('Double', [], 'Object'));

            assert.throws(function () {
                _typechecker.TypeChecker.typeCheck(env, parser.parseExpression());
            }, Error, '1:18: Duplicate identifier \'x\' in let binding.');
        });

        it('should throw an error if a function has 2 parameters of the same name', function () {
            var parser = new _parser.Parser('func add(x: Int, x: Double): Double = {' + 'x + x' + '}');

            var env = new _typeenvironment.TypeEnvironment();
            env.addClass(new _class.Class('Object'));
            env.addClass(new _class.Class('Int', [], 'Object'));
            env.addClass(new _class.Class('String', [], 'Object'));

            assert.throws(function () {
                _typechecker.TypeChecker.typeCheck(env, parser.parseFunction());
            }, Error, '1:17: Duplicate parameter name \'x\' in function \'add\'.');
        });

        it('should throw an error if a class has 2 parameters of the same name', function () {
            var parser = new _parser.Parser('class Complex(x: Int, x: Int) {' + 'var a: Int = x' + '\n' + 'var b: Int = x' + '\n' + 'func toString(): String = a + "+" + b + "i"' + '}');

            var env = new _typeenvironment.TypeEnvironment();
            env.addClass(new _class.Class('Object'));
            env.addClass(new _class.Class('Int', [], 'Object'));

            assert.throws(function () {
                _typechecker.TypeChecker.typeCheck(env, parser.parseClass());
            }, Error, '1:23: Duplicate class parameter name \'x\' in class \'Complex\' definition.');
        });

        it('should throw an error if a class has 2 instance variables of the same name', function () {
            var parser = new _parser.Parser('class Complex(x: Int, y: Int) {' + 'var a: Int = x' + '\n' + 'var a: Int = y' + '\n' + 'def toString(): String = "a complex"' + '\n' + '');

            var env = new _typeenvironment.TypeEnvironment();
            env.addClass(new _class.Class('Object'));
            env.addClass(new _class.Class('Int', [], 'Object'));

            assert.throws(function () {
                _typechecker.TypeChecker.typeCheck(env, parser.parseClass());
            }, Error, '2:1: An instance variable named \'a\' is already in scope.');
        });

        it('should throw an error if the condition of an if/else does not evaluate to a boolean value', function () {
            var parser = new _parser.Parser('if (42) true else false');

            var env = new _typeenvironment.TypeEnvironment();
            env.addClass(new _class.Class('Object'));
            env.addClass(new _class.Class('Int', [], 'Object'));

            assert.throws(function () {
                _typechecker.TypeChecker.typeCheck(env, parser.parseExpression());
            }, Error, '1:5: Condition of the if/else expression evaluates to a value of type \'Int\', must evaluate to a boolean value.');
        });

        it('should throw an error if the condition of a while expression does not evaluate to a boolean value', function () {
            var parser = new _parser.Parser('while ("hello") true');

            var env = new _typeenvironment.TypeEnvironment();
            env.addClass(new _class.Class('Object'));
            env.addClass(new _class.Class('String', [], 'Object'));

            assert.throws(function () {
                _typechecker.TypeChecker.typeCheck(env, parser.parseExpression());
            }, Error, '1:8: Condition of a while loop evaluates to a value of type \'String\', must evaluate to a boolean value.');
        });

        it('should set the type of an if/else expression to the LUB of its 2 branches', function () {
            var parser = new _parser.Parser('if (true) new Bretzel() else new Cat()');

            var env = new _typeenvironment.TypeEnvironment();
            env.addClass(new _class.Class('Object'));
            env.addClass(new _class.Class('Bool', [], 'Object'));
            env.addClass(new _class.Class('Animal', [], 'Object'));
            env.addClass(new _class.Class('Dog', [], 'Animal'));
            env.addClass(new _class.Class('Cat', [], 'Animal'));
            env.addClass(new _class.Class('Bretzel', [], 'Dog'));

            var ifElse = parser.parseExpression();

            _typechecker.TypeChecker.typeCheck(env, ifElse);

            assert.equal('Bretzel', ifElse.thenBranch.expressionType);
            assert.equal('Cat', ifElse.elseBranch.expressionType);
            assert.equal('Animal', ifElse.expressionType);
        });

        it('should set the type of an if/else expression to Unit if the else branch is missing', function () {
            var parser = new _parser.Parser('if (true) 42');

            var env = new _typeenvironment.TypeEnvironment();
            env.addClass(new _class.Class('Object'));
            env.addClass(new _class.Class('Bool', [], 'Object'));
            env.addClass(new _class.Class('Int', [], 'Object'));

            var ifElse = parser.parseExpression();

            _typechecker.TypeChecker.typeCheck(env, ifElse);

            assert.equal(_types.Types.Int, ifElse.thenBranch.expressionType);
            assert.equal(_types.Types.Unit, ifElse.expressionType);
        });

        it('should set the type of a while expression to Unit', function () {
            var parser = new _parser.Parser('while (true) 42');

            var env = new _typeenvironment.TypeEnvironment();
            env.addClass(new _class.Class('Object'));
            env.addClass(new _class.Class('Bool', [], 'Object'));
            env.addClass(new _class.Class('Int', [], 'Object'));

            var whileExpr = parser.parseExpression();

            _typechecker.TypeChecker.typeCheck(env, whileExpr);

            assert.equal(_types.Types.Unit, whileExpr.expressionType);
        });
    });
});
//# sourceMappingURL=typechecker-test.js.map