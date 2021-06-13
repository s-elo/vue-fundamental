import observe from "../observe/index.js";

export default function (arr) {
  for (const val of arr) {
    observe(val);
  }
}
