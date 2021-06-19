import observe from "./observe.js";

export default function (arr) {
  for (const val of arr) {
    observe(val);
  }
}
