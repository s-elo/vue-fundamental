import observeArray from "./observeArray";

const oldArrayMethods = Array.prototype;

const arrayMethods = Object.create(oldArrayMethods);

const methods = [
  "push",
  "unshift",
  "shift",
  "pop",
  "reserve",
  "splice",
  "sort",
];

for (const method of methods) {
  arrayMethods[method] = function (...args) {
    const res = oldArrayMethods[method].apply(this, args);

    console.log("change array");

    // 监听新增元素
    let insertValArr;
    switch (method) {
      case "push":
      case "unshift":
        insertValArr = [...args];
        break;
      case "splice":
        insertValArr = [...args].slice(2);
      default:
        break;
    }

    if (insertValArr) {
      observeArray(insertValArr);
    }

    return res;
  };
}

export default arrayMethods;
