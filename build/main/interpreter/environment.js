"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Environment = exports.Environment = function () {
    function Environment() {
        _classCallCheck(this, Environment);

        this.scopes = [];
        this.scope = null;
        this.currentScopeIndex = -1;
    }

    _createClass(Environment, [{
        key: "enterScope",
        value: function enterScope() {
            if (this.currentScopeIndex + 1 >= this.scopes.length) {
                this.scopes.push(new Map());
            }

            this.scope = this.scopes[++this.currentScopeIndex];
        }
    }, {
        key: "add",
        value: function add(identifier, address) {
            if (this.scope !== null) {
                this.scope.set(identifier, address);
            }
        }
    }, {
        key: "find",
        value: function find(identifier) {
            if (this.scope === null) {
                return undefined;
            }

            var address = undefined;
            var scope = this.scope;
            var index = this.currentScopeIndex;

            while (address === undefined && index >= 0) {
                address = scope.get(identifier);
                scope = this.scopes[--index];
            }

            return address;
        }
    }, {
        key: "exitScope",
        value: function exitScope() {
            this.scopes.splice(this.currentScopeIndex, 1);

            this.scope = --this.currentScopeIndex >= 0 ? this.scopes[this.currentScopeIndex] : null;
        }
    }]);

    return Environment;
}();
//# sourceMappingURL=environment.js.map