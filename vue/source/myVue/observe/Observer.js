import defineReactive from "./defineReactive.js";
import observeArray from "./observeArray.js";
import arrayMethods from "./arrayMethods.js";
import Dep from "../Dep/Dep";

export default class Observer {
  // 此时data就是vm._data
  constructor(data) {
    // 专门的数组watcher依赖收集
    this.dep = new Dep();

    // 为每一个属性添加一个__ob__属性，对应此Observer实例
    Object.defineProperty(data, "__ob__", {
      get: () => this,
    });

    if (data instanceof Array) {
      Object.setPrototypeOf(data, arrayMethods);

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
