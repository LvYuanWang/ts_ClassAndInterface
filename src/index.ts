// this在ts中, 可以用作值, 也可以用作类型
// 实现一个简化版的set数据结构

// 类的泛型支持
class SimpleSet<T> {
  private elements: Map<T, boolean>;
  constructor(initialElements: T[] = []) {
    this.elements = new Map<T, boolean>;
    initialElements.forEach(element => this.add(element));
  }

  // 返回值为this, 以便链式调用, 以及在子类中调用父类方法时, 返回子类实例
  add(element: T): this {
    console.log(this.constructor.name); // 当子类调用父类方法时, this指向子类实例
    this.elements.set(element, true);
    return this;  // 返回this, 以便链式调用, 这里的this是SimpleSet类型
  }

  has(element: T) {
    return this.elements.has(element);
  }

  delete(element: T) {
    return this.elements.delete(element);
  }

  values() {
    return Array.from(this.elements.keys());
  }

  // 静态泛型方法
  static fo<E>(...elements: E[]): SimpleSet<E> {
    const set = new SimpleSet<E>();
    elements.forEach(element => set.add(element));
    return set;
  }
}

class MutableSet<T> extends SimpleSet<T> {
  override add(element: T): this {
    super.add(element);
    return this;
  }

  show() {
    console.log(`${this.constructor.name} Show`);
  }
}

const mySet1 = new SimpleSet<number>();
mySet1.add(1).add(2).add(3);
console.log(mySet1.has(5), mySet1.has(2));

mySet1.delete(3);
console.log(mySet1.values());

const mySet2 = new SimpleSet(["a", "b", "c"]);
console.log(mySet2.values());

// 调用静态泛型方法
const mySet3 = SimpleSet.fo(100, 200, 300);
console.log(mySet3.values());