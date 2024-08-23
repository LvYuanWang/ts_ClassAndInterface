## 类的泛型支持

同样，类也是支持泛型的，上面的SimpleSet我们基本上限定了只能了数字类型，我们应该使用泛型，到时候传递的是什么类型，SimpleSet中保存的就应该是什么类型

```typescript
class SimpleSet<T> {
  private elements: Map<T, boolean>;

  constructor(initialElements: T[] = []) {
    this.elements = new Map<T, boolean>();
    initialElements.forEach(element => this.add(element));
  }

  add(element: T): this {
    this.elements.set(element, true);
    return this; 
  }

  has(element: T): boolean {
    return this.elements.has(element);
  }

  delete(element: T): boolean {
    return this.elements.delete(element);
  }

  values(): T[] {
    return Array.from(this.elements.keys());
  }

  static of<E>(...elements: E[]): SimpleSet<E> {
    const set = new SimpleSet<E>();
    elements.forEach(element => set.add(element));
    return set;
  }
}

const mySet = new SimpleSet<number>();
mySet.add(1).add(2).add(3).add(4)
console.log(mySet)

const mySet2 = new SimpleSet(["a","b","c"]);
console.log(mySet2)

const mySet3 = SimpleSet.of(100, 200, 300);
console.log(mySet3.values()); // 输出: [100, 200, 300]
```

很明显，在声明类是绑定的泛型`T`，在每个实例方法和实例属性中都可以使用。

在构造函数中加上了参数，这样在new对象的时候，可以传入对应的类型，typescript可以进行类型推导，否则默认类型推导是`unknown`

新增了一个静态方法of，注意在**静态方法中不能访问类的泛型**。毕竟是直接通过类型调用的，所以必须要自己重新声明泛型参数