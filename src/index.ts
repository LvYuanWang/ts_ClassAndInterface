// this在ts中, 可以用作值, 也可以用作类型
// 实现一个简化版的set数据结构
class SimpleSet {
  private elements: Map<number, boolean>;
  constructor() {
    this.elements = new Map<number, boolean>;
  }

  // 返回值为this, 以便链式调用, 以及在子类中调用父类方法时, 返回子类实例
  add(element: number): this {
    console.log(this.constructor.name); // 当子类调用父类方法时, this指向子类实例
    this.elements.set(element, true);
    return this;  // 返回this, 以便链式调用, 这里的this是SimpleSet类型
  }

  has(element: number) {
    return this.elements.has(element);
  }

  delete(element: number) {
    return this.elements.delete(element);
  }

  values() {
    return Array.from(this.elements.keys());
  }
}

class MutableSet extends SimpleSet {
  // override add(element: number): MutableSet {
  //   super.add(element);
  //   return this;
  // }

  show() {
    console.log(`${this.constructor.name} Show`);
  }
}

const mySet = new MutableSet();
mySet.add(1).add(2).add(3).show();
console.log(mySet.has(5), mySet.has(2));

mySet.delete(3);
console.log(mySet.values());