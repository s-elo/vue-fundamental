import initState from "./init/index.js";
import Watcher from "./Watcher/index";
import { compile } from "./utils.js";

export default class Vue {
  constructor(options) {
    this.$options = options;
    this._init();
  }

  _init() {
    initState(this);

    if (this.$options.el) {
      // 根据数据挂载视图
      this.$mount();
    }
  }

  query(el) {
    return typeof el === "string" ? document.querySelector(el) : el;
  }

  $mount() {
    const el = (this.$el = this.query(this.$options.el));

    const updateComponent = () => {
      console.log("update views");

      this._update();
    };

    new Watcher(this, updateComponent);
  }

  _update() {
    const el = this.$el;

    const vNode = document.createDocumentFragment();

    let node;
    while ((node = el.firstChild)) {
      // 是真的直接把node移动到了fragment中，el中的节点是不断减少的
      vNode.appendChild(node);
    }

    // 将数据渲染到视图上
    compile(vNode, this);
    // 将渲染后的DOM重新挂载回去
    return el.appendChild(vNode);
  }

  $watch(key, handler) {
    new Watcher(this, key, handler, { user: true });
  }
}
