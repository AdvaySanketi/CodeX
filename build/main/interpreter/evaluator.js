'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Evaluator = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constructorcall = require('../ast/constructorcall');

var _expression = require('../ast/expression');

var _lazyexpression = require('../ast/lazyexpression');

var _functioncall = require('../ast/functioncall');

var _object = require('./object');

var _reference = require('../ast/reference');

var _report = require('../util/report');

var _types = require('../types/types');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Evaluator = exports.Evaluator = function () {
    function Evaluator() {
        _classCallCheck(this, Evaluator);
    }

    _createClass(Evaluator, null, [{
        key: 'evaluate',
        value: function evaluate(context, expression) {
            if (expression === undefined || expression.isDefinition()) {
                return _object.Obj.create(context, _types.Types.Unit);
            }

            var value = null;

            if (expression.isAssignment()) {
                value = this.evaluateAssignment(context, expression);
            } else if (expression.isBinaryExpression()) {
                value = this.evaluateBinaryExpression(context, expression);
            } else if (expression.isBlock()) {
                value = this.evaluateBlock(context, expression);
            } else if (expression.isBooleanLiteral()) {
                value = this.evaluateBooleanLiteral(context, expression);
            } else if (expression.isCast()) {
                value = this.evaluateCast(context, expression);
            } else if (expression.isConstructorCall()) {
                value = this.evaluateConstructorCall(context, expression);
            } else if (expression.isDecimalLiteral()) {
                value = this.evaluateDecimalLiteral(context, expression);
            } else if (expression.isFunctionCall()) {
                value = this.evaluateFunctionCall(context, expression);
            } else if (expression.isIfElse()) {
                value = this.evaluateIfElse(context, expression);
            } else if (expression.isInitialization()) {
                value = this.evaluateInitialization(context, expression);
            } else if (expression.isIntegerLiteral()) {
                value = this.evaluateIntegerLiteral(context, expression);
            } else if (expression.isLet()) {
                value = this.evaluateLet(context, expression);
            } else if (expression.isNative()) {
                value = this.evaluateNative(context, expression);
            } else if (expression.isNullLiteral()) {
                value = this.evaluateNullLiteral(context, expression);
            } else if (expression.isReference()) {
                value = this.evaluateReference(context, expression);
            } else if (expression.isStringLiteral()) {
                value = this.evaluateStringLiteral(context, expression);
            } else if (expression.isSuper()) {
                value = this.evaluateSuperFunctionCall(context, expression);
            } else if (expression.isThis()) {
                value = this.evaluateThis(context, expression);
            } else if (expression.isUnaryExpression()) {
                value = this.evaluateUnaryExpression(context, expression);
            } else if (expression.isWhile()) {
                value = this.evaluateWhile(context, expression);
            }

            expression.expressionType = value.type;

            return value;
        }
    }, {
        key: 'evaluateAssignment',
        value: function evaluateAssignment(context, assign) {
            var address = context.environment.find(assign.identifier);

            var value = assign.operator === '=' ? this.evaluate(context, assign.value) : this.evaluateFunctionCall(context, new _functioncall.FunctionCall(new _reference.Reference(assign.identifier), assign.operator.charAt(0), [assign.value]));

            if (address !== undefined) {
                context.store.put(address, value);
            } else if (context.self.has(assign.identifier)) {
                context.self.set(assign.identifier, value);
            }

            return _object.Obj.create(context, _types.Types.Unit);
        }
    }, {
        key: 'evaluateBinaryExpression',
        value: function evaluateBinaryExpression(context, expression) {
            return this.evaluateFunctionCall(context, new _functioncall.FunctionCall(expression.left, expression.operator, [expression.right]));
        }
    }, {
        key: 'evaluateBlock',
        value: function evaluateBlock(context, block) {
            var size = block.expressions.length;

            if (size == 0) {
                return _object.Obj.create(context, _types.Types.Unit);
            }

            context.environment.enterScope();

            for (var i = 0; i < size - 1; ++i) {
                this.evaluate(context, block.expressions[i]);
            }

            var value = this.evaluate(context, block.expressions[size - 1]);

            context.environment.exitScope();

            return value;
        }
    }, {
        key: 'evaluateBooleanLiteral',
        value: function evaluateBooleanLiteral(context, bool) {
            var value = _object.Obj.create(context, _types.Types.Bool);

            value.set('value', bool.value === 'true');

            return value;
        }
    }, {
        key: 'evaluateCast',
        value: function evaluateCast(context, cast) {
            var object = this.evaluate(context, cast.object);

            var value = _object.Obj.create(context, cast.type);

            object.properties.forEach(function (v, k) {
                value.set(k, v);
            });

            return value;
        }
    }, {
        key: 'evaluateConstructorCall',
        value: function evaluateConstructorCall(context, call) {
            var object = _object.Obj.create(context, call.type);

            this.evaluateConstructorImpl(context, object, object.type, call.args);

            return object;
        }
    }, {
        key: 'evaluateDecimalLiteral',
        value: function evaluateDecimalLiteral(context, decimal) {
            var value = _object.Obj.create(context, _types.Types.Double);

            value.set('value', parseFloat(decimal.value));

            return value;
        }
    }, {
        key: 'evaluateFunctionCall',
        value: function evaluateFunctionCall(context, call) {
            var object = call.object === undefined ? context.self : this.evaluate(context, call.object);

            var func = object.getMostSpecificFunction(call.functionName, call.args.map(function (arg) {
                return arg.expressionType;
            }), context);

            return this.evaluateFunctionCallImpl(context, object, func, call);
        }
    }, {
        key: 'evaluateIfElse',
        value: function evaluateIfElse(context, ifElse) {
            var condition = this.evaluate(context, ifElse.condition);

            return condition.get('value') ? this.evaluate(context, ifElse.thenBranch) : this.evaluate(context, ifElse.elseBranch);
        }
    }, {
        key: 'evaluateInitialization',
        value: function evaluateInitialization(context, init) {
            var value = init.value !== undefined ? this.evaluate(context, init.value) : _object.Obj.defaultValue(context, init.type);

            var address = context.store.alloc(value);

            context.environment.add(init.identifier, address);
        }
    }, {
        key: 'evaluateIntegerLiteral',
        value: function evaluateIntegerLiteral(context, integer) {
            var value = _object.Obj.create(context, _types.Types.Int);

            value.set('value', parseInt(integer.value));

            return value;
        }
    }, {
        key: 'evaluateLet',
        value: function evaluateLet(context, letExpr) {
            var _this = this;

            letExpr.initializations.forEach(function (init) {
                _this.evaluateInitialization(context, init);
            });

            var value = this.evaluate(context, letExpr.body);

            letExpr.initializations.forEach(function (init) {
                context.store.free(context.environment.find(init.identifier));
            });

            return value;
        }
    }, {
        key: 'evaluateNative',
        value: function evaluateNative(context, native) {
            return native.func(context);
        }
    }, {
        key: 'evaluateNullLiteral',
        value: function evaluateNullLiteral(context, nullExpr) {
            return _object.Obj.create(context, _types.Types.Null);
        }
    }, {
        key: 'evaluateProperty',
        value: function evaluateProperty(context, property) {
            if (property.value === undefined) {
                return _object.Obj.defaultValue(context, property.type);
            }

            return this.evaluate(context, property.value);
        }
    }, {
        key: 'evaluateReference',
        value: function evaluateReference(context, reference) {
            var address = context.environment.find(reference.identifier);

            if (address !== undefined) {
                var value = context.store.get(address);

                if (value instanceof _expression.Expression) {
                    value = this.evaluate(context, value);

                    context.store.put(address, value);
                }

                return value;
            }

            var prop = context.self.get(reference.identifier);

            if (prop instanceof _expression.Expression) {
                prop = this.evaluate(context, prop);

                context.self.set(reference.identifier, prop);
            }

            return prop;
        }
    }, {
        key: 'evaluateStringLiteral',
        value: function evaluateStringLiteral(context, string) {
            var value = _object.Obj.create(context, _types.Types.String);

            value.set('value', string.value.substring(1, string.value.length - 1));

            return value;
        }
    }, {
        key: 'evaluateSuperFunctionCall',
        value: function evaluateSuperFunctionCall(context, call) {
            var baseType = context.getClass(context.self.type).superClass;

            var base = _object.Obj.create(context, baseType);

            var func = base.getMostSpecificFunction(call.functionName, call.args.map(function (arg) {
                return arg.expressionType;
            }), context);

            return this.evaluateFunctionCallImpl(context, context.self, func, call);
        }
    }, {
        key: 'evaluateThis',
        value: function evaluateThis(context, thisExpr) {
            return context.self;
        }
    }, {
        key: 'evaluateUnaryExpression',
        value: function evaluateUnaryExpression(context, expression) {
            return this.evaluateFunctionCall(context, new _functioncall.FunctionCall(expression.expression, 'unary_' + expression.operator, []));
        }
    }, {
        key: 'evaluateWhile',
        value: function evaluateWhile(context, whileExpr) {
            while (this.evaluate(context, whileExpr.condition).get('value') === true) {
                this.evaluate(context, whileExpr.body);
            }

            return _object.Obj.create(context, _types.Types.Unit);
        }
    }, {
        key: 'evaluateConstructorImpl',
        value: function evaluateConstructorImpl(context, object, type, args) {
            var _this2 = this;

            var klass = context.getClass(type);

            var argsValues = args.map(function (arg) {
                return _this2.evaluate(context, arg);
            });

            var self = context.self;
            context.self = object;

            for (var i = 0, l = klass.parameters.length; i < l; ++i) {
                object.set(klass.parameters[i].identifier, argsValues[i]);
            }

            if (klass.superClass !== undefined) {
                this.evaluateConstructorImpl(context, object, klass.superClass, klass.superClassArgs);
            }

            klass.properties.forEach(function (variable) {
                object.set(variable.name, _this2.evaluateProperty(context, variable));
            });

            context.self = self;
        }
    }, {
        key: 'evaluateFunctionCallImpl',
        value: function evaluateFunctionCallImpl(context, object, func, call) {
            if (func === undefined) {
                throw new Error(_report.Report.error(call.line, call.column, 'No function \'' + call.functionName + '\' defined in class \'' + object.type + '\'.'));
            }

            context.environment.enterScope();

            var argsValues = [];

            for (var i = 0, l = func.parameters.length; i < l; ++i) {
                if (func.parameters[i].lazy) {
                    argsValues.push(new _lazyexpression.LazyExpression(call.args[i], context.copy()));
                } else {
                    argsValues.push(this.evaluate(context, call.args[i]));
                }
            }

            for (var _i = 0, _l = func.parameters.length; _i < _l; ++_i) {
                context.environment.add(func.parameters[_i].identifier, context.store.alloc(argsValues[_i]));
            }

            var self = context.self;

            context.self = object;

            var value = this.evaluate(context, func.body);

            func.parameters.forEach(function (parameter) {
                context.store.free(context.environment.find(parameter.identifier));
            });

            context.environment.exitScope();

            context.self = self;

            return value;
        }
    }]);

    return Evaluator;
}();
//# sourceMappingURL=evaluator.js.map