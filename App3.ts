

interface IContactWidget3 {
  onsave(value: string, done: () => void): void;
  result: string[];
  onahead(obs$: Observable<string>);
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
    let onahead = (obs$: Observable<string>) => {
      obs$.subscribe(value => {
        console.log('sub in widget3', value);
        m.request({ method: 'POST', url: '/api/ahead', data: { ahead: value } });
        
      });
    };

    return {
      result: result,
      onsave: onsave,
      onahead: onahead
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
  config(e: EventTarget, isInitialized: boolean): void;
}

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

class ContactForm3 implements Mithril.Component<IContactForm3> {
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
    let config = (e: EventTarget, isInitialized: boolean) => {
      if (isInitialized) return;
      let ob$ = Observable.fromEvent(e, "input")
        .map((v: any) => v.target.value)
        .debounceTime(50)
        .distinctUntilChanged();
      // ob$.subscribe(v => {
      //   console.log('sub', v);
      // })
      args.onahead(ob$);
    }
    return {
      name: name,
      save: save,
      disabled: disabled,
      config: config
    };
  }

  view(ctrl, args, extras) {
    return m('form.pure-form', { onsubmit: ctrl.save }, [
       m("input", { oninput: m.withAttr("value", ctrl.name), value: ctrl.name(), placeholder: 'Enter something...', disabled: ctrl.disabled(), config: ctrl.config }),
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
