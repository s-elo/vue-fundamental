import Observer from "./Observer.js";

export default function observe(data) {
  if (typeof data !== "object" || data === null) return null;

  // 不会重复监听
  if (data.__ob__) {
    return data.__ob__;
  }

  // 把数据给观察者
  return new Observer(data);
}
