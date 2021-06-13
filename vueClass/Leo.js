import Compile from "./Compile.js";
import observe from "../reactive/observe.js";
import Watcher from '../reactive/Watcher.js';

export default class Leo {
  constructor(options = {}) {
    this.$options = options;

    this._data = options.data || undefined;

    this.$options.beforeCreate();

    // make the data reactive
    observe(this._data);

    this._initData();

    // bind a watcher for the watch
    this._initWatch();

    this.$options.created();

    // template compile
    new Compile(options.el, this);
  }

  _initData() {
      // bind the data with the leo instance itself from leo._data
    for (const key in this._data) {
      Object.defineProperty(this, key, {
        get() {
          return this._data[key];
        },
        set(newVal) {
          this._data[key] = newVal;
        },
      });
    }
  }

  _initWatch() {
      const watch = this.$options.watch;

      // that is why the key is represented as the data
      for (const key in watch) {
        new Watcher(this, key, watch[key]);
      }
  }
}
