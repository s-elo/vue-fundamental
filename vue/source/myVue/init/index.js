import observe from "../observe/observe.js";
import proxy from '../observe/proxy.js';

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
    proxy(vm, '_data', key);
  }

  observe(data);
}

function initWatch(vm) {}

function initComputed(vm) {}
