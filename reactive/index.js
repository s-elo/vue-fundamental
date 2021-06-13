import observe from './observe.js';
import Watcher from './Watcher.js';

const obj = {
    a: 100,
    b: 'leo',
    c: {
        m: {
            n: 'hhh'
        }
    },
    arr: [1, 2, 3]
}

observe(obj);

console.log(obj);

new Watcher(obj, 'c.m.n', function (val, oldVal) {
    console.log('watched you!!', val, oldVal);
});

obj.c.m.n = 500;

// obj.a = 200;

// obj.arr.push(4);
// console.log(obj.arr);
// console.log(obj.arr.splice(1,2,'a','b'));
// console.log(obj.arr);

// if change the value by index, it is not reactive!!
// it wont trigger the arrayMethods, but the value will be changed
// obj.arr[2] = 'leo';
// console.log(obj.arr);
// console.log(obj.a);
// console.log(obj.c.m.n);

// obj.c.m.mm = 'gg';

// console.log(obj.c);
// defineReactive(obj, 'name', 'leo');

// console.log(obj.name);
// obj.name = 'pit';
// console.log(obj.name);