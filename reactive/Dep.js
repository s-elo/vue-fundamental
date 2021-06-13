let uid = 0;
export default class Dep {
  constructor() {
    this.id = uid++;

    // to store the subscribers
    // the values are the instance of the watcher
    this.subs = [];
  }

  // add subcriber
  addSub(sub) {
    this.subs.push(sub);
  }

  // add dep
  addDep() {
    if (Dep.target) {
      this.addSub(Dep.target);
    }
  }

  // notify the corresponding watcher to update
  notify() {
    // console.log("notify");

    const subs = [...this.subs];

    for (const val of subs) {
      val.update();
    }
  }
}
