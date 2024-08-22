// TS中类的主要结构: 属性、构造函数(constructor)、方法、存取器(getter,setter)、访问修饰符、装饰器
// 属性类似于变量，加上相关类型标注，当然也能通过值的类型进行类型推导
// 构造函数、方法、存取器类似于函数, 加上参数的类型与返回类型

// 访问修饰符:
//    public（默认）：公共访问修饰符，表示类成员可以在任何地方被访问。如果没有显式地指定访问修饰符，默认为 public。
//    private：私有访问修饰符，表示类成员只能在类内部被访问。私有成员对于外部代码是不可见的，只能在类的内部使用。
//    protected：受保护的访问修饰符，表示类成员可以在类内部和继承类中被访问。受保护成员对于外部代码是不可见的，但可以在派生类中访问
//    # ES2022新特性, 加上后表示私有属性和方法
/*
class Animal {
  name: string;
  protected color: string;
  private _age: number;
  #type: string;  // 这种形式在js中也存在, js的新特性, 表示私有属性
  constructor(name: string, color: string, age: number, type: string) {
    this.name = name;
    this.color = color;
    this._age = age;
    this.#type = type;
  }

  show() {
    console.log(this.name, this.color, this._age, this.#type);
  }
}
*/
// 优化简写写法
class Animal {
  #type: string;  // ES2022新语法: 这种形式在js中也存在, js的新特性, 表示私有属性
  constructor(public name: string, protected color: string, private _age: number, type: string) {
    this.#type = type;
  }

  show() {
    console.log(this.name, this.color, this._age, this.#type);
  }
}

class Cat extends Animal {
  info() {
    // 父类中 public 修饰的属性和方法在子类中都能访问
    console.log(this.name);
    this.show();
    // 父类中 protected 修饰的属性和方法在子类中都能访问
    console.log(this.color);
    this.show();
    // 父类中 private 修饰的属性和方法在子类中不能访问
    // console.log(this._age); // 属性“_age”为私有属性，只能在类“Animal”中访问
    // console.log(this.#type); // 属性 "#type" 在类 "Animal" 外部不可访问，因为它具有专用标识符
  }
}

const a = new Animal("小丑", "white", 3, "Dog");
console.log(a.name);
// console.log(a.color); // 属性 color 受保护, 只能在类 Animal 及其子类中访问

const cat = new Cat("小黑", "咖啡色", 8, "Cat");
console.log(cat.name);
// console.log(cat._age); // 属性“_age”为私有属性，只能在类“Animal”中访问
cat.info();