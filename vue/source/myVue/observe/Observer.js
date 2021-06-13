import defineReactive from "./defineReactive.js";
import observeArray from "./observeArray.js";
import arrayMethods from './arrayMethods.js';

export default class Observer {
  // 此时data就是vm._data
  constructor(data) {
    if (data instanceof Array) {
      data.__proto__ = arrayMethods;

      observeArray(data);
    } else {
      // 进行逐层响应式
      this.walk(data);
    }
  }

  walk(data) {
    for (const key in data) {
      defineReactive(data, key, data[key]);
    }
  }
}
