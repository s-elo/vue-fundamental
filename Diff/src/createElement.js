// create an element and insert before the parentNode of pivot
export default function createElement (newVnode) {
  const newNode = document.createElement(newVnode.sel);

  // if it has text or children
  if (
    newVnode.text !== undefined &&
    (newVnode.children === undefined || newVnode.children.length === 0)
  ) {
    newNode.innerText = newVnode.text;

    newVnode.elm = newNode;
  } else if (
    newVnode.children instanceof Array &&
    newVnode.children.length > 0
  ) {
      // create the children nodes
      for (const node of newVnode.children) {
          const newChild = createElement(node, newNode);

          newNode.appendChild(newChild);
      }

      newVnode.elm = newNode;
  }

  return newVnode.elm;
}
