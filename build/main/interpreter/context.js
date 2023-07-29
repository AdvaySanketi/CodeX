'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Context = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _environment = require('./environment');

var _store = require('./store');

var _types = require('../types/types');

var _typesutils = require('../types/typesutils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Context = exports.Context = function () {
    function Context() {
        var classes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Map();
        var environment = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new _environment.Environment();
        var store = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new _store.Store();
        var self = arguments[3];

        _classCallCheck(this, Context);

        this.classes = classes;
        this.environment = environment;
        this.store = store;
        this.self = self;
    }

    _createClass(Context, [{
        key: 'addClass',
        value: function addClass(klass) {
            this.classes.set(klass.name, klass);
        }
    }, {
        key: 'getClass',
        value: function getClass(className) {
            return this.classes.get(className);
        }
    }, {
        key: 'removeClass',
        value: function removeClass(className) {
            this.classes.delete(className);
        }
    }, {
        key: 'copy',
        value: function copy() {
            return Object.assign(new Context(), this);
        }
    }]);

    return Context;
}();
//# sourceMappingURL=context.js.map