import createElement from './createElement';
import updateChildren from './updateChildren';

export default function patchVnode(oldVnode, newVnode) {
  if (oldVnode === newVnode) return;

  // if newNode has text without children
  if (
    newVnode.text !== undefined &&
    (newVnode.children === undefined || newVnode.children.length === 0)
  ) {
    if (oldVnode.text !== newVnode.text) {
      oldVnode.elm.innerText = newVnode.text;
    }
  } else {
    // newVnode no text, has children
    if (oldVnode.children !== undefined && oldVnode.children.length > 0) {
      // most difficult part
      updateChildren(oldVnode.elm, oldVnode.children, newVnode.children);
    } else {
      // oldVnode no children, has text
      // just append the children of newVnode
      const newNode = createElement(newVnode);
      oldVnode.elm.innerText = "";
      oldVnode.elm.parentNode.appendChild(newNode);
    }
  }
}
