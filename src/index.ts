// 抽象类
abstract class Foo {
  abstract name: string;
  abstract get nameGetter(): string;
  abstract method(name: string): string;
  show() {
    console.log('show');
  }
  static info(): void {
    console.log('info');
  }
}

// 接口
// 接口的面向对象特征:
// 1. 接口是比抽象类还要再抽象的概念, 在接口中就只能有抽象的属性和方法, 相当于就只能声明结构, 不能有具体的实现
// 2. 接口不能使用访问修饰符
// 3. 类和接口的实现使用 implements 关键字
// 4. 接口可以多实现, 但只能单继承
// 5. 接口和接口之间使用 extends 继承
interface Bar {
  name: string;
  get nameGetter(): string;
  method(name: string): string;
}

interface Qux {
  show(add: string): string;
}

// 类实现接口
// 多接口实现
abstract class Baz implements Bar, Qux {
  name = 'Baz';
  get nameGetter() {
    return this.name;
  }
  method(name: string) {
    return name;
  }
  show(add: string) {
    return add;
  }
}

// 接口继承
// 在TS中, 接口具有声明合并的特性, 可以多次声明同一个接口, TS会将这些接口合并为一个接口, 但是如果有同名属性, 则属性的类型必顫一致
// 然而类型别名不具有声明合并的特性
interface User extends Bar, Qux {
  id: number;
  age: number;
}
interface User {
  tel: string;
}

// 在TS中, 接口和类型别名有混用的效果
type Action = {
  type: string;
  get(): string;
  set(v: string): void;
}

class UserClass implements User, Action {
  id = 1;
  name = 'Jack';
  age = 18;
  tel = '123456789';
  get nameGetter() {
    return this.name;
  };
  method(name: string) {
    return name;
  }
  show(add: string) {
    return add;
  }
  type = 'User';
  get() {
    return this.type;
  }
  set(v: string) {
    this.type = v;
  }
}

type UA = User & Action & { gender: "男" | "女" };

class AdminUser implements UA {
  id = 1;
  name = 'Jack';
  age = 18;
  gender: "男" | "女" = "男";
  tel = '123456789';
  get nameGetter() {
    return this.name;
  };
  method(name: string) {
    return name;
  }
  show(add: string) {
    return add;
  }
  type = 'User';
  get() {
    return this.type;
  }
  set(v: string) {
    this.type = v;
  }
}

const p: UA = {
  id: 1,
  name: 'Jack',
  age: 18,
  gender: '男',
  type: 'User',
  tel: '123456789',
  get() {
    return this.type;
  },
  set(v: string) {
    this.type = v;
  },
  get nameGetter() {
    return this.name;
  },
  method(name: string) {
    return name;
  },
  show(add: string) {
    return add;
  }
}

const user = new AdminUser();
console.log(user.nameGetter);