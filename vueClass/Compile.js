import Watcher from "../reactive/Watcher.js";

export default class Compile {
  constructor(el, leo) {
    // the leo instance
    this.$leo = leo;

    // mounted point
    this.$el = document.querySelector(el);

    // if there is a mounted point from users
    if (this.$el) {
      // convert real DOM into AST
      // but here,  we just convert it into a simple one
      // just like the token in mastache
      const $fragment = this.node2Fragment(this.$el);

      this.compile($fragment);

      // render the fragment DOM
      this.$el.appendChild($fragment);
    }
  }

  node2Fragment(el) {
    // here we use createDocumentFragment to instead token
    // it a original virtual DOM
    const fragment = document.createDocumentFragment();

    let child;

    // move the real children in fragment
    while ((child = el.firstChild)) {
      fragment.appendChild(child);
    }

    return fragment;
  }

  compile(el) {
    const childNodes = el.childNodes;

    // {{xxx}}
    const tempReg = /\{\{(.*)\}\}/;

    for (const child of childNodes) {
      const text = child.textContent;

      if (child.nodeType === 1) {
        this.compileElement(child);
      } else if (child.nodeType === 3 && tempReg.test(text)) {
        const dataName = text.match(tempReg)[1];
        this.compileText(child, dataName);
        console.log("match the text");
      }
    }
  }

  compileElement(node) {
    // console.log(node);
    // note that the node is the virtual DOM created by createDocumentFragment
    const nodeAttrs = [...node.attributes];

    for (const attr of nodeAttrs) {
      // analyze the commands
      const attrName = attr.name;
      const attrVal = attr.value;

      // start from v-xxx
      if (attrName.indexOf("v-") === 0) {
        const vCommand = attrName.slice(2);

        if (vCommand === "model") {
          console.log(`find a model command in ${node.tagName}!`);
          new Watcher(this.$leo, attrVal, (newVal) => {
            // node is the DOM like input
            // console.log(node);
            node.value = newVal;
          });

          // put the data initially
          node.value = this.getLeoVal(this.$leo, attrVal);

          // synchronize the data when inputing
          node.addEventListener("keyup", (e) => {
            this.setLeoVal(this.$leo, attrVal, e.target.value);
          });
        } else if (vCommand === "if") {
          console.log(`find a if command in ${node.tagName}!`);
        }
      }
    }
  }

  compileText(textNode, dataName) {
    const dataVal = this.getLeoVal(this.$leo, dataName);
    // textNode.textContent = textNode.textContent.replace(/\{\{.*\}\}/, dataVal);
    textNode.textContent = dataVal;

    // make it reactive
    // update the view when the data changed
    new Watcher(this.$leo, dataName, (newVal) => {
      textNode.textContent = newVal;
    });
    // console.log('text val:', textNode.textContent);
  }

  getLeoVal(leo, dataName) {
    let ret = leo;

    const keys = dataName.split(".");

    for (const key of keys) {
      ret = ret[key];
    }

    return ret;
  }

  setLeoVal(leo, dataName, value) {
    let obj = leo;

    const keys = dataName.split(".");

    for (const [index, key] of keys.entries()) {
      if (index < keys.length - 1) {
        obj = obj[k];
      } else {
        obj[key] = value;
      }
    }
  }
}
