import Dep from './Dep.js';
import observe from './observe.js';

export default function defineReactive(data, key, val) {
  // the Dep instance corresponding to each key in this closure
  const dep = new Dep();

  // data already has the key
  if (arguments.length === 2) {
    val = data[key];
  }

  // observe the child
  const childOb = observe(data[key]);

  Object.defineProperty(data, key, {
    // writable: true,
    configurable: true,
    enumerable: true,

    get() {
      // console.log(`access ${key}`);

      // if it is collecting dep
      if (Dep.target) {
        dep.addDep();
        
        if (childOb) {
          childOb.dep.addDep();
        }
      }

      return val;
    },

    set(newVal) {
      if (val !== newVal) {
        // console.log(`setting ${key}`);
        val = newVal;

        // when newVal is also an obj, observe it
        // same reference
        observe(newVal);

        dep.notify();
      }
    },
  });
}
