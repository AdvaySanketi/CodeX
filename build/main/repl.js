'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Repl = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

var _process = require('process');

var process = _interopRequireWildcard(_process);

var _readline = require('readline');

var readline = _interopRequireWildcard(_readline);

var _binaryexpression = require('./ast/binaryexpression');

var _bool = require('./interpreter/std/bool');

var _console = require('./interpreter/std/console');

var _context = require('./interpreter/context');

var _double = require('./interpreter/std/double');

var _evaluator = require('./interpreter/evaluator');

var _formal = require('./ast/formal');

var _int = require('./interpreter/std/int');

var _integer = require('./ast/integer');

var _lexer = require('./lexer/lexer');

var _math = require('./interpreter/std/math');

var _func = require('./ast/func');

var _functioncall = require('./ast/functioncall');

var _null = require('./interpreter/std/null');

var _object = require('./interpreter/object');

var _object2 = require('./interpreter/std/object');

var _parser = require('./parser/parser');

var _predef = require('./interpreter/std/predef');

var _program = require('./ast/program');

var _reference = require('./ast/reference');

var _str = require('./interpreter/std/str');

var _symbol = require('./semanticanalysis/symbol');

var _tokentype = require('./lexer/tokentype');

var _typechecker = require('./semanticanalysis/typechecker');

var _typeenvironment = require('./semanticanalysis/typeenvironment');

var _types = require('./types/types');

var _typesutils = require('./types/typesutils');

var _unit = require('./interpreter/std/unit');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Repl = exports.Repl = function () {
    function Repl() {
        _classCallCheck(this, Repl);

        this.typeEnvironment = new _typeenvironment.TypeEnvironment();
        this.context = new _context.Context();

        this.predefClass = new _predef.PredefClass();
        this.mathClass = new _math.MathClass();
        this.consoleClass = new _console.consoleClass();

        this.typeEnvironment.currentClass = this.predefClass;

        this.typeEnvironment.addClass(this.predefClass);
        this.typeEnvironment.addClass(this.mathClass);
        this.typeEnvironment.addClass(this.consoleClass);

        this.context.addClass(this.predefClass);
        this.context.addClass(this.mathClass);
        this.context.addClass(this.consoleClass);

        this.loadClasses();

        this.predef = _object.Obj.create(this.context, _types.Types.Predef);
        this.math = _object.Obj.create(this.context, _types.Types.Math);
        this.console = _object.Obj.create(this.context, _types.Types.console);

        this.context.self = this.predef;

        this.typeEnvironment.symbolTable.enterScope();
        this.typeEnvironment.symbolTable.add(new _symbol.Symbol('Math', _types.Types.Math));
        this.typeEnvironment.symbolTable.add(new _symbol.Symbol('console', _types.Types.console));

        this.context.environment.enterScope();
        this.context.environment.add('Math', this.context.store.alloc(this.math));
        this.context.environment.add('console', this.context.store.alloc(this.console));

        this.res = 0;
    }

    _createClass(Repl, [{
        key: 'run',
        value: function run() {
            var _this = this;

            console.log(' ')
            console.log(' ')
            console.log('Welcome to CodeX 0.0.1');
            console.log('Type : ".help" to get help.');
            console.log('Type : ".exit" to Exit');

            console.log();
            console.log();

            var prev = ' ';

            var input = '';

            var scanner = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });

            scanner.setPrompt('>>> ');

            scanner.prompt();

            scanner.on('line', function (line) {
                line = line.trim();

                if (line === '.exit') {
                    scanner.close();

                    process.exit();
                } else if (line.startsWith('.load')) {
                    _this.runLoadCommand(line, scanner);
                } else {

                    if (line === '' && prev === '') {
                        console.log('Two blank lines typed. Starting a new expression.');
                        console.log();

                        prev = ' ';
                        input = '';
                        scanner.setPrompt('>>> ');
                    } else {
                        prev = line;

                        input += line;

                        try {
                            if (!_this.tryParse(input)) {
                                input += '\n';
                                scanner.setPrompt('       ');
                            } else {
                                console.log(_this.execute(input));
                                console.log();

                                input = '';
                                scanner.setPrompt('>>> ');
                            }
                        } catch (e) {
                            console.log('error: ' + e.message);
                            console.log();

                            input = '';
                            scanner.setPrompt('>>> ');
                        }
                    }

                    scanner.prompt();
                }
            });

            scanner.on('close', function () {
                console.log();
                console.log('CodeX Forever');
            });
        }
    }, {
        key: 'execute',
        value: function execute(input) {
            var lexer = new _lexer.Lexer(input);

            var token = lexer.nextToken();

            while (token.type === _tokentype.TokenType.Newline) {
                token = lexer.nextToken();
            }

            switch (token.type) {
                case _tokentype.TokenType.Class:
                    return this.injectClass(input);

                case _tokentype.TokenType.Var:
                    return this.injectProperty(input);

                case _tokentype.TokenType.Func:
                    return this.injectFunction(input);

                default:
                    return this.evaluateExpression(input);
            }
        }
    }, {
        key: 'evaluateExpression',
        value: function evaluateExpression(input) {
            var parser = new _parser.Parser(input);

            var expression = parser.parseExpression();

            _typechecker.TypeChecker.typeCheck(this.typeEnvironment, expression);

            var value = _evaluator.Evaluator.evaluate(this.context, expression);

            var identifier = void 0;

            if (expression.isReference()) {
                identifier = expression.identifier;
            } else if (expression.isAssignment()) {
                identifier = expression.identifier;

                value = this.context.self.get(identifier);
            } else {
                identifier = 'res' + this.res++;

                this.typeEnvironment.symbolTable.add(new _symbol.Symbol(identifier, value.type));

                var address = this.context.store.alloc(value);

                this.context.environment.add(identifier, address);
            }

            if (value.type === _types.Types.String) {
                return identifier + ': ' + value.type + ' = "' + value.get('value') + '"';
            }

            var call = new _functioncall.FunctionCall(new _reference.Reference(identifier), 'toString', []);

            call.object.expressionType = value.type;
            call.expressionType = _types.Types.String;

            var res = _evaluator.Evaluator.evaluate(this.context, call);

            return value.type === _types.Types.Unit ? '' : identifier + ': ' + value.type + ' = ' + res.get('value');
        }
    }, {
        key: 'injectClass',
        value: function injectClass(input) {
            var parser = new _parser.Parser(input);

            var klass = parser.parseClass();

            this.typeEnvironment.addClass(klass);

            try {
                _typechecker.TypeChecker.typeCheckClass(this.typeEnvironment, klass);
            } catch (e) {
                this.typeEnvironment.removeClass(klass.name);

                throw e;
            }

            this.context.addClass(klass);

            return 'defined class ' + klass.name;
        }
    }, {
        key: 'injectProperty',
        value: function injectProperty(input) {
            var parser = new _parser.Parser(input);

            var property = parser.parseProperty();

            var index = this.predefClass.properties.findIndex(function (variable) {
                return variable.name === property.name;
            });
            if (index !== -1) {
                this.predefClass.properties.splice(index, 1);
            }

            _typechecker.TypeChecker.typeCheckProperty(this.typeEnvironment, property);

            this.predefClass.properties.push(property);

            var value = _evaluator.Evaluator.evaluateProperty(this.context, property);
            value.address = 'this';

            this.predef.properties.set(property.name, value);

            var call = new _functioncall.FunctionCall(new _reference.Reference(property.name), 'toString', []);

            var res = _evaluator.Evaluator.evaluate(this.context, call);

            return property.name + ': ' + property.type + ' = ' + res.get('value');
        }
    }, {
        key: 'injectFunction',
        value: function injectFunction(input) {
            var parser = new _parser.Parser(input);

            var func = parser.parseFunction();

            var index = this.predefClass.functions.findIndex(function (f) {
                return func.equals(f);
            });
            if (index !== -1) {
                this.predefClass.functions.splice(index, 1);
            }

            index = this.predef.functions.findIndex(function (f) {
                return func.equals(f);
            });
            if (index !== -1) {
                this.predef.functions.splice(index, 1);
            }

            this.predefClass.functions.push(func);

            this.predef.functions.push(func);

            _typechecker.TypeChecker.typeCheckFunction(this.typeEnvironment, func);

            return func.signature();
        }
    }, {
        key: 'runLoadCommand',
        value: function runLoadCommand(cmd, scanner) {
            var _this2 = this;

            var args = cmd.split(/\s+/);
            var count = args.length;

            if (count <= 1) {
                console.log('error: no file provided.');
                console.log();
            } else {
                try {
                    var program = new _program.Program();

                    for (var i = 1; i < count; ++i) {
                        program.classes = program.classes.concat(this.loadFile(args[i]).classes);
                    }

                    _typechecker.TypeChecker.typeCheckProgram(this.typeEnvironment, program);

                    this.typeEnvironment.symbolTable.enterScope();

                    program.classes.forEach(function (klass) {
                        _this2.context.addClass(klass);

                        console.log('defined class ' + klass.name + '.');
                    });

                    console.log();
                } catch (e) {
                    console.log('error: ' + e.message);
                    console.log();
                }
            }

            scanner.prompt();
        }
    }, {
        key: 'loadFile',
        value: function loadFile(filePath) {
            var parser = new _parser.Parser(fs.readFileSync(filePath, 'utf-8'));

            return parser.parseProgram();
        }
    }, {
        key: 'tryParse',
        value: function tryParse(input) {
            var parser = new _parser.Parser(input);

            try {
                if (parser.accept(_tokentype.TokenType.Class)) {
                    parser.parseClass();
                } else if (parser.accept(_tokentype.TokenType.Var)) {
                    parser.parseProperty();
                } else if (parser.accept(_tokentype.TokenType.Func)) {
                    parser.parseFunction();
                } else {
                    parser.parseExpression();
                }

                return true;
            } catch (e) {
                if (e.message.search('end of input.') > 0) {
                    return false;
                } else {
                    throw e;
                }
            }
        }
    }, {
        key: 'loadClasses',
        value: function loadClasses() {
            var objectClass = new _object2.ObjectClass();
            var boolClass = new _bool.BoolClass();
            var intClass = new _int.IntClass();
            var doubleClass = new _double.DoubleClass();
            var stringClass = new _str.StringClass();
            var unitClass = new _unit.UnitClass();
            var nullClass = new _null.NullClass();
            var mathClass = new _math.MathClass();

            this.typeEnvironment.addClass(objectClass);
            this.typeEnvironment.addClass(boolClass);
            this.typeEnvironment.addClass(intClass);
            this.typeEnvironment.addClass(doubleClass);
            this.typeEnvironment.addClass(stringClass);
            this.typeEnvironment.addClass(unitClass);
            this.typeEnvironment.addClass(nullClass);
            this.typeEnvironment.addClass(mathClass);

            this.context.addClass(objectClass);
            this.context.addClass(boolClass);
            this.context.addClass(intClass);
            this.context.addClass(doubleClass);
            this.context.addClass(stringClass);
            this.context.addClass(unitClass);
            this.context.addClass(nullClass);
            this.context.addClass(mathClass);
        }
    }]);

    return Repl;
}();
//# sourceMappingURL=repl.js.map