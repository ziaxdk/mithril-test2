
export module ziax {
  export interface ITest {
    do(): void;
  }

  export class Test implements ITest {
    do() {
      console.log('I did...');
    }
  }
}


import * as Imp from './ModuleTest'
var instance = new Imp.ziax.Test();
instance.do();


import { Observable } from 'rxjs';
console.log(Observable)