'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TypeChecker = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constructorcall = require('../ast/constructorcall');

var _functioncall = require('../ast/functioncall');

var _report = require('../util/report');

var _symbol = require('./symbol');

var _types = require('../types/types');

var _typesutils = require('../types/typesutils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TypeChecker = exports.TypeChecker = function () {
    function TypeChecker() {
        _classCallCheck(this, TypeChecker);
    }

    _createClass(TypeChecker, null, [{
        key: 'typeCheck',
        value: function typeCheck(environment, ast) {
            if (ast === undefined) {
                return;
            }

            if (ast.isDefinition()) {
                if (ast.isClass()) {
                    this.typeCheckClass(environment, ast);
                } else if (ast.isFunction()) {
                    this.typeCheckFunction(environment, ast);
                } else if (ast.isProperty()) {
                    this.typeCheckProperty(environment, ast);
                }
            } else if (ast.isExpression()) {
                if (ast.isAssignment()) {
                    this.typeCheckAssignment(environment, ast);
                } else if (ast.isBinaryExpression()) {
                    this.typeCheckBinaryExpression(environment, ast);
                } else if (ast.isBlock()) {
                    this.typeCheckBlock(environment, ast);
                } else if (ast.isBooleanLiteral()) {
                    this.typeCheckBooleanLiteral(environment, ast);
                } else if (ast.isCast()) {
                    this.typeCheckCast(environment, ast);
                } else if (ast.isConstructorCall()) {
                    this.typeCheckConstructorCall(environment, ast);
                } else if (ast.isDecimalLiteral()) {
                    this.typeCheckDecimalLiteral(environment, ast);
                } else if (ast.isIfElse()) {
                    this.typeCheckIfElse(environment, ast);
                } else if (ast.isInitialization()) {
                    this.typeCheckInitialization(environment, ast);
                } else if (ast.isIntegerLiteral()) {
                    this.typeCheckIntegerLiteral(environment, ast);
                } else if (ast.isLet()) {
                    this.typeCheckLet(environment, ast);
                } else if (ast.isFunctionCall()) {
                    this.typeCheckFunctionCall(environment, ast);
                } else if (ast.isNullLiteral()) {
                    this.typeCheckNullLiteral(environment, ast);
                } else if (ast.isReference()) {
                    this.typeCheckReference(environment, ast);
                } else if (ast.isStringLiteral()) {
                    this.typeCheckStringLiteral(environment, ast);
                } else if (ast.isSuper()) {
                    this.typeCheckSuperFunctionCall(environment, ast);
                } else if (ast.isThis()) {
                    this.typeCheckThis(environment, ast);
                } else if (ast.isUnaryExpression()) {
                    this.typeCheckUnaryExpression(environment, ast);
                } else if (ast.isWhile()) {
                    this.typeCheckWhile(environment, ast);
                }
            }
        }
    }, {
        key: 'typeCheckAssignment',
        value: function typeCheckAssignment(environment, assign) {
            var symbol = environment.symbolTable.find(assign.identifier);

            if (symbol === undefined) {
                throw new Error(_report.Report.error(assign.line, assign.column, 'Assignment to an undefined variable \'' + assign.identifier + '\'.'));
            }

            this.typeCheck(environment, assign.value);

            var valueType = assign.value.expressionType;

            if (symbol.type === undefined) {
                symbol.type = valueType;
            } else if (!_typesutils.TypesUtils.conform(valueType, symbol.type, environment)) {
                throw new Error('Value assigned to \'' + symbol.identifier + '\' does not conform to the declared type \'' + symbol.type + '\'.');
            }

            assign.expressionType = _types.Types.Unit;
        }
    }, {
        key: 'typeCheckBinaryExpression',
        value: function typeCheckBinaryExpression(environment, expression) {
            var functionCall = new _functioncall.FunctionCall(expression.left, expression.operator, [expression.right]);

            functionCall.line = expression.line;
            functionCall.column = expression.column;

            this.typeCheckFunctionCall(environment, functionCall);

            expression.expressionType = functionCall.expressionType;
        }
    }, {
        key: 'typeCheckBlock',
        value: function typeCheckBlock(environment, block) {
            var _this = this;

            environment.symbolTable.enterScope();

            block.expressions.forEach(function (expression) {
                _this.typeCheck(environment, expression);
            });

            var length = block.expressions.length;

            block.expressionType = length > 0 ? block.expressions[length - 1].expressionType : _types.Types.Unit;

            environment.symbolTable.exitScope();
        }
    }, {
        key: 'typeCheckBooleanLiteral',
        value: function typeCheckBooleanLiteral(environment, boolean) {
            boolean.expressionType = _types.Types.Bool;
        }
    }, {
        key: 'typeCheckCast',
        value: function typeCheckCast(environment, cast) {
            this.typeCheck(environment, cast.object);

            if (!_typesutils.TypesUtils.conform(cast.type, cast.object.expressionType, environment)) {
                throw new Error(_report.Report.error(cast.line, cast.column, 'Cannot cast an object of type \'' + cast.object.expressionType + '\' to \'' + cast.type + '\'.'));
            }

            cast.expressionType = cast.type;
        }
    }, {
        key: 'typeCheckClass',
        value: function typeCheckClass(environment, klass) {
            var _this2 = this;

            var symbolTable = environment.symbolTable;

            var currentClass = environment.currentClass;

            environment.currentClass = klass;

            symbolTable.enterScope();

            klass.parameters.forEach(function (parameter) {
                if (symbolTable.check(parameter.identifier)) {
                    throw new Error(_report.Report.error(parameter.line, parameter.column, 'Duplicate class parameter name \'' + parameter.identifier + '\' in class \'' + klass.name + '\' definition.'));
                }

                symbolTable.add(new _symbol.Symbol(parameter.identifier, parameter.type, parameter.line, parameter.column));
            });

            if (klass.superClass !== undefined) {
                this.typeCheckConstructorCall(environment, new _constructorcall.ConstructorCall(klass.superClass, klass.superClassArgs));
            }

            klass.properties.forEach(function (property) {
                _this2.typeCheckProperty(environment, property);
            });

            klass.functions.forEach(function (func) {
                if (environment.hasFunction(klass.name, func)) {
                    throw new Error(_report.Report.error(func.line, func.column, 'Function \'' + func.name + '\' with signature \'' + func.signature() + '\' is already defined in class \'' + klass.name + '\'.'));
                }

                environment.addFunction(klass.name, func);

                _this2.typeCheckFunction(environment, func);
            });

            symbolTable.exitScope();

            environment.currentClass = currentClass;
        }
    }, {
        key: 'typeCheckConstructorCall',
        value: function typeCheckConstructorCall(environment, call) {
            if (!environment.hasClass(call.type)) {
                throw new Error(_report.Report.error(call.line, call.column, 'Undefined type \'' + call.type + '\'.'));
            }

            var klass = environment.getClass(call.type);

            var parametersCount = klass.parameters.length;

            if (parametersCount !== call.args.length) {
                throw new Error(_report.Report.error(call.line, call.column, 'Class \'' + klass.name + '\' constructor called with wrong number of arguments.'));
            }

            for (var i = 0; i < parametersCount; ++i) {
                var arg = call.args[i];

                this.typeCheck(environment, arg);

                var argType = arg.expressionType;
                var parameterType = klass.parameters[i].type;

                if (!_typesutils.TypesUtils.conform(argType, parameterType, environment)) {
                    throw new Error(_report.Report.error(arg.line, arg.column, 'Class \'' + klass.name + '\' constructor argument type \'' + argType + '\' does not conform to declared type \'' + parameterType + '\'.'));
                }
            }

            call.expressionType = call.type;
        }
    }, {
        key: 'typeCheckDecimalLiteral',
        value: function typeCheckDecimalLiteral(environment, decimal) {
            decimal.expressionType = _types.Types.Double;
        }
    }, {
        key: 'typeCheckFunction',
        value: function typeCheckFunction(environment, func) {
            var symbolTable = environment.symbolTable;

            if (func.override) {
                var overrided = _typesutils.TypesUtils.findOverridedFunction(environment.currentClass.superClass, func, environment);

                if (overrided === undefined) {
                    throw new Error(_report.Report.error(func.line, func.column, 'No suitable function \'' + func.signature() + '\' found in superclass(es) to override.'));
                }
            }

            symbolTable.enterScope();

            func.parameters.forEach(function (parameter) {
                if (symbolTable.check(parameter.identifier)) {
                    throw new Error(_report.Report.error(parameter.line, parameter.column, 'Duplicate parameter name \'' + parameter.identifier + '\' in func \'' + func.name + '\'.'));
                }

                symbolTable.add(new _symbol.Symbol(parameter.identifier, parameter.type, parameter.line, parameter.column));
            });

            this.typeCheck(environment, func.body);

            if (!_typesutils.TypesUtils.conform(func.body.expressionType, func.returnType, environment)) {
                throw new Error(_report.Report.error(func.line, func.column, 'Function \'' + func.name + '\' value type \'' + func.body.expressionType + '\' does not conform to return type \'' + func.returnType + '\'.'));
            }

            symbolTable.exitScope();
        }
    }, {
        key: 'typeCheckFunctionCall',
        value: function typeCheckFunctionCall(environment, call) {
            var _this3 = this;

            if (call.object !== undefined) {
                this.typeCheck(environment, call.object);
            }

            var objectClass = call.object === undefined ? environment.currentClass : environment.getClass(call.object.expressionType);

            if (!_typesutils.TypesUtils.hasFunctionWithName(objectClass, call.functionName, environment)) {
                throw new Error(_report.Report.error(call.line, call.column, 'No function \'' + call.functionName + '\' defined in class \'' + objectClass.name + '\'.'));
            }

            call.args.forEach(function (arg) {
                _this3.typeCheck(environment, arg);
            });

            var argsTypes = call.args.map(function (arg) {
                return arg.expressionType;
            });

            var func = _typesutils.TypesUtils.findMethodToApply(objectClass, call.functionName, argsTypes, environment);

            if (func === undefined) {
                throw new Error(_report.Report.error(call.line, call.column, 'Function \'' + call.functionName + '\' of class \'' + objectClass.name + '\' cannot be applied to \'(' + argsTypes.join(",") + ')\'.'));
            }

            if (func.isPrivate && !(call.object === undefined || call.object.isThis())) {
                throw new Error(_report.Report.error(call.line, call.column, 'Function \'' + call.functionName + '\' of class \'' + objectClass.name + '\' is private.'));
            }

            call.expressionType = func.returnType;
        }
    }, {
        key: 'typeCheckIfElse',
        value: function typeCheckIfElse(environment, ifElse) {
            this.typeCheck(environment, ifElse.condition);

            if (ifElse.condition.expressionType !== _types.Types.Bool) {
                throw new Error(_report.Report.error(ifElse.condition.line, ifElse.condition.column, 'Condition of the if/else expression evaluates to a value of type \'' + ifElse.condition.expressionType + '\', must evaluate to a boolean value.'));
            }

            this.typeCheck(environment, ifElse.thenBranch);

            if (ifElse.elseBranch === undefined) {
                ifElse.expressionType = _types.Types.Unit;
            } else {
                this.typeCheck(environment, ifElse.elseBranch);

                ifElse.expressionType = _typesutils.TypesUtils.leastUpperBound(ifElse.thenBranch.expressionType, ifElse.elseBranch.expressionType, environment);
            }
        }
    }, {
        key: 'typeCheckInitialization',
        value: function typeCheckInitialization(environment, init) {
            var symbolTable = environment.symbolTable;

            if (symbolTable.check(init.identifier)) {
                throw new Error(_report.Report.error(init.line, init.column, 'Duplicate identifier \'' + init.identifier + '\' in let binding.'));
            }

            var symbol = new _symbol.Symbol(init.identifier, init.type, init.line, init.column);

            if (init.value === undefined) {
                init.expressionType = init.type;
            } else {
                this.typeCheck(environment, init.value);

                var valueType = init.value.expressionType;

                if (init.type === undefined) {
                    init.type = valueType;
                } else {
                    if (!_typesutils.TypesUtils.conform(valueType, init.type, environment)) {
                        throw new Error(_report.Report.error(init.line, init.column, 'Assigned value to variable \'' + init.identifier + '\' of type \'' + valueType + '\' does not conform to its declared type \'' + init.type + '\'.'));
                    }
                }

                init.expressionType = valueType;
            }

            symbol.type = init.expressionType;

            symbolTable.add(symbol);
        }
    }, {
        key: 'typeCheckIntegerLiteral',
        value: function typeCheckIntegerLiteral(environment, integer) {
            integer.expressionType = _types.Types.Int;
        }
    }, {
        key: 'typeCheckLet',
        value: function typeCheckLet(environment, letExpr) {
            var _this4 = this;

            environment.symbolTable.enterScope();

            letExpr.initializations.forEach(function (init) {
                _this4.typeCheckInitialization(environment, init);
            });

            this.typeCheck(environment, letExpr.body);

            letExpr.expressionType = letExpr.body.expressionType;

            environment.symbolTable.exitScope();
        }
    }, {
        key: 'typeCheckNullLiteral',
        value: function typeCheckNullLiteral(environment, nullExpr) {
            nullExpr.expressionType = _types.Types.Null;
        }
    }, {
        key: 'typeCheckProgram',
        value: function typeCheckProgram(environment, program) {
            var currentClass = environment.currentClass;

            program.classes.forEach(function (klass) {
                if (environment.hasClass(klass.name)) {
                    throw new Error('Class \'' + klass.name + '\' at ' + (klass.line + 1) + ':' + (klass.column + 1) + ' is already defined.');
                }

                environment.addClass(klass);
            });

            program.classes.forEach(function (klass) {
                environment.currentClass = klass;

                TypeChecker.typeCheck(environment, klass);
            });

            environment.currentClass = currentClass;
        }
    }, {
        key: 'typeCheckProperty',
        value: function typeCheckProperty(environment, property) {
            var symbolTable = environment.symbolTable;

            if (symbolTable.check(property.name)) {
                throw new Error(_report.Report.error(property.line, property.column, 'An instance variable named \'' + property.name + '\' is already in scope.'));
            }

            if (property.value !== undefined) {
                this.typeCheck(environment, property.value);

                if (property.type === undefined) {
                    property.type = property.value.expressionType;
                } else {
                    if (!_typesutils.TypesUtils.conform(property.value.expressionType, property.type, environment)) {
                        throw new Error(_report.Report.error(property.line, property.column, 'Value of type \'' + property.value.expressionType + '\' cannot be assigned to variable \'' + property.name + '\' of type \'' + property.type + '\'.'));
                    }
                }
            }

            symbolTable.add(new _symbol.Symbol(property.name, property.type, property.line, property.column));
        }
    }, {
        key: 'typeCheckReference',
        value: function typeCheckReference(environment, reference) {
            var symbol = environment.symbolTable.find(reference.identifier);

            if (symbol !== undefined) {
                reference.expressionType = symbol.type;
            } else if (environment.currentClass.hasProperty(reference.identifier)) {
                reference.expressionType = environment.currentClass.getProperty(reference.identifier).type;
            } else {
                throw new Error(_report.Report.error(reference.line, reference.column, 'Reference to an undefined identifier \'' + reference.identifier + '\'.'));
            }
        }
    }, {
        key: 'typeCheckStringLiteral',
        value: function typeCheckStringLiteral(environment, string) {
            string.expressionType = _types.Types.String;
        }
    }, {
        key: 'typeCheckSuperFunctionCall',
        value: function typeCheckSuperFunctionCall(environment, superCall) {
            var currentClass = environment.currentClass;
            environment.currentClass = environment.getClass(currentClass.superClass);

            var call = new _functioncall.FunctionCall(undefined, superCall.functionName, superCall.args);
            call.line = superCall.line;
            call.column = superCall.column;

            this.typeCheckFunctionCall(environment, call);

            superCall.expressionType = call.expressionType;

            environment.currentClass = currentClass;
        }
    }, {
        key: 'typeCheckThis',
        value: function typeCheckThis(environment, thisExpr) {
            thisExpr.expressionType = environment.currentClass.name;
        }
    }, {
        key: 'typeCheckUnaryExpression',
        value: function typeCheckUnaryExpression(environment, expression) {
            var funcCall = new _functioncall.FunctionCall(expression.expression, 'unary_' + expression.operator, []);

            funcCall.line = expression.line;
            funcCall.column = expression.column;

            this.typeCheckFunctionCall(environment, funcCall);

            expression.expressionType = funcCall.expressionType;
        }
    }, {
        key: 'typeCheckWhile',
        value: function typeCheckWhile(environment, whileExpr) {
            this.typeCheck(environment, whileExpr.condition);

            if (whileExpr.condition.expressionType !== _types.Types.Bool) {
                throw new Error(_report.Report.error(whileExpr.condition.line, whileExpr.condition.column, 'Condition of a while loop evaluates to a value of type \'' + whileExpr.condition.expressionType + '\', must evaluate to a boolean value.'));
            }

            this.typeCheck(environment, whileExpr.body);

            whileExpr.expressionType = _types.Types.Unit;
        }
    }]);

    return TypeChecker;
}();
//# sourceMappingURL=typechecker.js.map