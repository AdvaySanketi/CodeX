'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CharUtils = exports.CharUtils = function () {
    function CharUtils() {
        _classCallCheck(this, CharUtils);
    }

    _createClass(CharUtils, null, [{
        key: 'isLetterOrDigit',
        value: function isLetterOrDigit(char) {
            return CharUtils.isLetter(char) || CharUtils.isDigit(char);
        }
    }, {
        key: 'isLetter',
        value: function isLetter(char) {
            var code = char.charCodeAt(0);

            return code >= 65 && code <= 90 || code >= 97 && code <= 122;
        }
    }, {
        key: 'isDigit',
        value: function isDigit(char) {
            var code = char.charCodeAt(0);

            return code >= 48 && code <= 57;
        }
    }, {
        key: 'isWhitespace',
        value: function isWhitespace(char) {
            return (/[ \t\r\f\v\u00A0\u2028\u2029]/.test(char)
            );
        }
    }, {
        key: 'isDelimiter',
        value: function isDelimiter(char) {
            return char === '{' || char === '[' || char === '(' || char === '}' || char === ']' || char === ')' || char === ':' || char === ',';
        }
    }, {
        key: 'isNewline',
        value: function isNewline(char) {
            return char === '\n' || char === '\r\n';
        }
    }, {
        key: 'isDot',
        value: function isDot(char) {
            return char === '.';
        }
    }, {
        key: 'isOperator',
        value: function isOperator(char) {
            return char === '+' || char === '-' || char === '*' || char === '/' || char === '=' || char === '>' || char === '<' || char === '!' || char === '&' || char === '|' || char === '%' || char === '~' || char === '$' || char === '~' || char === '^';
        }
    }, {
        key: 'isIdentifierPart',
        value: function isIdentifierPart(char) {
            return char === '_' || CharUtils.isLetterOrDigit(char) || CharUtils.isOperator(char);
        }
    }, {
        key: 'isBeginningOfIdentifier',
        value: function isBeginningOfIdentifier(char) {
            return CharUtils.isLetter(char) || char === '_';
        }
    }, {
        key: 'isBeginningOfNumber',
        value: function isBeginningOfNumber(char) {
            return CharUtils.isDigit(char) || char === '.';
        }
    }, {
        key: 'isBeginningOfString',
        value: function isBeginningOfString(char) {
            return char === '"';
        }
    }, {
        key: 'isExponentSymbol',
        value: function isExponentSymbol(char) {
            return char === 'e' || char === 'E';
        }
    }, {
        key: 'isBeginningOfLiteral',
        value: function isBeginningOfLiteral(char) {
            return CharUtils.isLetter(char) || CharUtils.isBeginningOfIdentifier(char) || CharUtils.isBeginningOfNumber(char) || CharUtils.isBeginningOfString(char);
        }
    }, {
        key: 'isEscapeCharacter',
        value: function isEscapeCharacter(char) {
            return char === '\\';
        }
    }, {
        key: 'isEndOfEscapeSequence',
        value: function isEndOfEscapeSequence(char) {
            return char === '\"' || char === '\\' || char === 'n' || char === 'r' || char === 't' || char === 'b' || char === 'f' || char === 'v' || char === '0';
        }
    }, {
        key: 'isStringDelimiter',
        value: function isStringDelimiter(char) {
            return char === '\"';
        }
    }]);

    return CharUtils;
}();
//# sourceMappingURL=charutils.js.map