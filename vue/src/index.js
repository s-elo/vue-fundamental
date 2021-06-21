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
        "leo",
        "pit",
        {
          age: 22,
        },
      ],
      arr1: [1, 2, 3],
    };
  },

  watch: {
    name(newVal, oldVal) {
      console.log(newVal, oldVal);
    },
  },
  computed: {
    info() {
      return `${this.name}--22`;
    }
  },
});

setTimeout(() => {
  app.name = "pit";
  app.name = "leo";
  app.name = "git";
  app.arr1.push(4);
}, 2000);

// console.log(app.obj.key);
// console.log(app);
