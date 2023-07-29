'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TypesUtils = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _types = require('./types');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TypesUtils = exports.TypesUtils = function () {
    function TypesUtils() {
        _classCallCheck(this, TypesUtils);
    }

    _createClass(TypesUtils, null, [{
        key: 'leastUpperBound',
        value: function leastUpperBound(typeA, typeB, env) {
            if (typeA === typeB) {
                return typeA;
            }

            if (typeA === _types.Types.Null) {
                return typeB;
            }

            if (typeB === _types.Types.Null) {
                return typeA;
            }

            var classA = env.getClass(typeA);
            var classB = env.getClass(typeB);

            if (classA.superClass === classB.superClass) {
                return classA.superClass;
            }

            if (this.inheritanceIndex(typeA, _types.Types.Object, env) > this.inheritanceIndex(typeB, _types.Types.Object, env)) {
                return this.leastUpperBound(classA.superClass, typeB, env);
            }

            return this.leastUpperBound(typeA, classB.superClass, env);
        }
    }, {
        key: 'inheritanceIndex',
        value: function inheritanceIndex(typeA, typeB, env) {
            var index = 0;

            while (typeA !== undefined && typeA !== typeB) {
                index++;

                typeA = env.getClass(typeA).superClass;
            }

            return index;
        }
    }, {
        key: 'findMethodToApply',
        value: function findMethodToApply(klass, name, argsTypes, env) {
            var _this = this;

            var methods = this.findMethods(klass, name, argsTypes, env);

            if (methods.length === 0) {
                return undefined;
            }

            methods = methods.filter(function (method) {
                return _this.allConform(argsTypes, method.parameters.map(function (param) {
                    return param.type;
                }), env);
            });

            if (methods.length === 0) {
                return undefined;
            }

            return methods.reduce(function (curr, prev) {
                return _this.mostSpecificFunction(curr, prev, env);
            });
        }
    }, {
        key: 'findMethods',
        value: function findMethods(klass, name, argsTypes, env) {
            var methods = [];

            var index = function index(method) {
                for (var i = 0, l = methods.length; i < l; ++i) {
                    if (methods[i].equals(method)) {
                        return i;
                    }

                    return -1;
                }
            };

            var collect = function collect(cls) {
                if (cls.superClass !== undefined) {
                    collect(env.getClass(cls.superClass));
                }

                cls.functions.filter(function (method) {
                    return method.name === name && method.parameters.length === argsTypes.length;
                }).forEach(function (method) {
                    var i = index(method);

                    if (i !== -1 && method.override) {
                        methods.splice(i, 1);
                    }

                    methods.push(method);
                });
            };

            collect(klass);

            return methods;
        }
    }, {
        key: 'findOverridedFunction',
        value: function findOverridedFunction(superClassName, overridingMethod, env) {
            if (superClassName === undefined) {
                return undefined;
            }

            var klass = env.getClass(superClassName);

            do {
                var method = klass.functions.find(function (method) {
                    return method.equals(overridingMethod);
                });

                if (method !== undefined) {
                    return method;
                }

                if (klass.superClass === undefined) {
                    break;
                }

                klass = env.getClass(superClass.superClass);
            } while (klass.superClass !== undefined);

            return undefined;
        }
    }, {
        key: 'mostSpecificFunction',
        value: function mostSpecificFunction(funcA, funcB, env) {
            if (funcA === undefined || funcB === undefined) {
                return undefined;
            }

            var paramsTypesA = funcA.parameters.map(function (param) {
                return param.type;
            });
            var paramsTypesB = funcB.parameters.map(function (param) {
                return param.type;
            });

            if (this.allConform(paramsTypesA, paramsTypesB, env)) {
                return funcA;
            }

            if (this.allConform(paramsTypesB, paramsTypesA, env)) {
                return funcB;
            }

            return undefined;
        }
    }, {
        key: 'allConform',
        value: function allConform(typesA, typesB, env) {
            var length = typesA.length;

            if (typesB.length !== length) {
                return false;
            }

            for (var i = 0, l = typesA.length; i < l; ++i) {
                if (!this.conform(typesA[i], typesB[i], env)) {
                    return false;
                }
            }

            return true;
        }
    }, {
        key: 'allEqual',
        value: function allEqual(typesA, typesB) {
            var length = typesA.length;

            if (typesB.length !== length) {
                return false;
            }

            for (var i = 0; i < length; ++i) {
                if (typesA[i] !== typesB[i]) {
                    return false;
                }
            }

            return true;
        }
    }, {
        key: 'conform',
        value: function conform(typeA, typeB, env) {
            if (typeB === _types.Types.Object) {
                return true;
            }

            if (typeA === typeB) {
                return true;
            }

            if (!this.isPrimitive(typeB) && typeA === _types.Types.Null) {
                return true;
            }

            var classA = env.getClass(typeA);
            var classB = env.getClass(typeB);

            do {
                if (classA.superClass === classB.name) {
                    return true;
                }

                if (classB.superClass === undefined) {
                    return false;
                }

                classB = env.getClass(classB.superClass);
            } while (classB.name !== _types.Types.Object);

            return false;
        }
    }, {
        key: 'hasFunctionWithName',
        value: function hasFunctionWithName(klass, methodName, env) {
            while (klass !== undefined) {
                if (klass.hasFunctionWithName(methodName)) {
                    return true;
                }

                klass = env.getClass(klass.superClass);
            }

            return false;
        }
    }, {
        key: 'isPrimitive',
        value: function isPrimitive(type) {
            return type === _types.Types.Int || type === _types.Types.Double || type === _types.Types.Bool || type === _types.Types.Unit;
        }
    }, {
        key: 'isInternal',
        value: function isInternal(type) {
            return type === 'int' || type === 'double' || type === 'bool' || type === 'string';
        }
    }]);

    return TypesUtils;
}();
//# sourceMappingURL=typesutils.js.map