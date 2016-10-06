var Contact = (function () {
    function Contact(data) {
    }
    return Contact;
}());
var ContactWidget = (function () {
    function ContactWidget() {
    }
    ContactWidget.prototype.controller = function () {
        var result = ['just one'];
        var onsave = function (value) {
            result.push(value);
        };
        return {
            result: result,
            onsave: onsave
        };
    };
    ContactWidget.prototype.view = function (ctrl) {
        return m('div', [
            m(new ContactForm(), ctrl),
            m(new ContactList(), ctrl)
        ]);
    };
    return ContactWidget;
}());
var ContactForm = (function () {
    function ContactForm() {
    }
    ContactForm.prototype.controller = function (data) {
        var name = m.prop('name');
        var save = function () {
            data.onsave(name());
        };
        return {
            name: name,
            save: save
        };
    };
    ContactForm.prototype.view = function (ctrl) {
        return m('form.pure-form', [
            m("input", { oninput: m.withAttr("value", ctrl.name), value: ctrl.name() }),
            m("button[type=button].pure-button.pure-button-primary", { onclick: ctrl.save }, "Save")
        ]);
    };
    return ContactForm;
}());
var ContactList = (function () {
    function ContactList() {
    }
    ContactList.prototype.controller = function (data) {
        return {
            res: data.result
        };
    };
    ContactList.prototype.view = function (ctrl) {
        return m('ul.pure-menu-list', [
            ctrl.res.map(function (item) {
                return m('li.pure-menu-item', item);
            })
        ]);
    };
    return ContactList;
}());
m.mount(document.getElementById('app'), new ContactWidget());
