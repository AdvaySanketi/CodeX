"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Report = exports.Report = function () {
    function Report() {
        _classCallCheck(this, Report);
    }

    _createClass(Report, null, [{
        key: "error",
        value: function error(line, column, message) {
            if (line === undefined || column === undefined) {
                return message;
            }

            return line + 1 + ":" + (column + 1) + ": " + message;
        }
    }]);

    return Report;
}();
//# sourceMappingURL=report.js.map