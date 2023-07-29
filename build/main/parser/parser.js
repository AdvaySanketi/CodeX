'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Parser = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assignment = require('../ast/assignment');

var _binaryexpression = require('../ast/binaryexpression');

var _block = require('../ast/block');

var _boolean = require('../ast/boolean');

var _cast = require('../ast/cast');

var _class = require('../ast/class');

var _constructorcall = require('../ast/constructorcall');

var _decimal = require('../ast/decimal');

var _initialization = require('../ast/initialization');

var _formal = require('../ast/formal');

var _ifelse = require('../ast/ifelse');

var _integer = require('../ast/integer');

var _let = require('../ast/let');

var _lexer = require('../lexer/lexer');

var _func = require('../ast/func');

var _functioncall = require('../ast/functioncall');

var _null = require('../ast/null');

var _program = require('../ast/program');

var _reference = require('../ast/reference');

var _report = require('../util/report');

var _string = require('../ast/string');

var _superfunctioncall = require('../ast/superfunctioncall');

var _this = require('../ast/this');

var _tokentype = require('../lexer/tokentype');

var _token = require('../lexer/token');

var _types = require('../types/types');

var _unaryexpression = require('../ast/unaryexpression');

var _property = require('../ast/property');

var _while = require('../ast/while');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Parser = exports.Parser = function () {
    function Parser(input) {
        _classCallCheck(this, Parser);

        this.lexer = new _lexer.Lexer(input);
        this.currentToken = this.lexer.nextToken();
    }

    _createClass(Parser, [{
        key: 'parseAssignment',
        value: function parseAssignment() {
            var assignment = new _assignment.Assignment();

            assignment.identifier = this.expect(_tokentype.TokenType.Identifier).value;

            assignment.operator = this.currentToken.value;

            this.currentToken = this.lexer.nextToken();

            assignment.value = this.parseExpression();

            return assignment;
        }
    }, {
        key: 'parseBinaryExpression',
        value: function parseBinaryExpression(acceptOperatorFunction, parseBranchFunction) {
            var expression = parseBranchFunction.apply(this);

            if (acceptOperatorFunction.apply(this)) {

                while (acceptOperatorFunction.apply(this)) {
                    var binaryExpression = new _binaryexpression.BinaryExpression();

                    binaryExpression.operator = this.currentToken.value;

                    this.currentToken = this.lexer.nextToken();

                    binaryExpression.left = expression;

                    binaryExpression.right = parseBranchFunction.apply(this);

                    expression = binaryExpression;
                }
            }

            return expression;
        }
    }, {
        key: 'parseBlock',
        value: function parseBlock() {
            this.expect(_tokentype.TokenType.LeftBrace);

            var block = new _block.Block();

            while (!this.accept(_tokentype.TokenType.RightBrace)) {
                block.expressions.push(this.parseExpression());
            }

            this.expect(_tokentype.TokenType.RightBrace);

            return block;
        }
    }, {
        key: 'parseBooleanExpression',
        value: function parseBooleanExpression() {
            return this.parseBinaryExpression(this.acceptBooleanOperator, this.parseComparison);
        }
    }, {
        key: 'parseCast',
        value: function parseCast() {
            var expression = this.parseBooleanExpression();

            if (this.acceptCastOperator()) {
                while (this.acceptCastOperator()) {
                    this.expect(_tokentype.TokenType.As);

                    var cast = new _cast.Cast();

                    cast.object = expression;

                    cast.type = this.expect(_tokentype.TokenType.Identifier).value;

                    expression = cast;
                }
            }

            return expression;
        }
    }, {
        key: 'parseClass',
        value: function parseClass() {
            var classToken = this.expect(_tokentype.TokenType.Class);

            var klass = new _class.Class(this.expect(_tokentype.TokenType.Identifier).value);

            if (this.accept(_tokentype.TokenType.LeftParen)) {
                klass.parameters = this.parseFormals();
            }

            if (!this.accept(_tokentype.TokenType.Extends)) {
                klass.superClass = _types.Types.Object;
            } else {
                this.expect(_tokentype.TokenType.Extends);

                klass.superClass = this.expect(_tokentype.TokenType.Identifier).value;

                if (this.accept(_tokentype.TokenType.LeftParen)) {
                    klass.superClassArgs = this.parseActuals();
                }
            }

            this.parseClassBody(klass);

            klass.line = classToken.line;
            klass.column = classToken.column;

            return klass;
        }
    }, {
        key: 'parseConstructorCall',
        value: function parseConstructorCall() {
            this.expect(_tokentype.TokenType.New);

            var call = new _constructorcall.ConstructorCall();

            call.type = this.expect(_tokentype.TokenType.Identifier).value;

            call.args = this.parseActuals();

            return call;
        }
    }, {
        key: 'parseDefinition',
        value: function parseDefinition() {
            var token = this.currentToken;

            var definition = null;

            if (this.accept(_tokentype.TokenType.Class)) {
                definition = this.parseClass();
            }

            if (this.accept(_tokentype.TokenType.Override) || this.accept(_tokentype.TokenType.Func)) {
                definition = this.parseFunction();
            }

            if (definition === null) {
                throw new Error(_report.Report.error(token.type, token.column, 'Unexpected \'' + token.type + '\'.'));
            }

            return definition;
        }
    }, {
        key: 'parseFormals',
        value: function parseFormals() {
            this.expect(_tokentype.TokenType.LeftParen);

            var formals = [];

            if (!this.accept(_tokentype.TokenType.RightParen)) {
                do {
                    if (this.accept(_tokentype.TokenType.Comma)) {
                        this.expect(_tokentype.TokenType.Comma);
                    }

                    var lazy = false;

                    if (this.accept(_tokentype.TokenType.Lazy)) {
                        this.expect(_tokentype.TokenType.Lazy);
                        lazy = true;
                    }

                    var nameToken = this.expect(_tokentype.TokenType.Identifier);

                    this.expect(_tokentype.TokenType.Colon);

                    var type = this.expect(_tokentype.TokenType.Identifier).value;

                    formals.push(new _formal.Formal(nameToken.value, type, lazy, nameToken.line, nameToken.column));
                } while (this.accept(_tokentype.TokenType.Comma));
            }

            this.expect(_tokentype.TokenType.RightParen);

            return formals;
        }
    }, {
        key: 'parseFunction',
        value: function parseFunction() {
            var overrideToken = null;
            var privateToken = null;

            var override = false;
            var isPrivate = false;

            if (this.accept(_tokentype.TokenType.Override)) {
                overrideToken = this.expect(_tokentype.TokenType.Override);

                override = true;
            } else if (this.accept(_tokentype.TokenType.Private)) {
                privateToken = this.expect(_tokentype.TokenType.Private);

                isPrivate = true;
            }

            var funcToken = this.expect(_tokentype.TokenType.Func);

            var func = new _func.Function();

            func.override = override;
            func.isPrivate = isPrivate;
            func.line = isPrivate ? privateToken.line : override ? overrideToken.line : funcToken.line;
            func.column = isPrivate ? privateToken.column : override ? overrideToken.column : funcToken.column;

            if (this.accept(_tokentype.TokenType.Identifier)) {
                func.name = this.expect(_tokentype.TokenType.Identifier).value;
            } else if (this.acceptOperator()) {
                func.name = this.currentToken.value;

                this.currentToken = this.lexer.nextToken();
            } else {
                throw new Error(_report.Report.error(func.line, func.column, 'Expected identifier or operator as method name, but found \'' + this.currentToken.value + '\'.'));
            }

            func.parameters = this.parseFormals();

            if (!this.accept(_tokentype.TokenType.Colon)) {
                func.returnType = _types.Types.Unit;
            } else {
                this.expect(_tokentype.TokenType.Colon);

                func.returnType = this.expect(_tokentype.TokenType.Identifier).value;
            }

            this.expect(_tokentype.TokenType.Equal);

            func.body = this.parseExpression();

            return func;
        }
    }, {
        key: 'parseFunctionCall',
        value: function parseFunctionCall() {
            var call = new _functioncall.FunctionCall();
            var token = null;

            if (this.accept(_tokentype.TokenType.Identifier)) {
                token = this.expect(_tokentype.TokenType.Identifier);
            } else {
                token = this.currentToken;
                this.currentToken = this.lexer.nextToken();
            }

            call.functionName = token.value;
            call.line = token.line;
            call.column = token.column;
            call.args = this.parseActuals();

            return call;
        }
    }, {
        key: 'parseIfElse',
        value: function parseIfElse() {
            this.expect(_tokentype.TokenType.If);

            var ifElse = new _ifelse.IfElse();

            this.expect(_tokentype.TokenType.LeftParen);

            ifElse.condition = this.parseExpression();

            this.expect(_tokentype.TokenType.RightParen);

            ifElse.thenBranch = this.parseExpression();

            if (this.accept(_tokentype.TokenType.Else)) {
                this.expect(_tokentype.TokenType.Else);

                ifElse.elseBranch = this.parseExpression();
            }

            return ifElse;
        }
    }, {
        key: 'parseInitializations',
        value: function parseInitializations() {
            var initializations = [];

            do {

                if (this.accept(_tokentype.TokenType.Comma)) {
                    this.expect(_tokentype.TokenType.Comma);
                }

                var initialization = new _initialization.Initialization();

                var token = this.expect(_tokentype.TokenType.Identifier);

                initialization.identifier = token.value;

                if (this.accept(_tokentype.TokenType.Colon)) {
                    this.expect(_tokentype.TokenType.Colon);

                    initialization.type = this.expect(_tokentype.TokenType.Identifier).value;
                }

                if (this.accept(_tokentype.TokenType.Equal)) {
                    this.expect(_tokentype.TokenType.Equal);

                    initialization.value = this.parseExpression();
                }

                initialization.line = token.line;
                initialization.column = token.column;

                initializations.push(initialization);
            } while (this.accept(_tokentype.TokenType.Comma));

            return initializations;
        }
    }, {
        key: 'parseLet',
        value: function parseLet() {
            this.expect(_tokentype.TokenType.Let);

            var letExpr = new _let.Let();

            letExpr.initializations = this.parseInitializations();

            this.expect(_tokentype.TokenType.In);

            letExpr.body = this.parseExpression();

            return letExpr;
        }
    }, {
        key: 'parseNull',
        value: function parseNull() {
            this.expect(_tokentype.TokenType.Null);

            return new _null.NullLiteral();
        }
    }, {
        key: 'parseProgram',
        value: function parseProgram() {
            var program = new _program.Program();

            while (!this.accept(_tokentype.TokenType.EndOfInput)) {
                program.classes.push(this.parseClass());
            }

            return program;
        }
    }, {
        key: 'parseProperty',
        value: function parseProperty() {
            var varToken = this.expect(_tokentype.TokenType.Var);

            var property = new _property.Property();

            property.name = this.expect(_tokentype.TokenType.Identifier).value;

            if (this.accept(_tokentype.TokenType.Colon)) {
                this.expect(_tokentype.TokenType.Colon);

                property.type = this.expect(_tokentype.TokenType.Identifier).value;
            }

            if (this.accept(_tokentype.TokenType.Equal)) {
                this.expect(_tokentype.TokenType.Equal);

                property.value = this.parseExpression();
            }

            property.line = varToken.line;
            property.column = varToken.column;

            return property;
        }
    }, {
        key: 'parseSuperFunctionCall',
        value: function parseSuperFunctionCall() {
            this.expect(_tokentype.TokenType.Super);

            this.expect(_tokentype.TokenType.Dot);

            var call = this.parseFunctionCall();

            return new _superfunctioncall.SuperFunctionCall(call.functionName, call.args);
        }
    }, {
        key: 'parseThis',
        value: function parseThis() {
            this.expect(_tokentype.TokenType.This);

            return new _this.This();
        }
    }, {
        key: 'parseWhile',
        value: function parseWhile() {
            this.expect(_tokentype.TokenType.While);

            var whileExpr = new _while.While();

            this.expect(_tokentype.TokenType.LeftParen);

            whileExpr.condition = this.parseExpression();

            this.expect(_tokentype.TokenType.RightParen);

            whileExpr.body = this.parseExpression();

            return whileExpr;
        }
    }, {
        key: 'parseExpression',
        value: function parseExpression() {
            return this.parseCast();
        }
    }, {
        key: 'parseComparison',
        value: function parseComparison() {
            return this.parseBinaryExpression(this.acceptComparisonOperator, this.parseAddition);
        }
    }, {
        key: 'parseAddition',
        value: function parseAddition() {
            return this.parseBinaryExpression(this.acceptAdditiveOperator, this.parseMultiplication);
        }
    }, {
        key: 'parseMultiplication',
        value: function parseMultiplication() {
            return this.parseBinaryExpression(this.acceptMultiplicativeOperator, this.parseDispatch);
        }
    }, {
        key: 'parseActuals',
        value: function parseActuals() {
            this.expect(_tokentype.TokenType.LeftParen);

            var actuals = [];

            if (!this.accept(_tokentype.TokenType.RightParen)) {
                do {
                    if (this.accept(_tokentype.TokenType.Comma)) {
                        this.expect(_tokentype.TokenType.Comma);
                    }

                    actuals.push(this.parseExpression());
                } while (this.accept(_tokentype.TokenType.Comma));
            }

            this.expect(_tokentype.TokenType.RightParen);

            return actuals;
        }
    }, {
        key: 'parseClassBody',
        value: function parseClassBody(klass) {
            this.expect(_tokentype.TokenType.LeftBrace);

            do {
                if (this.accept(_tokentype.TokenType.RightBrace)) {
                    break;
                }

                if (this.accept(_tokentype.TokenType.Var)) {
                    klass.properties.push(this.parseProperty());
                } else if (this.accept(_tokentype.TokenType.Func) || this.accept(_tokentype.TokenType.Private) || this.accept(_tokentype.TokenType.Override)) {
                    klass.functions.push(this.parseFunction());
                } else if (this.accept(_tokentype.TokenType.EndOfInput)) {
                    throw new Error(_report.Report.error(this.currentToken.line, this.currentToken.column, 'Unexpected end of input.'));
                } else {
                    throw new Error(_report.Report.error(this.currentToken.line, this.currentToken.column, 'Unexpected token \'' + this.currentToken.value + '\'.'));
                }
            } while (!this.accept(_tokentype.TokenType.RightBrace) && !this.accept(_tokentype.TokenType.EndOfInput));

            this.expect(_tokentype.TokenType.RightBrace);
        }
    }, {
        key: 'parseDispatch',
        value: function parseDispatch() {
            var expression = this.parseValue();

            while (this.accept(_tokentype.TokenType.Dot)) {
                this.expect(_tokentype.TokenType.Dot);

                var call = this.parseFunctionCall();

                call.object = expression;

                expression = call;
            }

            return expression;
        }
    }, {
        key: 'parseValue',
        value: function parseValue() {
            var token = this.currentToken;

            if (this.accept(_tokentype.TokenType.EndOfInput)) {
                throw new Error(_report.Report.error(token.line, token.column, 'Unexpected end of input.'));
            }

            var value = null;

            if (this.accept(_tokentype.TokenType.Integer)) {
                value = new _integer.IntegerLiteral(this.expect(_tokentype.TokenType.Integer).value);
            } else if (this.accept(_tokentype.TokenType.Decimal)) {
                value = new _decimal.DecimalLiteral(this.expect(_tokentype.TokenType.Decimal).value);
            } else if (this.accept(_tokentype.TokenType.String)) {
                value = new _string.StringLiteral(this.expect(_tokentype.TokenType.String).value);
            } else if (this.accept(_tokentype.TokenType.Null)) {
                value = this.parseNull();
            } else if (this.accept(_tokentype.TokenType.True) || this.accept(_tokentype.TokenType.False)) {
                value = new _boolean.BooleanLiteral(this.currentToken.value);

                this.currentToken = this.lexer.nextToken();
            } else if (this.accept(_tokentype.TokenType.If)) {
                value = this.parseIfElse();
            } else if (this.accept(_tokentype.TokenType.While)) {
                value = this.parseWhile();
            } else if (this.accept(_tokentype.TokenType.Let)) {
                value = this.parseLet();
            } else if (this.accept(_tokentype.TokenType.LeftBrace)) {
                value = this.parseBlock();
            } else if (this.accept(_tokentype.TokenType.New)) {
                value = this.parseConstructorCall();
            } else if (this.accept(_tokentype.TokenType.This)) {
                value = this.parseThis();
            } else if (this.accept(_tokentype.TokenType.Super)) {
                value = this.parseSuperFunctionCall();
            } else if (this.acceptUnaryOperator()) {
                var operator = this.currentToken.value;

                this.currentToken = this.lexer.nextToken();

                value = new _unaryexpression.UnaryExpression(operator, this.parseValue());
            } else if (this.accept(_tokentype.TokenType.Not)) {
                value = new _unaryexpression.UnaryExpression(this.expect(_tokentype.TokenType.Not).value, this.parseExpression());
            } else if (this.accept(_tokentype.TokenType.Minus)) {
                value = new _unaryexpression.UnaryExpression(this.expect(_tokentype.TokenType.Minus).value, this.parseExpression());
            } else if (this.accept(_tokentype.TokenType.LeftParen)) {
                this.expect(_tokentype.TokenType.LeftParen);

                value = this.parseExpression();

                this.expect(_tokentype.TokenType.RightParen);
            } else if (this.accept(_tokentype.TokenType.Identifier)) {
                var lookahead = this.lexer.lookahead();

                if (lookahead.type === _tokentype.TokenType.Equal || lookahead.type === _tokentype.TokenType.PlusEqual || lookahead.type === _tokentype.TokenType.MinusEqual || lookahead.type === _tokentype.TokenType.TimesEqual || lookahead.type === _tokentype.TokenType.DivEqual || lookahead.type === _tokentype.TokenType.ModuloEqual) {
                    value = this.parseAssignment();
                } else if (lookahead.type === _tokentype.TokenType.LeftParen) {
                    value = this.parseFunctionCall();
                } else {
                    value = new _reference.Reference(this.expect(_tokentype.TokenType.Identifier).value);
                }
            }

            if (value === null) {
                throw new Error('Unexpected \'' + token.value + '\' at ' + (token.line + 1) + ':' + (token.column + 1) + '.');
            }

            value.line = token.line;
            value.column = token.column;

            return value;
        }
    }, {
        key: 'accept',
        value: function accept(tokenType) {
            if (tokenType !== _tokentype.TokenType.Newline) {
                this.discardNewlines();
            }

            if (tokenType !== _tokentype.TokenType.EndOfInput && this.currentToken.type === _token.Token.EndOfInput) {
                return false;
            }

            return this.currentToken.type === tokenType;
        }
    }, {
        key: 'expect',
        value: function expect(tokenType) {
            if (tokenType !== _tokentype.TokenType.Newline) {
                this.discardNewlines();
            }

            var token = new _token.Token(this.currentToken.type, this.currentToken.value, this.currentToken.line, this.currentToken.column);

            if (tokenType !== _tokentype.TokenType.EndOfInput && token.type === _tokentype.TokenType.EndOfInput) {
                throw new Error(_report.Report.error(token.line, token.column, 'Expected \'' + tokenType + '\' but reached end of input.'));
            }

            if (token.type !== tokenType) {
                throw new Error(_report.Report.error(token.line, token.column, 'Expected \'' + tokenType + '\' but found \'' + token.value + '\'.'));
            }

            this.currentToken = this.lexer.nextToken();

            return token;
        }
    }, {
        key: 'acceptOperator',
        value: function acceptOperator() {
            return this.acceptAdditiveOperator() || this.acceptComparisonOperator() || this.acceptMultiplicativeOperator() || this.acceptBooleanOperator() || this.acceptOtherOperator();
        }
    }, {
        key: 'acceptCastOperator',
        value: function acceptCastOperator() {
            return this.accept(_tokentype.TokenType.As);
        }
    }, {
        key: 'acceptAdditiveOperator',
        value: function acceptAdditiveOperator() {
            return this.acceptOneOf(_tokentype.TokenType.Plus, _tokentype.TokenType.Minus);
        }
    }, {
        key: 'acceptMultiplicativeOperator',
        value: function acceptMultiplicativeOperator() {
            return this.acceptOneOf(_tokentype.TokenType.Times, _tokentype.TokenType.Div, _tokentype.TokenType.Modulo);
        }
    }, {
        key: 'acceptComparisonOperator',
        value: function acceptComparisonOperator() {
            return this.acceptOneOf(_tokentype.TokenType.Less, _tokentype.TokenType.LessOrEqual, _tokentype.TokenType.Greater, _tokentype.TokenType.GreaterOrEqual, _tokentype.TokenType.DoubleEqual, _tokentype.TokenType.NotEqual);
        }
    }, {
        key: 'acceptBooleanOperator',
        value: function acceptBooleanOperator() {
            return this.acceptOneOf(_tokentype.TokenType.And, _tokentype.TokenType.Or, _tokentype.TokenType.DoubleEqual, _tokentype.TokenType.NotEqual);
        }
    }, {
        key: 'acceptAssignmentOperator',
        value: function acceptAssignmentOperator() {
            return this.acceptOneOf(_tokentype.TokenType.Equal, _tokentype.TokenType.PlusEqual, _tokentype.TokenType.MinusEqual, _tokentype.TokenType.TimesEqual, _tokentype.TokenType.DivEqual, _tokentype.TokenType.ModuloEqual);
        }
    }, {
        key: 'acceptUnaryOperator',
        value: function acceptUnaryOperator() {
            return this.acceptOneOf(_tokentype.TokenType.Plus, _tokentype.TokenType.Minus, _tokentype.TokenType.Times, _tokentype.TokenType.Div, _tokentype.TokenType.Modulo, _tokentype.TokenType.Tilde, _tokentype.TokenType.Dollar, _tokentype.TokenType.Caret);
        }
    }, {
        key: 'acceptOtherOperator',
        value: function acceptOtherOperator() {
            return this.acceptOneOf(_tokentype.TokenType.Tilde, _tokentype.TokenType.TildeEqual, _tokentype.TokenType.Dollar, _tokentype.TokenType.DollarEqual, _tokentype.TokenType.Caret, _tokentype.TokenType.CaretEqual);
        }
    }, {
        key: 'acceptOneOf',
        value: function acceptOneOf() {
            for (var _len = arguments.length, tokenTypes = Array(_len), _key = 0; _key < _len; _key++) {
                tokenTypes[_key] = arguments[_key];
            }

            if (tokenTypes.indexOf(_tokentype.TokenType.Newline) < 0) {
                this.discardNewlines();
            }

            var type = this.currentToken.type;

            if (type === _tokentype.TokenType.EndOfInput) {
                return false;
            }

            return tokenTypes.indexOf(type) >= 0;
        }
    }, {
        key: 'discardNewlines',
        value: function discardNewlines() {
            while (this.currentToken.type === _tokentype.TokenType.Newline) {
                this.currentToken = this.lexer.nextToken();
            }
        }
    }]);

    return Parser;
}();
//# sourceMappingURL=parser.js.map