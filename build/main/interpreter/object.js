'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Obj = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _types = require('../types/types');

var _typesutils = require('../types/typesutils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Obj = exports.Obj = function () {
    function Obj() {
        var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
        var properties = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Map();
        var methods = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
        var address = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;

        _classCallCheck(this, Obj);

        this.type = type;
        this.properties = properties;
        this.functions = methods;
        this.address = address;
    }

    _createClass(Obj, [{
        key: 'get',
        value: function get(propertyName) {
            return this.properties.get(propertyName);
        }
    }, {
        key: 'set',
        value: function set(propertyName, value) {
            this.properties.set(propertyName, value);
        }
    }, {
        key: 'has',
        value: function has(propertyName) {
            return this.properties.has(propertyName);
        }
    }, {
        key: 'getMethod',
        value: function getMethod(methodName, argsTypes) {
            var methods = this.functions.filter(function (method) {
                return method.name === methodName;
            });

            for (var i = 0, length = methods.length; i < length; ++i) {
                var method = methods[i];
                var parametersTypes = method.parameters.map(function (param) {
                    return param.type;
                });

                if (_typesutils.TypesUtils.allEqual(argsTypes, parametersTypes)) {
                    return method;
                }
            }

            return null;
        }
    }, {
        key: 'getMostSpecificFunction',
        value: function getMostSpecificFunction(functionName, argsTypes, context) {
            var functions = this.functions.filter(function (func) {
                return func.name === functionName;
            });

            if (functions.length === 0) {
                return undefined;
            }

            functions = functions.filter(function (method) {
                return _typesutils.TypesUtils.allConform(argsTypes, method.parameters.map(function (param) {
                    return param.type;
                }), context);
            });

            if (functions.length === 0) {
                return undefined;
            }

            return functions.reduce(function (curr, prev) {
                return _typesutils.TypesUtils.mostSpecificFunction(curr, prev, context);
            });
        }
    }, {
        key: 'findMethodIndex',
        value: function findMethodIndex(method) {
            for (var i = 0, l = this.functions.length; i < l; ++i) {
                if (this.functions[i].equals(method)) {
                    return i;
                }
            }

            return -1;
        }
    }, {
        key: 'toString',
        value: function toString() {
            var str = this.type + '(';

            var l = this.properties.keys.length;

            for (var i = 0; i < l - 1; ++i) {
                str += this.properties.keys[i] + ': ' + this.properties.get(this.properties.keys[i]) + ', ';
            }

            str += this.properties.keys[l - 1] + ': ' + this.properties.get(this.properties.keys[l - 1]);

            str += ')';

            return str;
        }
    }], [{
        key: 'create',
        value: function create(context, className) {
            var klass = context.getClass(className);

            var object = klass.superClass !== undefined ? Obj.create(context, klass.superClass) : new Obj(className);

            klass.parameters.forEach(function (param) {
                object.properties.set(param.identifier, Obj.defaultValue(context, param.type));
            });

            klass.properties.forEach(function (variable) {
                object.properties.set(variable.identifier, Obj.defaultValue(context, variable.type));
            });

            klass.functions.forEach(function (method) {
                var superClassMethodIndex = object.findMethodIndex(method);

                if (superClassMethodIndex !== -1 && method.override) {
                    object.functions.splice(superClassMethodIndex, 1);
                }

                object.functions.push(method);
            });

            object.type = className;

            return object;
        }
    }, {
        key: 'defaultValue',
        value: function defaultValue(context, type) {
            if (_typesutils.TypesUtils.isInternal(type)) {
                return undefined;
            }

            var value = null;

            switch (type) {
                case _types.Types.Int:
                    value = Obj.create(context, _types.Types.Int);
                    value.set('value', 0);

                    break;

                case _types.Types.Double:
                    value = Obj.create(context, _types.Types.Double);
                    value.set('value', 0.0);

                    break;

                case _types.Types.Bool:
                    value = Obj.create(context, _types.Types.Bool);
                    value.set('value', false);

                    break;

                case _types.Types.String:
                    value = Obj.create(context, _types.Types.String);
                    value.set('value', '""');

                    break;

                default:
                    value = Obj.create(context, _types.Types.Null);

                    break;
            }

            return value;
        }
    }]);

    return Obj;
}();
//# sourceMappingURL=object.js.map