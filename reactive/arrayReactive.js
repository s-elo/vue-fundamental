import { def } from "./utils.js";

export const arrayPrototype = {...Array.prototype};

const arrayMethods = [
  "push",
  "pop",
  "unshift",
  "shift",
  "sort",
  "reverse",
  "splice",
];

for (const methodName of arrayMethods) {
  // the third param is the key of realizing array reactive
  // in that function, we will copy the original method
  // and at the same time, to know the method is being called, so the array is being operated
  // arrayPrototype[methodName] = that function
  const originalMethod = Array.prototype[methodName];

  def(
    arrayPrototype,
    methodName,
    function () {
      console.log("array being operated");
      
      // get the observer
      const ob = this.__ob__;
      
      let insertedVal = null;
      switch(methodName) {
        case 'push':
            // insertedVal = [...arguments];
            // break;
        case 'unshift':
            insertedVal = [...arguments];
            break;
        case 'splice':
            // get the insertedVal from splice args
            insertedVal = [...arguments].slice(2);
            break;
      }

      // observe all the elms in the arr
      if (insertedVal) {
        console.log(ob);
        ob.observeArray(insertedVal);
      }

      // this is the array calling this method
      const res = originalMethod.apply(this, arguments);

      ob.dep.notify();

      return res;
    },
    false
  );
}
