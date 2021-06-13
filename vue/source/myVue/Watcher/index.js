let id = 0;
export default class Watcher {
    constructor(vm, expOrFn, cb = () => {}, opts) {
        this.vm = vm;
        this.expOrFn = expOrFn;
        this.cb = cb;
        this.id = id++;

        if (typeof expOrFn === 'function') {
            this.getter = expOrFn;
        }

        // 默认在创建一个watcher后调用
        this.get();
    }

    get() {
        this.getter();
    }
}
