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

setTimeout(() => {
  app.name = 'pit';
  app.name = 'leo';
  app.name = 'git';
}, 2000);

// console.log(app.obj.key);
// console.log(app);
