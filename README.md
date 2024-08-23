## this返回类型

this可以用作值，也能用作类型。

比如我们现在要做一个ES6的`Set`数据结构的简化版：

```typescript
class SimpleSet {
  // 设置为元素设置为Map类型可以方便的使用内置的方法，我们不用重复造轮子
  // Map类型也便于扩展
  // 仅仅只关心键，值不关心，设置为boolean类型
  private elements: Map<number, boolean>;

  constructor() {
    this.elements = new Map<number, boolean>();
  }

  add(element: number): SimpleSet {
    this.elements.set(element, true);
    return this; // 链式调用
  }

  has(element: number): boolean {
    return this.elements.has(element);
  }

  delete(element: number): boolean {
    return this.elements.delete(element);
  }

  values(): number[] {
    return Array.from(this.elements.keys());
  }
}

// 示例使用
const mySet = new SimpleSet();

mySet.add(1).add(2).add(3); // 链式调用

console.log(mySet.values()); // 输出: [1, 2, 3]

mySet.delete(2);
console.log(mySet.values()); // 输出: [1, 3]
```

其他都没有什么问题，但是如果我们还有一个子类，子类可能需要处理其他的内容。

```typescript
class MutableSet extends SimpleSet {
  show() { 
    console.log('MutableSet show')
  }
}
```

乍一看没啥问题，但是我们如果再此调用add方法，就能看到具体的一些区别了

```typescript
const mySet = new MutableSet();

mySet.add(1).add(2).add(3).show(); // add方法返回的是SimpleSet,根本调用不到show方法
```

所以，为了保证子类的this返回正确，只能重写覆盖父类的add方法，目的仅仅就只是为了改写返回的对象类型

```typescript
class MutableSet extends SimpleSet {
  add(element: number): MutableSet {
    super.add(element);
    return this;
  }
  show() { 
    console.log('MutableSet show')
  }
}
```

其实，我们可以用一个简单的办法就能解决，在父类中，add方法的返回类型直接定义为`this`

```typescript
// 父类
class SimpleSet {
  add(element: number): this {
    this.elements.set(element, true);
    return this; // 链式调用
  }
	......
}

// 子类  
class MutableSet extends SimpleSet {
  show() { 
    console.log('MutableSet show')
  }
}

// 示例使用
const mySet = new MutableSet();
mySet.add(1).add(2).add(3).show();  
```
