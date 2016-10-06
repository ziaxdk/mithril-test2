class Contact {
  constructor(data) {

  }
}


interface IContactWidget {
  onsave(value: string): void;
  result: string[];
}

class ContactWidget implements Mithril.Component<IContactWidget> {


  controller() {
    let result = ['just one'];
    let onsave = (value) => {
      result.push(value);
    }

    return {
      result: result,
      onsave: onsave
    };
  }

  view(ctrl) {
    return m('div', [
      m(new ContactForm(), ctrl),
      m(new ContactList(), ctrl)
    ]);
  }

}

interface IContactForm {
  save(): void;
  name: Mithril.Property<string>;
}

class ContactForm implements Mithril.Component<IContactForm> {

  controller(data: IContactWidget) {
    let name = m.prop('name');
    let save = () => {
      data.onsave(name());
    }
    return {
      name: name,
      save: save
    };
  }

  view(ctrl) {
    return m('form.pure-form', [
       m("input", { oninput: m.withAttr("value", ctrl.name), value: ctrl.name() }),
       m("button[type=button].pure-button.pure-button-primary", { onclick: ctrl.save }, "Save")
    ]);
  }

}

interface IContactList {
  res: string[];
}

class ContactList implements Mithril.Component<IContactList> {
  controller(data: IContactWidget) {
    return {
      res: data.result
    };
  }

  view(ctrl) {
    return m('ul.pure-menu-list', [
      ctrl.res.map(item => {
        return m('li.pure-menu-item', item)
      })
    ]);
  }

}



m.mount(document.getElementById('app'), new ContactWidget());
