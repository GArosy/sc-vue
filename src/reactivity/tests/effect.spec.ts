import { reactive } from '../reactive';
import { effect } from '../effect';

describe('effect', () => {
  it('happy path', () => {
    const user = reactive({
      age: 10,
    });
    let nextAge;
    effect(() => {
      nextAge = user.age + 1;
    });
    expect(nextAge).toBe(11);
    user.age += 1;
    expect(nextAge).toBe(12);
  });

  it('runner', () => {
    let foo = 10;
    const runner = effect(() => {
      foo += 1;
      return 'foo';
    });
    expect(foo).toBe(11);
    expect(runner()).toBe('foo');
    expect(foo).toBe(12);
  });

  it('scheduler', () => {
    let dummy;
    let run: any;
    const scheduler = jest.fn(() => {
      run = runner;
    });
    const obj = reactive({ foo: 1 });
    const runner = effect(
      () => {
        dummy = obj.foo;
      },
      { scheduler },
    );
    expect(scheduler).not.toHaveBeenCalled();
    expect(dummy).toBe(1);
    // should be called on first trigger
    obj.foo += 1;
    // effect一参不会被调用，而scheduler会被调用， dummy不会被更新
    expect(scheduler).toHaveBeenCalledTimes(1);
    expect(dummy).toBe(1);
    // 手动调用scheduler
    run();
    // dummy被更新
    expect(dummy).toBe(2);
  });
});
