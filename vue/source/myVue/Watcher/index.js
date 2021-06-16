import { popTarget, pushTarget } from "../Dep/Dep";

let id = 0;
export default class Watcher {
  constructor(vm, expOrFn, cb = () => {}, opts) {
    this.vm = vm;
    this.expOrFn = expOrFn;
    this.cb = cb;
    this.id = id++;
    this.deps = [];
    this.depsId = new Set();

    if (typeof expOrFn === "function") {
      this.getter = expOrFn;
    }

    // 默认在创建一个watcher后调用
    this.get();
  }

  get() {
    pushTarget(this); // 添加到Dep.target中
    this.getter();
    popTarget();
  }

  update() {
    // 防止一次性批量赋值重复渲染
    // 将watchers都先放到一个队列中，然后异步执行这个队列中的watch
    // 同时在添加的过程中如果遇到相同id的watcher(同个属性的)，就不添加
    // 这样就防止同一个watcher多次渲染
    watcherQueue(this);
  }

  run() {
    this.get();
  }

  addDep(dep) {
    if (!this.depsId.has(dep.id)) {
      this.deps.push(dep);
      this.depsId.add(dep.id);
      // 将此watcher存到dep中
      dep.addSub(this);
    }
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
