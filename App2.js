var ContactWidget2 = (function () {
    function ContactWidget2() {
    }
    ContactWidget2.prototype.controller = function () {
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
    ContactWidget2.prototype.view = function (ctrl) {
        return m('div', [
            m(new ContactForm2(), ctrl),
            m(new ContactList2(), ctrl)
        ]);
    };
    return ContactWidget2;
}());
var ContactForm2 = (function () {
    function ContactForm2() {
    }
    ContactForm2.prototype.controller = function (args) {
        var name = m.prop('');
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
            disabled: disabled
        };
    };
    ContactForm2.prototype.view = function (ctrl, args, extras) {
        return m('form.pure-form', { onsubmit: ctrl.save }, [
            m("input", { oninput: m.withAttr("value", ctrl.name), value: ctrl.name(), placeholder: 'Enter something...', disabled: ctrl.disabled() }),
            m("button[type=submit].pure-button.pure-button-primary", { disabled: ctrl.disabled() }, "Save")
        ]);
    };
    return ContactForm2;
}());
var ContactList2 = (function () {
    function ContactList2() {
    }
    ContactList2.prototype.controller = function (data) {
        return {
            res: data.result
        };
    };
    ContactList2.prototype.view = function (ctrl) {
        return m('ul.pure-menu-list', [
            ctrl.res.map(function (item) {
                return m('li.pure-menu-item', item.foo);
            })
        ]);
    };
    return ContactList2;
}());
m.mount(document.getElementById('app'), new ContactWidget2());
