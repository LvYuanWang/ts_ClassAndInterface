## 访问修饰符

类的主要结构，无非就是**属性、构造函数、方法、存取器、访问修饰符、装饰器**，在typescript中，我们在需要的部分加上类型标注就行了

**属性的类型标识类似于变量，而构造函数、方法、存取器的类型标注其实就是函数**：

```typescript
// TS中类的主要结构：属性、构造函数、方法、存取器、访问修饰符、装饰器
// 属性类似于变量，加上相关类型标注，当然也能通过值的类型进行类型推导
// 构造函数、方法、存取器类似于函数，加上参数的类型与返回类型

// 访问修饰符：可以修饰属性和方法
// public（默认）: 可以在类、类的子类中，以及类和子类的实例对象访问
// protected: 仅能在类和子类中访问
// private: 仅能在类的内部被访问到
// # ES2022新特性，私有属性和方法
/*
class Animal{
  public name: string;
  protected color: string;
  private _age: number;
  #type: string;
  constructor(name: string, color:string, _age: number, type:string) { 
    this.name = name;
    this.color = color;
    this._age = _age;
    this.#type = type;
  }

  show() { 
    console.log(this.name, this.color, this._age)
  }
}
*/
class Animal{
  
  #type: string;
  constructor(
    public name: string,
    protected color: string,
    private _age: number,
    type: string) { 
    this.#type = type;
  }

  show() { 
    console.log(this.name, this.color, this._age)
  }
}

class Cat extends Animal{
  info() { 
    // 父类中public修饰的属性和方法在子类中都能访问
    console.log(this.name)
    this.show();
    // 父类中protected修饰的属性和方法在子类中都能访问
    console.log(this.name)
    this.show();

    // 父类中private修饰的属性和方法在子类中 不能访问
    // console.log(this._age);
  }
}


const a = new Animal("小白", "白色", 3, 'Dog');
console.log(a.name);
a.show();
// console.log(a.color);
// console.log(a._age);

const c = new Cat("小猫", "花色", 2, 'Cat');
console.log(c.name);
c.info();
```

> **注意1：**`"strict": true`会默认开启`"strictPropertyInitialization":true`,也就是属性必须初始化，如果希望关闭这个特性，单独设置`"strictPropertyInitialization":false`即可

- `public`：在**类、类的实例、子类**中都能被访问。
- `protected`：仅能在**类与子类中**被访问。
- `private`：仅能在**类的内部**被访问。
- `#`：仅能在**类的内部**被访问。ES2022新特性

需要注意的有两个地方：

1、`private`实际是typescript的访问修饰符，因此在转换为js代码之后，实际上是会消失的

2、私有字段`#`实际是ES2022中被正式采纳的标准

3、如果不添加任何访问修饰符，**默认`public`**，我们一般不会为构造函数添加修饰符，保持默认即可。

上面构造函数的写法还是略显麻烦，我们其实可以简写：

```typescript
class Animal { 
  #type: 'cat' | 'dog';
  constructor(public name: string, public color: string, private _age: number, type: 'cat' | 'dog') {
    this.#type = type;
  }
  ......
}
```

> 用 `#` 标记的私有字段，目前还不能以类似于 `public` 和 `private` 修饰符的构造函数参数简写形式声明