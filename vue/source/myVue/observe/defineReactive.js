import observe from "./index.js";

export default function defineReactive(data, key, value) {
  // 递归reactive
  observe(value);

  Object.defineProperty(data, key, {
    get() {
      console.log("trigger getter");
      return value;
    },

    set(newVal) {
      console.log("trigger setter");
      if (newVal === value) return;

      // 可能设置的新值是个对象
      /*
       * 只要一开始在data里定义了属性，后面属性里新增的数据都可以reactive
       * 但是注意一开始没有定义的属性是不会进行监听的
       */
      observe(newVal);

      value = newVal;
    },
  });
}
