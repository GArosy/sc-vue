class ReactiveEffect {
  private _fn: any;

  constructor(fn) {
    this._fn = fn;
  }

  run() {
    activeEffect = this;
    return this._fn();
  }
}

// 响应式对象的集合
const targetMap = new WeakMap();
// 依赖收集
export const track = (target, key) => {
  // 响应式属性的集合
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }

  // 属性依赖的集合
  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Set();
    depsMap.set(key, dep);
  }

  // 添加依赖
  dep.add(activeEffect);
};

// 触发依赖
export const trigger = (target, key) => {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;
  const dep = depsMap.get(key);
  if (dep) {
    dep.forEach((effect) => effect.run());
  }
};

let activeEffect;
export const effect = (fn) => {
  // fn
  const _effect = new ReactiveEffect(fn);
  _effect.run();
  return _effect.run.bind(_effect);
};
