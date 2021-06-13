import h from "./h";
import patch from "./patch";

const domRoot = document.getElementById("root");
const btn = document.querySelector("button");

const v1 = h("h1", {}, [
  h("p", {key: 'A'}, "A"),
  h("p", {key: 'B'}, "B"),
  h("p", {key: 'C'}, "C"),
]);

const v2 = h("h1", {}, [
  // h('p', {key: 'M'}, 'M'),
  h("p", {key: 'C'}, "C"),
  h("p", {key: 'B'}, "B"),
  h("p", {key: 'A'}, "tt"),
]);

const v3 = h("h1", {}, [
  h("p", {key: 'Q'}, "Q")
  // h("p", {key: 'A'}, "A"),
  // h("p", {key: 'B'}, "B"),
  // h("p", {key: 'C'}, "C"),
  // h("p", {key: 'D'}, "D"),
]);

patch(domRoot, v1);

btn.onclick = () => {
  patch(v1, v3);
};

// const t1 = h("div", {}, "leo");
// const t2 = h("div", {}, [h("p", {}, "pit"), h("p", {}, "git")]);
// const t3 = h('div', {}, h('p', {}, 'leo'));

// console.log(t1);
// console.log(t2);
// console.log(t3);
