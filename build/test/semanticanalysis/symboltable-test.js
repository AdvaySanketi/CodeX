'use strict';

var _assert = require('assert');

var assert = _interopRequireWildcard(_assert);

var _symbol = require('../../main/semanticanalysis/symbol');

var _symboltable = require('../../main/semanticanalysis/symboltable');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

describe('SymbolTable', function () {

    describe('#check', function () {

        it('should return true if the identifier is declared in the current scope', function () {
            var table = new _symboltable.SymbolTable();

            table.enterScope();

            table.add(new _symbol.Symbol('x', 'Int'));

            assert.equal(true, table.check('x'));
        });

        it('should return false if the identifier is not declared in the current scope but in an enclosing scope', function () {
            var table = new _symboltable.SymbolTable();

            table.enterScope();

            table.add(new _symbol.Symbol('x', 'Int'));

            table.enterScope();

            assert.equal(false, table.check('x'));
        });

        it('should return false if the identifier is not declared at all', function () {
            var table = new _symboltable.SymbolTable();

            table.enterScope();

            assert.equal(false, table.check('x'));
        });
    });

    describe('#find', function () {

        it('should return the identifier declared in the most closest scope', function () {
            var table = new _symboltable.SymbolTable();

            table.enterScope();

            table.add(new _symbol.Symbol('x', 'Int'));

            table.enterScope();

            table.add(new _symbol.Symbol('x', 'String'));

            var symbol = table.find('x');

            assert.equal('x', symbol.identifier);
            assert.equal('String', symbol.type);
        });

        it('should return the identifier declared in the enclosing scope if the identifier is not available in the current scope', function () {
            var table = new _symboltable.SymbolTable();

            table.enterScope();

            table.add(new _symbol.Symbol('x', 'Int'));

            table.enterScope();

            var symbol = table.find('x');

            assert.equal('x', symbol.identifier);
            assert.equal('Int', symbol.type);
        });

        it('should return undefined for an identifier that has not been declared', function () {
            var table = new _symboltable.SymbolTable();

            table.enterScope();

            var symbol = table.find('x');

            assert.equal(undefined, symbol);
        });
    });

    describe('#enterScope', function () {

        it('should create a new nested scope', function () {
            var table = new _symboltable.SymbolTable();

            table.enterScope();

            table.add(new _symbol.Symbol('x', 'Int'));

            table.enterScope();

            assert.equal(false, table.check('x'));
        });

        //it('should enter the next enclosed scope', () => {
        //    let table = new SymbolTable();
        //
        //    table.enterScope();
        //
        //    table.enterScope();
        //
        //    table.add(new Symbol('x', 'Int'));
        //
        //    assert.equal(true, table.check('x'));
        //
        //    table.exitScope();
        //
        //    assert.equal(false, table.check('x'));
        //
        //    table.enterScope();
        //
        //    assert.equal(true, table.check('x'));
        //});
    });

    describe('#exitScope', function () {

        it('should go back to the enclosing scope', function () {
            var table = new _symboltable.SymbolTable();

            table.enterScope();

            table.add(new _symbol.Symbol('x', 'Int'));

            table.enterScope();

            assert.equal(false, table.check('x'));

            table.exitScope();

            assert.equal(true, table.check('x'));
        });
    });
});
//# sourceMappingURL=symboltable-test.js.map