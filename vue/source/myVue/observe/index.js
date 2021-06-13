import Observer from "./Observer.js";

export default function observe(data) {
  if (typeof data !== "object" || data === null) return;

  // 把数据给观察者
  return new Observer(data);
}
