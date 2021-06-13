import vnode from "./vnode";
import createElement from "./createElement";
import patchVnode from './patchVnode';

export default function (oldVnode, newVnode) {
  // see if it is real node or virtual node
  if (oldVnode.sel === undefined || oldVnode.sel === "") {
    // make it as a virtual node
    oldVnode = vnode(
      oldVnode.tagName.toLowerCase(),
      {},
      [],
      undefined,
      oldVnode
    );
  }

  // see if they are the same node
  if (
    oldVnode.key === newVnode.key &&
    oldVnode.sel === newVnode.sel
  ) {
    console.log("same");
    patchVnode(oldVnode, newVnode);
  } else {
    console.log("not the same");
    const { elm: oldNode } = oldVnode;

    // after createElement, newVnode.elm has a real dom node
    const newNode = createElement(newVnode);

    if (oldNode && newNode) {
      oldNode.parentNode.insertBefore(newNode, oldNode);
    }

    // remove the old node
    oldNode.parentNode.removeChild(oldNode);
  }
}
