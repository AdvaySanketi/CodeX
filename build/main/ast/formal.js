"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Formal = exports.Formal = function Formal(identifier, type) {
    var lazy = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var line = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : -1;
    var column = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : -1;

    _classCallCheck(this, Formal);

    this.identifier = identifier;
    this.type = type;
    this.lazy = lazy;
    this.line = line;
    this.column = column;
};
//# sourceMappingURL=formal.js.map