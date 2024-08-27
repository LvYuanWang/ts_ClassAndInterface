// 1.在ts中, 类是结构化类型, 但是需要注意访问修饰符会触发ts类型检查
// 2.在ts中, 类既声明值也声明类型, 而且类的类型有两种: 实例化对象类型, 类构造函数类型
/*
class User {
  constructor(public id: number, public name: string) { }
  show(addr: string) {
    console.log(addr);
  }
}

class Person {
  constructor(public id: number, public name: string, private tel: string) { }
  show(addr: string) {
    console.log(`${this.id}---${this.name}---${addr}`);
  }
}

function desc(user: User) {
  user.show('Beijing');
}

const u = new User(1, 'Tom');
const p = new Person(2, 'Jerry', '123333864');

const a = {
  id: 3,
  name: 'ruby',
  tel: '123456789',
  show(addr: string) {
    console.log('hello' + addr);
  }
}

desc(u);
desc(p);
desc(a);
// desc({ id: 4, name: 'lucy', tel: '134444444',show(addr: string) { console.log('hello' + addr)}})  // 报错, 对象字面量只能指定已知属性, 并且'tel'不在类型'User'中
*/

class MyMap {
  state: Record<string, string> = {};

  set(key: string, value: string) {
    this.state[key] = value;
  }

  get(key: string) {
    return this.state[key];
  }

  keys() {
    return Object.keys(this.state);
  }

  values() {
    return Object.values(this.state);
  }

  static of(...entries: [string, string][]) {
    const map = new MyMap();
    entries.forEach(entry => map.set(entry[0], entry[1]));
    return map;
  }
}

const m1 = new MyMap();
m1.set('id', '1');
m1.set('name', 'Joker');
console.log(m1.get('name'));
console.log(m1.values());

const m2 = MyMap.of(['id', '2'], ['name', 'Tom'], ['gender', '男']);
console.log(m2.keys());


class User {
  constructor(public id: number, public name: string) { }
  show(addr: string) {
    console.log(addr);
  }
}

function method1(target: User) {
  console.log(target.id);
  console.log(target.name);
  target.show("BeiJing");
}

// method2需要一个类, 在函数中对类进行处理
// 类的构造函数类型 new (...args: any[]) => any
// 这样做的目的是为了让 method2 函数能够接受任何符合这个构造函数签名的类，而不仅仅是 User 类
function method2(target: new (...args: [number, string]) => User) {
  const t = new target(1, "Joker");
  console.log(t.id);
  console.log(t.name);
  t.show("ShangHai");
}

// 构造函数类型
// type MyMapConstructorType = new (...args: any[]) => MyMap;
type MyMapConstructorType = typeof MyMap;
// 通过构造函数类型获取实例化类型
// type MyMapInstanceType = InstanceType<new (...args: any[]) => MyMap>;
type MyMapInstanceType = InstanceType<MyMapConstructorType>;

const m3: MyMapInstanceType = new MyMap();
// const m = new Map()


// MyMap 的实例化类型
interface MyMap {
  state: Record<string, string>;
  set(key: string, value: string): void;
  get(key: string): string;
  keys(): string[];
  values(): string[];
}

// MyMap 的构造函数类型
interface MyMapConstructor {
  // 任何实现 MyMapConstructor 接口的类都必须提供一个无参数的构造函数，该构造函数返回一个 MyMap 类型的实例
  new(): MyMap; // 构造函数签名,当使用new关键字调用这个构造函数时,返回MyMap类型的实例
  of(...args: [string, string][]): MyMap;
  readonly prototype: MyMap;
}

let m: MyMapConstructor;
type M1 = typeof m;
type M2 = InstanceType<M1>;
type M3 = InstanceType<MyMapConstructor>;


class Person {
  constructor(public name: string) { }
}

type PersonInstance = InstanceType<typeof Person>;  // Person: 获取Person的实例化类型
const person: PersonInstance = new Person('Joker');

interface UserConstructor {
  new(name: string): User;
}

type UserInstance = InstanceType<UserConstructor>;