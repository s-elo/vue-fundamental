import observe from "./index.js";
import Dep from '../Dep/Dep';

export default function defineReactive(data, key, value) {
  // 递归reactive
  observe(value);

  // 每个属性都有一个依赖收集实例
  // 用来存放和此属性相关的watcher
  // 当属性有在模板表达式中使用，即改变此属性需要更新视图时
  // 此属性就应该绑定一个watcher，一个模板绑定一个watcher
  // 所以多处用到此属性时就会有多个watcher被收集到此dep中
  const dep = new Dep();

  Object.defineProperty(data, key, {
    get() {
      if (Dep.target) {
        // 将dep存到watcher中
        dep.depend();
      }

      // console.log(key, dep);
      return value;
    },

    set(newVal) {
      if (newVal === value) return;

      // 可能设置的新值是个对象
      /*
       * 只要一开始在data里定义了属性，后面属性里新增的数据都可以reactive
       * 但是注意一开始没有定义的属性是不会进行监听的
       */
      observe(newVal);

      value = newVal;

      dep.notify(); // 通知更新(如果没有watcher就不会触发更新视图)
    },
  });
}
