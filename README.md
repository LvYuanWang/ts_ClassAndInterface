## 混入

### JavaScript中的混入

在JavaScript中实现对象的混入很简单，我们经常在使用，一般我们都通过浅拷贝，简单地将一个对象的属性和方法复制到另一个对象中来完成。最常见的做法是使用 `Object.assign()` 或展开运算符（`...`）来实现

#### 对象的混入

```typescript
const canEat = {
  eat: function () {
    console.log("eating");
  },
};

const canWalk = {
  walk: function () {
    console.log("walking");
  },
};

// const person = Object.assign({}, canEat, canWalk);
const person = { ...canEat, ...canWalk };

person.eat(); // eating
person.walk(); // walking
```

当然这是基于对象的，如果是基于类的，也可以，基本也是两种做法，最简单的，其实就是把上面的person转换为class，然后把对象上的属性加入到class的原型上去

#### 通过原型混入

```typescript
const canEat = {
  eat: function () {
    console.log("eating");
  },
};

const canWalk = {
  walk: function () {
    console.log("walking");
  },
};

// const person = Object.assign({}, canEat, canWalk);
// const person = { ...canEat, ...canWalk };

// person.eat(); // eating
// person.walk(); // walking

class Person {
  constructor(name) {
    this.name = name;
  }
}

// 将方法混入 Person 类的原型
Object.assign(Person.prototype, canEat, canWalk);

const person = new Person("Alice");
person.eat(); // eating
person.walk(); // walking
```

#### 通过闭包高阶函数混入

这种做法其实在以前React使用类组件的时候，高阶组件经常见到

```typescript
function withEating(Class) {
  return class extends Class {
    eat() {
      console.log("eating");
    }
  };
}

function withWalking(Class) {
  return class extends Class {
    walk() {
      console.log("walking");
    }
  };
}

class Person {
  constructor(name) {
    this.name = name;
  }
}

const EatingAndWalkingPerson = withWalking(withEating(Person));

const person = new EatingAndWalkingPerson("Bob");
person.eat(); // eating
person.walk() // walking
```

### Typescript实现混入

如果你理解了javascript混入，typescript的混入没有什么区别。我们通过typescript来实现一下高阶函数的混入。

这里有一个疑问需要解决一下，高阶函数的参数需要的是一个构造函数类型，如何声明一个构造函数类型呢？

要声明一个构造函数类型很简单，如下：

```typescript
type ClassConstructor = new (...args: any[]) => any;
```

其中，最关键的就是`new`这个关键字，表示该签名是一个构造函数，意味着使用这个类型的函数可以通过 `new` 关键字被实例化。

当然我们可以加入泛型：

```typescript
type Constructor<T = {}> = new (...args: any[]) => T;
```

那接下来的事情就简单了：

```typescript
// 类构造器的类型
type Constructor<T = any> = new (...args: any[]) => T;

// 第一个混入，增加了一个时间戳属性
function Timestamped<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    timestamp = Date.now();
  };
}

// 第二个混入，增加了一个打印方法
function Printable<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    print() {
      console.log(this);
    }
  };
}

// 基础类
class MyClass {
  constructor(public name: string) {}
}

// 创建一个混入了Timestamped和Printable的新类
const TimestampedPrintableMyClass = Timestamped(Printable(MyClass));

// 使用
const example = new TimestampedPrintableMyClass("test");
console.log(example.name); // 输出 'test'
console.log(example.timestamp); // 输出创建实例时的时间戳
example.print();
```
