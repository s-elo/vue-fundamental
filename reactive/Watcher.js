import Dep from "./Dep.js";

let uid = 0;

function parsePath(str) {
  const strArr = str.split(".");

  return function (obj) {
    for (const key of strArr) {
      if (obj == null) return;

      obj = obj[key];
    }

    return obj;
  };
}

export default class Watcher {
  constructor(target, expression, callback) {
    this.id = uid++;

    this.target = target;

    // expression = 'a.b.c' return a function to get the data
    this.getter = parsePath(expression);

    this.callback = callback;

    this.value = this.get();
  }

  // this function will be called in dep.notify
  update() {
    this.run();
  }

  get() {
    // begin to collect dep
    Dep.target = this;

    const obj = this.target;

    let value;

    try {
      value = this.getter(obj);
    } finally {
      Dep.target = null;
    }

    return value;
  }

  run() {
    this.getAndInvoke(this.callback);
  }

  getAndInvoke(callback) {
    const value = this.get();

    // only when value changed
    if (value !== this.value || typeof value === "object") {
      const oldVal = this.value;

      this.value = value;

      callback.call(this.target, value, oldVal);
    }
  }
}
