var Contact = (function () {
    function Contact(data) {
    }
    return Contact;
}());
var ContactWidget = (function () {
    function ContactWidget() {
    }
    ContactWidget.prototype.controller = function () {
        var result = [];
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
            m(new ContactForm(), null, ctrl),
            m(new ContactList(), ctrl)
        ]);
    };
    return ContactWidget;
}());
var ContactForm = (function () {
    function ContactForm() {
    }
    ContactForm.prototype.controller = function (data, args) {
        console.log('controller', arguments);
        var name = m.prop('');
        var save = function (e) {
            e.preventDefault();
            args.onsave(name());
        };
        return {
            name: name,
            save: save
        };
    };
    ContactForm.prototype.view = function (ctrl) {
        return m('form.pure-form', { onsubmit: ctrl.save }, [
            m("input", { oninput: m.withAttr("value", ctrl.name), value: ctrl.name(), placeholder: 'Enter something...' }),
            m("button[type=submit].pure-button.pure-button-primary", "Save")
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
