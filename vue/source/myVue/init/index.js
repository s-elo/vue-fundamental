import observe from "../observe/observe.js";
import proxy from "../observe/proxy.js";
import Watcher from '../Watcher/index';
import Dep from '../Dep/Dep';

export default function initState(vm) {
  const opts = vm.$options;

  // 初始化不同的工作
  if (opts.data) {
    initData(vm);
  }
  if (opts.watch) {
    initWatch(vm);
  }
  if (opts.computed) {
    initComputed(vm);
  }
}

function initData(vm) {
  let data = vm.$options.data;

  // 看数据是否是函数
  // 顺便为vue实例加上_data属性
  data = vm._data = typeof data === "function" ? data.call(vm) : data || {};

  // 将_data里的属性代理挂载到vm中
  for (const key in data) {
    proxy(vm, "_data", key);
  }

  observe(data);
}

function initWatch(vm) {
  const watch = vm.$options.watch;

  for (const key in watch) {
    vm.$watch(key, watch[key]);
  }
}

function initComputed(vm) {
  // 用于缓存计算属性的watcher
  const watchers = (vm._watcherComputed = {});

  const computeds = vm.$options.computed;

  for (const key in computeds) {
    // 注意第二个参数是一个方法，和更新方法一样
    watchers[key] = new Watcher(vm, computeds[key], () => {}, {
      // lazy 为true就是缓存，用于watcher那里判断是否要默认this.get()
      lazy: true,
    });

    Object.defineProperty(vm, key, {
      get: createComputedGetter(vm, key),
    });
  }
}

function createComputedGetter(vm, key) {
  const watcher = vm._watcherComputed[key];

  return function () {
    if (watcher) {
      if (watcher.dirty) {
        // 页面取值时dirty如果为true就会调用get方法计算
        watcher.computeVal();
      }
      if (Dep.target) {
        watcher.depend();
      }
      // 计算之后的值存在了value中
      return watcher.value;
    }
  };
}
