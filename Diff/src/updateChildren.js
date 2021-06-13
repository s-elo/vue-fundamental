import createElement from "./createElement";
import patchVnode from "./patchVnode";

function isSameNode(oldVnode, newVnode) {
  return oldVnode.sel === newVnode.sel && oldVnode.key === newVnode.key;
}

export default function updateChildren(parentElm, oldCh, newCh) {
  let oldStartIdx = 0;
  let newStartIdx = 0;
  let oldEndIdx = oldCh.length - 1;
  let newEndIdx = newCh.length - 1;

  let oldStartVnode = oldCh[0];
  let newStartVnode = newCh[0];
  let oldEndVnode = oldCh[oldEndIdx];
  let newEndVnode = newCh[newEndIdx];

  let keyMap = null;

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    // first to see if there is any undefined in old or new vnodes
    if (oldStartVnode == null || oldCh[oldStartIdx] === undefined) {
      oldStartVnode = oldCh[++oldStartIdx];
    } else if (oldEndVnode == null || oldCh[oldEndIdx] === undefined) {
      oldEndVnode = oldCh[--oldEndIdx];
    } else if (newStartVnode == null || newCh[newStartIdx] === undefined) {
      newStartVnode = newCh[++newStartIdx];
    } else if (newEndVnode == null || newCh[newEndIdx] === undefined) {
      newEndVnode = newCh[--newEndIdx];
    } else if (isSameNode(oldStartVnode, newStartVnode)) {
      patchVnode(oldStartVnode, newStartVnode);

      oldStartVnode = oldCh[++oldStartIdx];
      newStartVnode = newCh[++newStartIdx];
    } else if (isSameNode(oldEndVnode, newEndVnode)) {
      patchVnode(oldEndVnode, newEndVnode);

      oldEndVnode = oldCh[--oldEndIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (isSameNode(oldStartVnode, newEndVnode)) {
      patchVnode(oldStartVnode, newEndVnode);

      // insert after the oldEnd
      // if the second param is null, it is like appendChild
      parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling);

      oldStartVnode = oldCh[++oldStartIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (isSameNode(oldEndVnode, newStartVnode)) {
      patchVnode(oldEndVnode, newStartVnode);

      // insert before the oldStart
      parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm);

      oldEndVnode = oldCh[--oldEndIdx];
      newStartVnode = newCh[++newStartIdx];
    } else {
      // no match
      // key is the key of the vnode, value is the index of the vnode
      if (!keyMap) {
        keyMap = {};

        for (let i = oldStartIdx; i <= oldEndIdx; i++) {
          const key = oldCh[i].key;
          if (key !== undefined) {
            keyMap[key] = i;
          }
        }
      }

      console.log(keyMap);

      const inxInOld = keyMap[newStartVnode.key];
      // newStartVnode is a new one, add it before the oldStart
      if (inxInOld == null) {
        parentElm.insertBefore(createElement(newStartVnode), oldStartVnode.elm);
      } else {
        // match, need to be moved
        const elmTomove = oldCh[inxInOld];

        if (elmTomove.elm) {
          patchVnode(elmTomove, newStartVnode);

          // set it as undefined to mark
          oldCh[inxInOld] = undefined;

          // move to the position before oldStart
          parentElm.insertBefore(elmTomove.elm, oldStartVnode);
        }
      }

      // only move the newStart node
      newStartVnode = newCh[++newStartIdx];
    }
  }

  // after while, see if there are more nodes in oldCh or newCh
  // that havent been hadnled
  if (newStartIdx <= newEndIdx) {
    // add more nodes

    // // a flag to fix the insert position
    // const before =
    //   newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm;

    // traverse to insert
    for (let i = newStartIdx; i <= newEndIdx; i++) {
      // so far the newCh[i] doesnt have real DOM
      parentElm.insertBefore(createElement(newCh[i]), oldCh[oldStartIdx].elm);
    }
  } else if (oldStartIdx <= oldEndIdx) {
    // delete nodes
    // traverse to delete
    for (let i = oldStartIdx; i <= oldEndIdx; i++) {
      if (oldCh[i]) {
        parentElm.removeChild(oldCh[i].elm);
      }
    }
  }
}
