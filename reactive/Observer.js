import { def } from "./utils.js";
import defineReactive from "./defineReactive.js";
import { arrayPrototype } from "./arrayReactive.js";
import observe from "./observe.js";
import Dep from "./Dep.js";

export default class Observer {
  constructor(value) {
    // every instance of the Observer has the Dep instance as a key
    this.dep = new Dep();
    
    // put the Observer instance into the __ob__ of the value
    // and it is not enumerable
    def(value, "__ob__", this, false);

    if (value instanceof Array) {
      // or value.__proto__ = arrayPrototype
      Object.setPrototypeOf(value, arrayPrototype);
    } else {
      // react all the keys of the value
      this.walk(value);
    }
  }

  walk(value) {
    for (const key in value) {
      defineReactive(value, key);
    }
  }

  observeArray(arr) {
    // react if the elms in array are also obj or array
    const length = arr.length;

    for (let i = 0; i < length; i++) {
      observe(arr[i]);
    }
  }
}
