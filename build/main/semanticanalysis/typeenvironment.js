'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TypeEnvironment = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class = require('../ast/class');

var _func = require('../ast/func');

var _symboltable = require('./symboltable');

var _types = require('../types/types');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TypeEnvironment = exports.TypeEnvironment = function () {
    function TypeEnvironment() {
        _classCallCheck(this, TypeEnvironment);

        this.classes = new Map();
        this.symbolTable = new _symboltable.SymbolTable();
        this.functions = new Map();
        this.currentClass = null;
    }

    _createClass(TypeEnvironment, [{
        key: 'addClass',
        value: function addClass(klass) {
            this.classes.set(klass.name, klass);
            this.functions.set(klass.name, []);
        }
    }, {
        key: 'hasClass',
        value: function hasClass(className) {
            return this.classes.has(className);
        }
    }, {
        key: 'getClass',
        value: function getClass(className) {
            return this.classes.get(className);
        }
    }, {
        key: 'removeClass',
        value: function removeClass(className) {
            return this.classes.delete(className);
        }
    }, {
        key: 'addFunction',
        value: function addFunction(className, func) {
            this.functions.get(className).push(func);
        }
    }, {
        key: 'hasFunction',
        value: function hasFunction(className, func) {
            return this.functions.get(className).some(function (m) {
                return m.equals(func);
            });
        }
    }, {
        key: 'getFunction',
        value: function getFunction(className, functionName) {
            return this.functions.get(className).find(function (func) {
                return func.name === functionName;
            });
        }
    }, {
        key: 'conform',
        value: function conform(classNameA, classNameB) {
            var classA = this.find(classNameA);
            var classB = this.find(classNameB);

            do {
                if (classA.superClass === classB.name) {
                    return true;
                }

                if (classB.superClass === undefined) {
                    return false;
                }

                classB = this.find(classB.superClass);
            } while (classB !== undefined);

            return false;
        }
    }]);

    return TypeEnvironment;
}();
//# sourceMappingURL=typeenvironment.js.map