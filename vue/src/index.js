import Vue from "myVue";

const app = new Vue({
  el: "#app",

  data() {
    return {
      name: "leo",
      obj: {
        key: 55,
      },
      arr: [
        'leo',
        'pit',
        {
          age: 22
        }
      ]
    };
  },

  watch: {},
  computed: {},
});

console.log(app.name = 'pit');
console.log(app.arr.push('git'));
app.arr[2].age = 19;
console.log(app);
