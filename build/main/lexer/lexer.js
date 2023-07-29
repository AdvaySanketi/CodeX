'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Lexer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _charutils = require('../util/charutils');

var _fsm = require('./fsm/fsm');

var _report = require('../util/report');

var _token = require('./token');

var _tokentype = require('./tokentype');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Lexer = exports.Lexer = function () {
    function Lexer(input) {
        _classCallCheck(this, Lexer);

        this.input = input;
        this.inputSize = input.length;
        this.buffer = [];
        this.position = 0;
        this.line = 0;
        this.column = 0;
    }

    _createClass(Lexer, [{
        key: 'tokenize',
        value: function tokenize() {
            var tokens = [];

            var token = null;

            do {
                token = this.nextToken();

                if (token.type === _tokentype.TokenType.EndOfInput) {
                    break;
                }

                tokens.push(token);
            } while (token.type !== _tokentype.TokenType.EndOfInput);

            return tokens;
        }
    }, {
        key: 'nextToken',
        value: function nextToken() {
            if (this.buffer.length > 0) {
                return this.buffer.pop();
            }

            return this.readToken();
        }
    }, {
        key: 'lookahead',
        value: function lookahead() {
            var token = this.readToken();

            this.buffer.push(token);

            return token;
        }
    }, {
        key: 'readToken',
        value: function readToken() {
            this.skipWhitespaces();

            if (this.position >= this.inputSize) {
                return new _token.Token(_tokentype.TokenType.EndOfInput);
            }

            var symbol = this.input.charAt(this.position);

            if (_charutils.CharUtils.isBeginningOfLiteral(symbol)) {
                return this.recognizeLiteral();
            }

            if (_charutils.CharUtils.isOperator(symbol)) {
                return this.recognizeOperator();
            }

            if (_charutils.CharUtils.isDelimiter(symbol)) {
                return this.recognizeDelimiter();
            }

            if (_charutils.CharUtils.isDot(symbol)) {
                var column = this.column;

                this.position++;
                this.column++;

                return new _token.Token(_tokentype.TokenType.Dot, '.', this.line, column);
            }

            if (_charutils.CharUtils.isNewline(symbol)) {
                var line = this.line;
                var _column = this.column;

                this.position++;
                this.line++;
                this.column = 0;

                return new _token.Token(_tokentype.TokenType.Newline, '\n', line, _column);
            }

            throw new Error(_report.Report.error(this.line, this.column, 'Unrecognized token \'' + symbol + '\'.'));
        }
    }, {
        key: 'recognizeLiteral',
        value: function recognizeLiteral() {
            var symbol = this.input.charAt(this.position);

            if (_charutils.CharUtils.isLetter(symbol)) {
                return this.recognizeKeywordOrIdentifier();
            }

            if (_charutils.CharUtils.isBeginningOfIdentifier(symbol)) {
                return this.recognizeIdentifier();
            }

            if (_charutils.CharUtils.isBeginningOfNumber(symbol)) {
                return this.recognizeNumber();
            }

            if (_charutils.CharUtils.isBeginningOfString(symbol)) {
                return this.recognizeString();
            }

            throw new Error(_report.Report.error(this.line, this.column, 'Unrecognized token \'' + symbol + '\'.'));
        }
    }, {
        key: 'recognizeKeywordOrIdentifier',
        value: function recognizeKeywordOrIdentifier() {
            var token = this.recognizeKeyword();

            return token !== null ? token : this.recognizeIdentifier();
        }
    }, {
        key: 'recognizeKeyword',
        value: function recognizeKeyword() {
            var symbol = this.input.charAt(this.position);

            var keywords = Object.keys(_tokentype.TokenType).filter(function (key) {
                return _tokentype.TokenType[key].charAt(0) === symbol;
            });

            for (var i in keywords) {
                var keyword = keywords[i];

                var token = this.recognizeToken(_tokentype.TokenType[keyword]);

                if (token !== null) {
                    var offset = token.value.length;

                    if (_charutils.CharUtils.isIdentifierPart(this.input.charAt(this.position + offset))) {
                        return null;
                    }

                    this.position += offset;
                    this.column += offset;

                    return token;
                }
            }

            return null;
        }
    }, {
        key: 'recognizeIdentifier',
        value: function recognizeIdentifier() {
            var identifier = '';

            while (this.position < this.inputSize) {
                var symbol = this.input.charAt(this.position);

                if (!_charutils.CharUtils.isIdentifierPart(symbol)) {
                    break;
                }

                identifier += symbol;

                this.position++;
            }

            var column = this.column;

            this.column += identifier.length;

            return new _token.Token(_tokentype.TokenType.Identifier, identifier, this.line, column);
        }
    }, {
        key: 'recognizeNumber',
        value: function recognizeNumber() {
            var recognizer = this.buildNumberRecognizer();

            var _recognizer$run = recognizer.run(this.input.substring(this.position)),
                recognized = _recognizer$run.recognized,
                value = _recognizer$run.value;

            if (!recognized) {
                throw new Error(_report.Report.error(this.line, this.column, 'Unrecognized number literal.'));
            }

            if (this.input.charAt(this.position) === '.' && value === '.') {
                this.position++;
                this.column++;

                return new _token.Token(_tokentype.TokenType.Dot, '.', this.line, this.column - 1);
            }

            var offset = value.length;

            if (value.charAt(offset - 1) === '.') {
                value = value.substring(0, offset - 1);
                offset--;
            }

            var column = this.column;

            this.position += offset;
            this.column += offset;

            return new _token.Token(value.includes('.') || value.includes('e') || value.includes('E') ? _tokentype.TokenType.Decimal : _tokentype.TokenType.Integer, value, this.line, column);
        }
    }, {
        key: 'recognizeString',
        value: function recognizeString() {
            var recognizer = this.buildStringRecognizer();

            var _recognizer$run2 = recognizer.run(this.input.substring(this.position)),
                recognized = _recognizer$run2.recognized,
                value = _recognizer$run2.value;

            if (!recognized) {
                throw new Error(_report.Report.error(this.line, this.column, 'Invalid string literal.'));
            }

            var offset = value.length;
            var column = this.column;

            this.position += offset;
            this.column += offset;

            return new _token.Token(_tokentype.TokenType.String, value, this.line, column);
        }
    }, {
        key: 'recognizeToken',
        value: function recognizeToken(token) {
            var length = token.length;

            for (var i = 0; i < length; ++i) {
                if (this.input.charAt(this.position + i) !== token.charAt(i)) {
                    return null;
                }
            }

            return new _token.Token(token, token, this.line, this.column);
        }
    }, {
        key: 'recognizeDelimiter',
        value: function recognizeDelimiter() {
            var symbol = this.input.charAt(this.position);

            var column = this.column;

            this.position++;
            this.column++;

            switch (symbol) {
                case '{':
                    return new _token.Token(_tokentype.TokenType.LeftBrace, '{', this.line, column);

                case '}':
                    return new _token.Token(_tokentype.TokenType.RightBrace, '}', this.line, column);

                case '[':
                    return new _token.Token(_tokentype.TokenType.LeftBracket, '[', this.line, column);

                case ']':
                    return new _token.Token(_tokentype.TokenType.RightBracket, ']', this.line, column);

                case '(':
                    return new _token.Token(_tokentype.TokenType.LeftParen, '(', this.line, column);

                case ')':
                    return new _token.Token(_tokentype.TokenType.RightParen, ')', this.line, column);

                case ',':
                    return new _token.Token(_tokentype.TokenType.Comma, ',', this.line, column);

                case ':':
                    return new _token.Token(_tokentype.TokenType.Colon, ':', this.line, column);

                default:
                    throw new Error(_report.Report.error(this.line, this.column, 'Unrecognized token \'' + symbol + '\'.'));
            }
        }
    }, {
        key: 'recognizeOperator',
        value: function recognizeOperator() {
            var symbol = this.input.charAt(this.position);
            var lookahead = this.position + 1 < this.inputSize ? this.input.charAt(this.position + 1) : null;
            var column = this.column;

            if (lookahead !== null && (lookahead === '=' || lookahead === '&' || lookahead === '|' || lookahead === '-')) {
                this.position++;
                this.column++;
            }

            this.position++;
            this.column++;

            switch (symbol) {
                case '=':
                    return lookahead !== null && lookahead === '=' ? new _token.Token(_tokentype.TokenType.DoubleEqual, '==', this.line, column) : new _token.Token(_tokentype.TokenType.Equal, '=', this.line, column);

                case '%':
                    return lookahead !== null && lookahead === '=' ? new _token.Token(_tokentype.TokenType.ModuloEqual, '%=', this.line, column) : new _token.Token(_tokentype.TokenType.Modulo, '%', this.line, column);

                case '+':
                    return lookahead !== null && lookahead === '=' ? new _token.Token(_tokentype.TokenType.PlusEqual, '+=', this.line, column) : new _token.Token(_tokentype.TokenType.Plus, '+', this.line, column);

                case '*':
                    return lookahead !== null && lookahead === '=' ? new _token.Token(_tokentype.TokenType.TimesEqual, '*=', this.line, column) : new _token.Token(_tokentype.TokenType.Times, '*', this.line, column);

                case '>':
                    return lookahead !== null && lookahead === '=' ? new _token.Token(_tokentype.TokenType.GreaterOrEqual, '>=', this.line, column) : new _token.Token(_tokentype.TokenType.Greater, '>', this.line, column);

                case '!':
                    return lookahead !== null && lookahead === '=' ? new _token.Token(_tokentype.TokenType.NotEqual, '!=', this.line, column) : new _token.Token(_tokentype.TokenType.Not, '!', this.line, column);

                case '~':
                    return lookahead !== null && lookahead === '=' ? new _token.Token(_tokentype.TokenType.TildeEqual, '~=', this.line, column) : new _token.Token(_tokentype.TokenType.Tilde, '~', this.line, column);

                case '$':
                    return lookahead !== null && lookahead === '=' ? new _token.Token(_tokentype.TokenType.DollarEqual, '$=', this.line, column) : new _token.Token(_tokentype.TokenType.Dollar, '$', this.line, column);

                case '^':
                    return lookahead !== null && lookahead === '=' ? new _token.Token(_tokentype.TokenType.CaretEqual, '^=', this.line, column) : new _token.Token(_tokentype.TokenType.Caret, '^', this.line, column);

                case '&':
                    if (lookahead !== null && lookahead === '&') {
                        return new _token.Token(_tokentype.TokenType.And, '&&', this.line, column);
                    }

                    throw new Error(_report.Report.error(this.line, this.column, 'Unrecognized token \'' + symbol + '\'.'));

                case '|':
                    if (lookahead !== null && lookahead === '|') {
                        return new _token.Token(_tokentype.TokenType.Or, '||', this.line, column);
                    }

                    throw new Error(_report.Report.error(this.line, this.column, 'Unrecognized token \'' + symbol + '\'.'));

                case '/':
                    if (lookahead !== '=' && lookahead !== '/') {
                        return new _token.Token(_tokentype.TokenType.Div, '/', this.line, column);
                    }

                    if (lookahead === '=') {
                        return new _token.Token(_tokentype.TokenType.DivEqual, '/=', this.line, column);
                    }

                    if (lookahead === '/') {
                        this.skipUntilNewline();

                        return this.nextToken();
                    }

                    break;

                case '<':
                    if (lookahead !== '=' && lookahead !== '-') {
                        return new _token.Token(_tokentype.TokenType.Less, '<', this.line, column);
                    }

                    if (lookahead === '=') {
                        return new _token.Token(_tokentype.TokenType.LessOrEqual, '<=', this.line, column);
                    }

                    if (lookahead === '-') {
                        return new _token.Token(_tokentype.TokenType.LeftArrow, '<-', this.line, column);
                    }

                    break;

                case '-':
                    if (lookahead === null || lookahead !== '=' && lookahead !== '>') {
                        return new _token.Token(_tokentype.TokenType.Minus, '-', this.line, column);
                    }

                    if (lookahead === '=') {
                        return new _token.Token(_tokentype.TokenType.MinusEqual, '-=', this.line, column);
                    }

                    if (lookahead === '>') {
                        return new _token.Token(_tokentype.TokenType.RightArrow, '->', this.line, column);
                    }

                    throw new Error(_report.Report.error(this.line, this.column, 'Unrecognized token \'' + symbol + '\'.'));

                default:
                    throw new Error(_report.Report.error(this.line, this.column, 'Unrecognized token \'' + symbol + '\'.'));
            }
        }
    }, {
        key: 'buildStringRecognizer',
        value: function buildStringRecognizer() {
            var recognizer = new _fsm.Fsm();

            recognizer.states = new Set(['Start', 'StartString', 'Character', 'Backslash', 'EscapeSequence', 'EndString']);

            recognizer.startState = 'Start';

            recognizer.finalStates = new Set(['EndString']);

            recognizer.transition = function (state, symbol) {
                switch (state) {
                    case 'Start':
                        if (_charutils.CharUtils.isStringDelimiter(symbol)) {
                            return 'StartString';
                        }
                        break;

                    case 'StartString':
                    case 'Character':
                        if (_charutils.CharUtils.isStringDelimiter(symbol)) {
                            return 'EndString';
                        }

                        if (_charutils.CharUtils.isEscapeCharacter(symbol)) {
                            return 'Backslash';
                        }

                        return 'Character';

                    case 'Backslash':
                        if (_charutils.CharUtils.isEndOfEscapeSequence(symbol)) {
                            return 'EscapeSequence';
                        }
                        break;

                    case 'EscapeSequence':
                        if (_charutils.CharUtils.isStringDelimiter(symbol)) {
                            return 'EndString';
                        }

                        if (_charutils.CharUtils.isEscapeCharacter(symbol)) {
                            return 'Backslash';
                        }

                        return 'Character';

                    default:
                        break;
                }

                return _fsm.InvalidFsmState;
            };

            return recognizer;
        }
    }, {
        key: 'buildNumberRecognizer',
        value: function buildNumberRecognizer() {
            var recognizer = new _fsm.Fsm();

            recognizer.states = new Set(['Start', 'Zero', 'Integer', 'StartDecimal', 'Decimal', 'StartExponentNotation', 'NumberInExponentNotation', 'End']);

            recognizer.startState = 'Start';

            recognizer.finalStates = new Set(['Zero', 'Integer', 'StartDecimal', 'Decimal', 'NumberInExponentNotation', 'End']);

            recognizer.transition = function (state, symbol) {
                switch (state) {
                    case 'Start':
                        if (symbol === '0') {
                            return 'Zero';
                        }

                        if (symbol === '.') {
                            return 'StartDecimal';
                        }

                        if (_charutils.CharUtils.isDigit(symbol)) {
                            return 'Integer';
                        }

                        break;

                    case 'Zero':
                        if (_charutils.CharUtils.isExponentSymbol(symbol)) {
                            return 'StartExponentNotation';
                        }

                        if (symbol == '.') {
                            return 'StartDecimal';
                        }

                        break;

                    case 'Integer':
                        if (_charutils.CharUtils.isDigit(symbol)) {
                            return 'Integer';
                        }

                        if (_charutils.CharUtils.isExponentSymbol(symbol)) {
                            return 'StartExponentNotation';
                        }

                        if (symbol == '.') {
                            return 'StartDecimal';
                        }

                        break;

                    case 'StartDecimal':
                        if (_charutils.CharUtils.isDigit(symbol)) {
                            return 'Decimal';
                        }

                        return _fsm.InvalidFsmState;

                    case 'StartExponentNotation':
                        if (_charutils.CharUtils.isDigit(symbol) || symbol === '-') {
                            return 'NumberInExponentNotation';
                        }

                        break;

                    case 'Decimal':
                        if (_charutils.CharUtils.isDigit(symbol)) {
                            return 'Decimal';
                        }

                        if (_charutils.CharUtils.isExponentSymbol(symbol)) {
                            return 'StartExponentNotation';
                        }

                        break;

                    case 'NumberInExponentNotation':
                        if (_charutils.CharUtils.isDigit(symbol)) {
                            return 'NumberInExponentNotation';
                        }

                        break;

                    default:
                        break;
                }

                return _fsm.InvalidFsmState;
            };

            return recognizer;
        }
    }, {
        key: 'skipWhitespaces',
        value: function skipWhitespaces() {
            while (this.position < this.inputSize && _charutils.CharUtils.isWhitespace(this.input.charAt(this.position))) {
                this.position++;
                this.column++;
            }
        }
    }, {
        key: 'skipUntilNewline',
        value: function skipUntilNewline() {
            while (this.position < this.inputSize && !_charutils.CharUtils.isNewline(this.input.charAt(this.position))) {
                this.position++;
                this.column++;
            }
        }
    }]);

    return Lexer;
}();
//# sourceMappingURL=lexer.js.map