

interface IContactWidget2 {
  onsave(value: string, done: () => void): void;
  result: string[];
}

class ContactWidget2 implements Mithril.Component<IContactWidget2> {


  controller() {
    let result = [];
    let onsave = (value, done) => {
      m.request({ method: 'POST', url: '/api/check', background:  true, data: { foo: value } }).then(val => {
        result.push(val);
        done();
        m.redraw();
      });
    }

    return {
      result: result,
      onsave: onsave
    };
  }

  view(ctrl) {
    return m('div', [
      m(new ContactForm2(), ctrl),
      m(new ContactList2(), ctrl)
    ]);
  }

}

interface IContactForm2 {
  save(e): void;
  name: Mithril.Property<string>;
  disabled: Mithril.Property<boolean>;
}

class ContactForm2 implements Mithril.Component<IContactForm2> {

  controller(args: IContactWidget2) {
    let name = m.prop('');
    let save = (e) => {
      e.preventDefault();
      disabled(true);
      args.onsave(name(), () => {
        name('');
        disabled(false);
      });
    }
    let disabled = m.prop(false);
    return {
      name: name,
      save: save,
      disabled: disabled
    };
  }

  view(ctrl, args, extras) {
    return m('form.pure-form', { onsubmit: ctrl.save }, [
       m("input", { oninput: m.withAttr("value", ctrl.name), value: ctrl.name(), placeholder: 'Enter something...', disabled: ctrl.disabled() }),
       m("button[type=submit].pure-button.pure-button-primary", { disabled: ctrl.disabled() }, "Save")
    ]);
  }

}

interface IContactList2 {
  res: string[];
}

class ContactList2 implements Mithril.Component<IContactList2> {
  controller(data: IContactWidget2) {
    return {
      res: data.result
    };
  }

  view(ctrl) {
    return m('ul.pure-menu-list', [
      ctrl.res.map(item => {
        return m('li.pure-menu-item', item.foo)
      })
    ]);
  }

}



m.mount(document.getElementById('app'), new ContactWidget2());
