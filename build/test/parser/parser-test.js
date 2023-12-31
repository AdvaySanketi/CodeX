'use strict';

var _assert = require('assert');

var assert = _interopRequireWildcard(_assert);

var _expression = require('../../main/ast/expression');

var _parser = require('../../main/parser/parser');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

describe('Parser', function () {

    describe('#parseExpression', function () {

        it('should parse a simple integer literal', function () {
            var parser = new _parser.Parser('42');

            var expression = parser.parseExpression();

            assert.equal(true, expression.isIntegerLiteral());
            assert.equal('42', expression.value);
        });

        it('should parse a simple decimal literal', function () {
            var parser = new _parser.Parser('3.14159');

            var expression = parser.parseExpression();

            assert.equal(true, expression.isDecimalLiteral());
            assert.equal('3.14159', expression.value);
        });

        it('should parse a simple string literal', function () {
            var parser = new _parser.Parser('"Hello, World!"');

            var expression = parser.parseExpression();

            assert.equal(true, expression.isStringLiteral());
            assert.equal('"Hello, World!"', expression.value);
        });

        it('should parse a null literal', function () {
            var parser = new _parser.Parser('null');

            var expression = parser.parseExpression();

            assert.equal(true, expression.isNullLiteral());
        });

        it('should parse the boolean literal "true"', function () {
            var parser = new _parser.Parser('true');

            var expression = parser.parseExpression();

            assert.equal(true, expression.isBooleanLiteral());
            assert.equal('true', expression.value);
        });

        it('should parse the boolean literal "false"', function () {
            var parser = new _parser.Parser('false');

            var expression = parser.parseExpression();

            assert.equal(true, expression.isBooleanLiteral());
            assert.equal('false', expression.value);
        });

        it('should parse a simple addition', function () {
            var parser = new _parser.Parser('1 + 2');

            var expression = parser.parseExpression();

            assert.equal(true, expression.isBinaryExpression());

            assert.equal('+', expression.operator);

            assert.equal(true, expression.left.isIntegerLiteral());
            assert.equal('1', expression.left.value);

            assert.equal(true, expression.right.isIntegerLiteral());
            assert.equal('2', expression.right.value);
        });

        it('should correctly handle left associativity for arithmetic operators', function () {
            var parser = new _parser.Parser('7 - 4 + 2');

            var expression = parser.parseExpression();

            assert.equal(true, expression.isBinaryExpression());

            assert.equal('+', expression.operator);

            assert.equal(true, expression.left.isBinaryExpression());

            assert.equal('-', expression.left.operator);

            assert.equal(true, expression.left.left.isIntegerLiteral());
            assert.equal('7', expression.left.left.value);

            assert.equal(true, expression.left.right.isIntegerLiteral());
            assert.equal('4', expression.left.right.value);

            assert.equal(true, expression.right.isIntegerLiteral());
            assert.equal('2', expression.right.value);
        });

        it('should correctly handle operator precedence', function () {
            var parser = new _parser.Parser('1 + 3 * 5 - 8');

            var expression = parser.parseExpression();

            assert.equal(true, expression.isBinaryExpression());
            assert.equal('-', expression.operator);

            var left = expression.left;

            assert.equal(true, left.isBinaryExpression());
            assert.equal('+', left.operator);
            assert.equal(true, left.left.isIntegerLiteral());
            assert.equal('1', left.left.value);

            var multiplication = left.right;

            assert.equal(true, multiplication.isBinaryExpression());
            assert.equal('*', multiplication.operator);
            assert.equal(true, multiplication.left.isIntegerLiteral());
            assert.equal('3', multiplication.left.value);
            assert.equal(true, multiplication.right.isIntegerLiteral());
            assert.equal('5', multiplication.right.value);

            var right = expression.right;
            assert.equal(true, right.isIntegerLiteral());
            assert.equal('8', right.value);
        });

        it('should parse an if/else expression', function () {
            var parser = new _parser.Parser('if (true) 1 else 2');

            var expression = parser.parseExpression();

            assert.equal(true, expression.isIfElse());

            assert.equal(true, expression.thenBranch.isIntegerLiteral());
            assert.equal('1', expression.thenBranch.value);

            assert.equal(true, expression.elseBranch.isIntegerLiteral());
            assert.equal('2', expression.elseBranch.value);
        });

        it('should parse a while expression', function () {
            var parser = new _parser.Parser('while (true) 42');

            var expression = parser.parseExpression();

            assert.equal(true, expression.isWhile());

            assert.equal(true, expression.condition.isBooleanLiteral());
            assert.equal('true', expression.condition.value);

            assert.equal(true, expression.body.isIntegerLiteral());
            assert.equal('42', expression.body.value);
        });

        it('should parse a let expression', function () {
            var parser = new _parser.Parser('let a: Int = 2, b = 3 in a + b');

            var expression = parser.parseExpression();

            assert.equal(true, expression.isLet());

            var initializations = expression.initializations;
            assert.equal(2, initializations.length);

            assert.equal(initializations[0].identifier, 'a');
            assert.equal(initializations[0].type, 'Int');
            assert.equal(true, initializations[0].value.isIntegerLiteral());
            assert.equal('2', initializations[0].value.value);

            assert.equal(initializations[1].identifier, 'b');
            assert.equal(initializations[1].type, undefined);
            assert.equal(true, initializations[1].value.isIntegerLiteral());
            assert.equal('3', initializations[1].value.value);

            var body = expression.body;

            assert.equal(true, body.isBinaryExpression());

            assert.equal('+', body.operator);
            assert.equal(true, body.left.isReference());
            assert.equal('a', body.left.identifier);

            assert.equal(true, body.right.isReference());
            assert.equal('b', body.right.identifier);
        });

        it('should parse a this expression', function () {
            var parser = new _parser.Parser('this');

            var expression = parser.parseExpression();

            assert.equal(true, expression.isThis());
        });

        it('should parse a block of expressions', function () {
            var parser = new _parser.Parser('{\n' + '"hello"\n' + '42\n' + 'true\n' + '}');

            var expression = parser.parseExpression();

            assert.equal(true, expression.isBlock());

            var expressions = expression.expressions;

            assert.equal(3, expressions.length);

            assert.equal(true, expressions[0].isStringLiteral());
            assert.equal('"hello"', expressions[0].value);

            assert.equal(true, expressions[1].isIntegerLiteral());
            assert.equal('42', expressions[1].value);

            assert.equal(true, expressions[2].isBooleanLiteral());
            assert.equal('true', expressions[2].value);
        });

        it('should parse a constructor call', function () {
            var parser = new _parser.Parser('new Integer(42)');

            var expression = parser.parseExpression();

            assert.equal(true, expression.isConstructorCall());
            assert.equal('Integer', expression.type);
            assert.equal(1, expression.args.length);
            assert.equal(true, expression.args[0].isIntegerLiteral());
            assert.equal('42', expression.args[0].value);
        });

        it('should parse a negative expression', function () {
            var parser = new _parser.Parser('-42');

            var expression = parser.parseExpression();

            assert.equal(true, expression.isUnaryExpression());
            assert.equal('-', expression.operator);

            assert.equal(true, expression.expression.isIntegerLiteral());
            assert.equal('42', expression.expression.value);
        });

        it('should parse a negated boolean expression', function () {
            var parser = new _parser.Parser('!true');

            var expression = parser.parseExpression();

            assert.equal(true, expression.isUnaryExpression());
            assert.equal('!', expression.operator);

            assert.equal(true, expression.expression.isBooleanLiteral());
            assert.equal('true', expression.expression.value);
        });

        it('should parse a parenthesized expression', function () {
            var parser = new _parser.Parser('1 + (2 - 3.14)');

            var expression = parser.parseExpression();

            assert.equal(true, expression.isBinaryExpression());
            assert.equal('+', expression.operator);

            var left = expression.left;

            assert.equal(true, left.isIntegerLiteral());
            assert.equal('1', left.value);

            var right = expression.right;

            assert.equal(true, right.isBinaryExpression());
            assert.equal('-', right.operator);
            assert.equal(true, right.left.isIntegerLiteral());
            assert.equal('2', right.left.value);
            assert.equal(true, right.right.isDecimalLiteral());
            assert.equal('3.14', right.right.value);
        });

        it('should parse a simple method call', function () {
            var parser = new _parser.Parser('car.drive(2)');

            var expression = parser.parseExpression();

            assert.equal(true, expression.isFunctionCall());

            var object = expression.object;
            assert.equal(true, object.isReference());
            assert.equal('car', object.identifier);

            assert.equal(expression.functionName, 'drive');

            assert.equal(1, expression.args.length);
            assert.equal(true, expression.args[0].isIntegerLiteral());
            assert.equal('2', expression.args[0].value);
        });

        it('should parse chain method calls', function () {
            var parser = new _parser.Parser('node.add(42).push("Hello")');

            var expression = parser.parseExpression();

            assert.equal(true, expression.isFunctionCall());

            assert.equal(expression.functionName, 'push');

            var object = expression.object;

            assert.equal(true, object.isFunctionCall());
            assert.equal('add', object.functionName);
            assert.equal(true, object.object.isReference());
            assert.equal('node', object.object.identifier);
            assert.equal(1, object.args.length);
            assert.equal(true, object.args[0].isIntegerLiteral());
            assert.equal('42', object.args[0].value);

            assert.equal(1, expression.args.length);
            assert.equal(true, expression.args[0].isStringLiteral());
            assert.equal('"Hello"', expression.args[0].value);
        });
    });

    describe('#parseFunction', function () {

        it('should parse a function definition', function () {
            var parser = new _parser.Parser('func max(a: Int, b: Int): Int = {' + 'if (a > b) a else b' + '}');

            var func = parser.parseFunction();

            assert.equal(true, func.isFunction());

            assert.equal('max', func.name);

            var parameters = func.parameters;

            assert.equal(2, parameters.length);

            assert.equal('a', parameters[0].identifier);
            assert.equal('Int', parameters[0].type);
            assert.equal('b', parameters[1].identifier);
            assert.equal('Int', parameters[1].type);

            assert.equal('Int', func.returnType);

            var body = func.body;

            assert.equal(true, body.isBlock());

            var expressions = body.expressions;

            assert.equal(1, expressions.length);

            assert.equal(true, expressions[0].isIfElse());
        });
    });

    describe('#parseClass', function () {

        it('should parse a class definition', function () {
            var parser = new _parser.Parser('class Fraction(n: Int, d: Int) {\n' + 'var num: Int = n\n' + '' + 'var den: Int = d\n' + '' + 'func gcd(): Int = {\n' + '    let a = num, b = den in {\n' + '        if (b == 0) a else gcd(b, a % b)\n' + '    }\n' + '}\n' + '' + 'override func toString(): String = n.toString() + "/" + d.toString()' + '}');

            var klass = parser.parseClass();

            assert.equal('Fraction', klass.name);

            var parameters = klass.parameters;

            assert.equal(2, parameters.length);

            assert.equal('n', parameters[0].identifier);
            assert.equal('Int', parameters[0].type);

            assert.equal('d', parameters[1].identifier);
            assert.equal('Int', parameters[1].type);

            var variables = klass.properties;

            assert.equal(2, variables.length);

            assert.equal('num', variables[0].name);
            assert.equal('Int', variables[0].type);
            assert.equal(true, variables[0].value.isReference());
            assert.equal('n', variables[0].value.identifier);

            assert.equal('den', variables[1].name);
            assert.equal('Int', variables[1].type);
            assert.equal(true, variables[1].value.isReference());
            assert.equal('d', variables[1].value.identifier);

            var functions = klass.functions;

            assert.equal(2, functions.length);

            assert.equal('gcd', functions[0].name);
            assert.equal('toString', functions[1].name);
            assert.equal(true, functions[1].override);
        });
    });

    describe('#parseProgram', function () {

        it('should parse multiple class definitions', function () {
            var parser = new _parser.Parser('class Fraction(n: Int, d: Int) {\n' + 'var num: Int = n\n' + '' + 'var den: Int = d\n' + '' + 'func gcd(): Int = {\n' + '    let a = num, b = den in {\n' + '        if (b == 0) a else gcd(b, a % b)\n' + '    }\n' + '}\n' + '' + 'override func toString(): String = n.toString() + "/" + d.toString()' + '}\n' + '\n' + 'class Complex(a: Double, b: Double) {\n' + 'var x: Double = a\n' + '' + 'var y: Double = b\n' + '' + 'override func toString(): String = x.toString() + " + " + b.toString() + "i"' + '}');

            var program = parser.parseProgram();

            assert.equal(2, program.classesCount());

            var fraction = program.classes[0];

            assert.equal('Fraction', fraction.name);

            var fractionParameters = fraction.parameters;

            assert.equal(2, fractionParameters.length);

            assert.equal('n', fractionParameters[0].identifier);
            assert.equal('Int', fractionParameters[0].type);

            assert.equal('d', fractionParameters[1].identifier);
            assert.equal('Int', fractionParameters[1].type);

            var fractionVariables = fraction.properties;

            assert.equal(2, fractionVariables.length);

            assert.equal('num', fractionVariables[0].name);
            assert.equal('Int', fractionVariables[0].type);
            assert.equal(true, fractionVariables[0].value.isReference());
            assert.equal('n', fractionVariables[0].value.identifier);

            assert.equal('den', fractionVariables[1].name);
            assert.equal('Int', fractionVariables[1].type);
            assert.equal(true, fractionVariables[1].value.isReference());
            assert.equal('d', fractionVariables[1].value.identifier);

            var fractionFunctions = fraction.functions;

            assert.equal(2, fractionFunctions.length);

            assert.equal('gcd', fractionFunctions[0].name);
            assert.equal('toString', fractionFunctions[1].name);
            assert.equal(true, fractionFunctions[1].override);

            var complex = program.classes[1];

            assert.equal('Complex', complex.name);

            var complexParameters = complex.parameters;

            assert.equal(2, complexParameters.length);

            assert.equal('a', complexParameters[0].identifier);
            assert.equal('Double', complexParameters[0].type);

            assert.equal('b', complexParameters[1].identifier);
            assert.equal('Double', complexParameters[1].type);

            var complexVariables = complex.properties;

            assert.equal(2, complexVariables.length);

            assert.equal('x', complexVariables[0].name);
            assert.equal('Double', complexVariables[0].type);
            assert.equal(true, complexVariables[0].value.isReference());
            assert.equal('a', complexVariables[0].value.identifier);

            assert.equal('y', complexVariables[1].name);
            assert.equal('Double', complexVariables[1].type);
            assert.equal(true, complexVariables[1].value.isReference());
            assert.equal('b', complexVariables[1].value.identifier);

            var complexFunctions = complex.functions;

            assert.equal(1, complexFunctions.length);

            assert.equal('toString', complexFunctions[0].name);
            assert.equal(true, complexFunctions[0].override);
        });
    });
});
//# sourceMappingURL=parser-test.js.map