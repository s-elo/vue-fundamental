export default function collectArrDeps(arr) {
  for (const val of arr) {
    val.__ob__ && val.__ob__.dep.depend();

    if (Array.isArray(val)) {
      collectArrDeps(val);
    }
  }
}
