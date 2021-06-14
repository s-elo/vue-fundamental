let id = 0;

export default class Dep {
  constructor() {
    this.id = id++;
    this.subs = [];
  }

  addSub(watcher) {
    this.subs.push(watcher);
  }

  notify() {
    this.subs.forEach((watcher) => {
      watcher.update();
    });
  }

  depend() {
    if (Dep.target) {
      // watcher.addDep(dep)
      Dep.target.addDep(this);
    }
  }
}

// 保存当前watcher
const stack = [];

export function pushTarget(watcher) {
  Dep.target = watcher;
  stack.push(watcher);
}

export function popTarget() {
  stack.pop();
  Dep.target = stack[stack.length - 1];
}
