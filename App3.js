"use strict";
var ContactWidget3 = (function () {
    function ContactWidget3() {
    }
    ContactWidget3.prototype.controller = function () {
        var result = [];
        var onsave = function (value, done) {
            m.request({ method: 'POST', url: '/api/check', background: true, data: { foo: value } }).then(function (val) {
                result.push(val);
                done();
                m.redraw();
            });
        };
        return {
            result: result,
            onsave: onsave
        };
    };
    ContactWidget3.prototype.view = function (ctrl) {
        return m('div', [
            m(new ContactForm3(), ctrl),
            m(new ContactList3(), ctrl)
        ]);
    };
    return ContactWidget3;
}());
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/observable/fromEvent');
require('rxjs/add/operator/map');
require('rxjs/add/operator/debounceTime');
require('rxjs/add/operator/distinctUntilChanged');
var ContactForm3 = (function () {
    function ContactForm3() {
        this.config = function (e, isInitialized) {
            if (isInitialized)
                return;
            Observable_1.Observable.fromEvent(e, "input")
                .map(function (v) { return v.target.value; })
                .debounceTime(500)
                .distinctUntilChanged()
                .subscribe(function (v) {
                console.log('sub', v);
            });
        };
    }
    ContactForm3.prototype.controller = function (args) {
        var name = m.prop('');
        var onkeyupval = m.prop('');
        var save = function (e) {
            e.preventDefault();
            disabled(true);
            args.onsave(name(), function () {
                name('');
                disabled(false);
            });
        };
        var disabled = m.prop(false);
        return {
            name: name,
            save: save,
            disabled: disabled,
            onkeyupval: onkeyupval
        };
    };
    ContactForm3.prototype.view = function (ctrl, args, extras) {
        return m('form.pure-form', { onsubmit: ctrl.save }, [
            m("input", { oninput: m.withAttr("value", ctrl.name), onkeyup: m.withAttr("value", ctrl.onkeyupval), value: ctrl.name(), placeholder: 'Enter something...', disabled: ctrl.disabled(), config: this.config }),
            m("button[type=submit].pure-button.pure-button-primary", { disabled: ctrl.disabled() }, "Save")
        ]);
    };
    return ContactForm3;
}());
var ContactList3 = (function () {
    function ContactList3() {
    }
    ContactList3.prototype.controller = function (data) {
        return {
            res: data.result
        };
    };
    ContactList3.prototype.view = function (ctrl) {
        return m('ul.pure-menu-list', [
            ctrl.res.map(function (item) {
                return m('li.pure-menu-item', item.foo);
            })
        ]);
    };
    return ContactList3;
}());
m.mount(document.getElementById('app'), new ContactWidget3());
