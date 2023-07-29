'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SymbolTable = exports.SymbolTable = function () {
    function SymbolTable() {
        _classCallCheck(this, SymbolTable);

        this.namespaces = new Map();
        this.enterNamespace('default');
    }

    _createClass(SymbolTable, [{
        key: 'enterNamespace',
        value: function enterNamespace(namespace) {
            if (!this.namespaces.has(namespace)) {
                this.namespaces.set(namespace, []);
            }

            this.scopes = this.namespaces.get(namespace);
            this.currentScopeIndex = -1;
            this.scope = null;
        }
    }, {
        key: 'enterScope',
        value: function enterScope() {
            if (this.currentScopeIndex + 1 >= this.scopes.length) {
                this.scopes.push(new Map());
            }

            this.scope = this.scopes[++this.currentScopeIndex];
        }
    }, {
        key: 'add',
        value: function add(symbol) {
            if (this.scope !== null) {
                this.scope.set(symbol.identifier, symbol);
            }
        }
    }, {
        key: 'check',
        value: function check(identifier) {
            if (this.scope === null) {
                return false;
            }

            return this.scope.has(identifier);
        }
    }, {
        key: 'scopesCount',
        value: function scopesCount() {
            return this.scopes.length;
        }
    }, {
        key: 'find',
        value: function find(identifier) {
            if (this.scope === null) {
                return undefined;
            }

            var symbol = undefined;
            var scope = this.scope;
            var scopeIndex = this.currentScopeIndex;

            while (symbol === undefined && scopeIndex >= 0) {
                symbol = scope.get(identifier);
                scope = this.scopes[--scopeIndex];
            }

            return symbol;
        }
    }, {
        key: 'exitScope',
        value: function exitScope() {
            this.scopes.splice(this.currentScopeIndex, 1);

            this.scope = --this.currentScopeIndex >= 0 ? this.scopes[this.currentScopeIndex] : null;
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.namespaces = new Map();
            this.enterNamespace('default');
        }
    }]);

    return SymbolTable;
}();
//# sourceMappingURL=symboltable.js.map