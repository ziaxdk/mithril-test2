

interface IContactWidget3 {
  onsave(value: string, done: () => void): void;
  result: string[];
}

class ContactWidget3 implements Mithril.Component<IContactWidget3> {


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
      m(new ContactForm3(), ctrl),
      m(new ContactList3(), ctrl)
    ]);
  }

}

interface IContactForm3 {
  save(e): void;
  name: Mithril.Property<string>;
  disabled: Mithril.Property<boolean>;
  onkeyupval: Mithril.Property<string>;
}

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

class ContactForm3 implements Mithril.Component<IContactForm3> {

  config = (e, isInitialized) => {
    if (isInitialized) return;
    Observable.fromEvent(e, "input")
      .map((v: any) => v.target.value)
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe((v) => {
      console.log('sub', v);
    })
  }

  controller(args: IContactWidget3) {
    let name = m.prop('');
    let onkeyupval = m.prop('');
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
      disabled: disabled,
      onkeyupval: onkeyupval
    };
  }

  view(ctrl, args, extras) {
    return m('form.pure-form', { onsubmit: ctrl.save }, [
       m("input", { oninput: m.withAttr("value", ctrl.name), onkeyup: m.withAttr("value", ctrl.onkeyupval), value: ctrl.name(), placeholder: 'Enter something...', disabled: ctrl.disabled(), config: this.config }),
       m("button[type=submit].pure-button.pure-button-primary", { disabled: ctrl.disabled() }, "Save")
    ]);
  }

}

interface IContactList3 {
  res: string[];
}

class ContactList3 implements Mithril.Component<IContactList3> {
  controller(data: IContactWidget3) {
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



m.mount(document.getElementById('app'), new ContactWidget3());
