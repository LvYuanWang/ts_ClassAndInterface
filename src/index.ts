// 抽象类: 不能被实例化, 只能被继承, 目的是为了实现多态
// 程序架构设计
// 面向对象的三大特征: 封装 继承 多态
// 前端使用抽象类和接口 主要是使用他们的结构化特性
abstract class Foo {
  // 抽象属性: 只能在抽象类中定义, 不能在普通类中定义
  abstract name: string;
  // 抽象访问器属性
  abstract get nameGetter(): string;
  // 抽象方法: 只能在抽象类中定义, 不能在普通类中定义, 子类必须实现, 除非子类也是抽象类
  abstract method(name: string): string;
  show() {
    console.log('show');
  }
  // 静态函数: 在抽象类中定义, 子类可以继承, 也可以重写
  static info() {
    console.log('static info function');
  }
}

class Baz extends Foo {
  name = 'Baz';
  get nameGetter() {
    return this.name;
  }
  method(name: string) {
    return name;
  }
}

const baz = new Baz();
baz.show();
Baz.info();
Foo.info();


abstract class Person {
  abstract name: string;
  abstract age: number;
  abstract say(): string;
}

// implements 实现接口
class Student implements Person {
  name = 'Tom';
  age = 18;
  say() {
    return `Hello, my name is ${this.name}, I'm ${this.age} years old.`;
  };
  eat() {
    console.log('eat');
  }
}