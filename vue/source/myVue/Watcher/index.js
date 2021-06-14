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
