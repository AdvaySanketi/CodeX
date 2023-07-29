'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InvalidFsmState = exports.InvalidFsmState = -1;

var Fsm = exports.Fsm = function () {
    function Fsm(states, startState, finalStates, transition) {
        _classCallCheck(this, Fsm);

        this.states = states instanceof Set ? states : new Set();
        this.startState = startState;
        this.transition = transition;
        this.finalStates = finalStates instanceof Set ? finalStates : new Set();
    }

    _createClass(Fsm, [{
        key: 'run',
        value: function run(input) {
            var buffer = '';
            var state = this.startState;

            for (var i = 0, length = input.length; i < length; ++i) {
                var symbol = input.charAt(i);

                var tmpState = this.transition(state, symbol);
                if (tmpState === InvalidFsmState) {
                    break;
                }

                state = tmpState;

                buffer += symbol;
            }

            return { recognized: this.finalStates.has(state), value: buffer };
        }
    }]);

    return Fsm;
}();
//# sourceMappingURL=fsm.js.map