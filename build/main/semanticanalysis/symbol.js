"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _Symbol = function _Symbol(identifier, type) {
    var line = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;
    var column = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : -1;

    _classCallCheck(this, _Symbol);

    this.identifier = identifier;
    this.type = type;
    this.line = line;
    this.column = column;
};

exports.Symbol = _Symbol;
//# sourceMappingURL=symbol.js.map