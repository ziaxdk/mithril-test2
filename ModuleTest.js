"use strict";
var ziax;
(function (ziax) {
    var Test = (function () {
        function Test() {
        }
        Test.prototype.do = function () {
            console.log('I did...');
        };
        return Test;
    }());
    ziax.Test = Test;
})(ziax = exports.ziax || (exports.ziax = {}));
var Imp = require('./ModuleTest');
var instance = new Imp.ziax.Test();
instance.do();
var rxjs_1 = require('rxjs');
console.log(rxjs_1.Observable);
