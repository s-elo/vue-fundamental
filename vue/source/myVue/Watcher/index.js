import { popTarget, pushTarget } from "../Dep/Dep";
import { getValue } from "../utils";

let id = 0;
export default class Watcher {
  constructor(vm, expOrFn, cb = () => {}, opts = {}) {
    this.vm = vm;
    this.expOrFn = expOrFn;
    this.cb = cb;
    this.id = id++;
    this.deps = [];
    this.depsId = new Set();
    // 看计算属性是否要缓存
    this.lazy = opts.lazy;
    // 为true就是重新计算，false就是走缓存
    this.dirty = this.lazy;

    // 区别是否是用户定义的watch
    if (typeof expOrFn === "function") {
      // 包含一开始初始化时的函数和计算属性的计算函数
      this.getter = expOrFn;
    } else {
      // 此时expOrFn就是watch里的key，被监听的数据
      this.getter = function () {
        return getValue(vm, expOrFn);
      };
    }

    // 默认在创建一个watcher后调用
    // 是计算属性的话就不用调用
    this.value = this.lazy ? undefined : this.get(); // 获取旧的值
  }

  get() {
    pushTarget(this); // 添加到Dep.target中

    const value = this.getter.call(this.vm); // 里面可能会用到vm的data

    popTarget();

    return value;
  }

  update() {
    // 防止一次性批量赋值重复渲染
    // 将watchers都先放到一个队列中，然后异步执行这个队列中的watch
    // 同时在添加的过程中如果遇到相同id的watcher(同个属性的)，就不添加
    // 这样就防止同一个watcher多次渲染

    // 如果是计算属性的话，这一步肯定是更新了
    if (this.lazy) {
      this.dirty = true;
    } else {
      watcherQueue(this);
    }
  }

  run() {
    const newVal = this.get();

    if (this.value !== newVal) {
      // 交给watch回调处理
      this.cb(newVal, this.value);
    }
  }

  addDep(dep) {
    if (!this.depsId.has(dep.id)) {
      this.deps.push(dep);
      this.depsId.add(dep.id);
      // 将此watcher存到dep中
      dep.addSub(this);
    }
  }

  depend() {
    // 将当前watcher添加到此计算属性wacher的所有依赖上
    for (const dep of this.deps) {
      dep.depend();
    }
  }

  computeVal() {
    this.value = this.get();

    this.dirty = false; // 下次就走缓存了
  }
}

const map = new Map();

function watcherQueue(watcher) {
  if (!map.has(watcher.id)) {
    map.set(watcher.id, watcher);
  }

  asyncRun(flushWatchers);
}

function flushWatchers() {
  // 执行每个watcher对应的更新回调函数
  for (const watcher of map.values()) {
    watcher.run();
  }

  // 清空watcher队列
  map.clear();
}

// 异步任务的回调函数们
const callbacks = [];

function flushCallbacks() {
  callbacks.forEach((cb) => {
    cb();
  });
}

function asyncRun(fn) {
  callbacks.push(fn);

  Promise.resolve().then(() => {
    flushCallbacks();
  });
}
