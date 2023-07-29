"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Store = exports.Store = function () {
    function Store() {
        _classCallCheck(this, Store);

        this.locations = [];
        this.allocated = [];
    }

    _createClass(Store, [{
        key: "alloc",
        value: function alloc(value) {
            var address = 0;
            var size = this.locations.length;

            while (address < size && this.allocated[address]) {
                address++;
            }

            if (address < size) {
                this.locations[address] = value;

                value.address = address;

                this.allocated[address] = true;

                return address;
            }

            this.locations.push(value);
            this.allocated.push(true);

            value.address = size;

            return size;
        }
    }, {
        key: "free",
        value: function free(address) {
            if (address >= 0 && address < this.allocated.length) {
                this.allocated[address] = false;
            }
        }
    }, {
        key: "put",
        value: function put(address, value) {
            if (address >= 0 && address < this.locations.length) {
                this.locations[address] = value;
            }
        }
    }, {
        key: "get",
        value: function get(address) {
            if (address >= 0 && address < this.locations.length) {
                return this.locations[address];
            }

            return undefined;
        }
    }]);

    return Store;
}();
//# sourceMappingURL=store.js.map