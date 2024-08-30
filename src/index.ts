class User {
  constructor(public id: number, public name: string) { }
}
// 获取构造函数类型
// type ConstructorType = InstanceType<typeof User>; // User

// 获取构造函数参数类型
type ConstructorParamType = ConstructorParameters<typeof User>; // [id: number, name: string]

type MyConstructorParameters<T extends abstract new (...args: any[]) => any> = T extends abstract new (...args: infer R) => any ? R : never;
type GetConstructorParamType = MyConstructorParameters<typeof User>; // [id: number, name: string]

type T0 = MyConstructorParameters<ErrorConstructor>;
type T1 = MyConstructorParameters<FunctionConstructor>;
type T2 = MyConstructorParameters<RegExpConstructor>;


// 扩展
class Book {
  title: string;
  content: string;
  constructor(title: string, content: string) {
    this.title = title;
    this.content = content;
  }
}

class CreateInstance<T extends new (...args: any[]) => any> {
  private ClassConstructor: T;
  constructor(classConstructor: T) {
    this.ClassConstructor = classConstructor;
  }

  getInstance(...args: ConstructorParameters<T>): InstanceType<T> {
    return new this.ClassConstructor(...args);
  }
}

const instanceCreator = new CreateInstance(Book);
const book = instanceCreator.getInstance("Typescript类型全解", "ts类型说明...");

console.log(book);

// 在TS中, 能不能写构造函数呢?
// 函数是具有二义性的(既可以作为函数, 也可以作为构造函数) ES6才有了箭头函数和类的区分
/*
function Person(id: number, name: string, age: number) {
  this.id = id;
  this.name = name;
  this.age = age;
}

interface Person {
  id: number,
  name: string,
  age: number
}

interface PersonConstructor {
  new(id: number, name: string, age: number): Person;
  readonly prototype: Person;
}
// 通过构造函数类型获取实例的类型
type PersonInstance = InstanceType<PersonConstructor>;  // Person

const person: PersonInstance = new Person(1, "Tom", 18);
*/


// 模拟一个使用的异步场景
// 比如有时候可能第三方库仅仅给我们提供了接口方法(返回Promise), 但是没有提供具体的类型, 但是我们又想使用这个类型
interface UserInfo {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
}

async function fetchUserInfo(): Promise<UserInfo> {
  const data = await fetch('https://api.example.com/user').then(res => {
    return res.json();
  });
  return data;
}
// 上面的是第三方库的, 我们能得到的就是fetchUserInfo接口
// 想要获得fetchUserInfo的返回类型, 它返回的是一个Promise, Promise返回的是UserInfo类型
type UserInfoFetcher = Awaited<ReturnType<typeof fetchUserInfo>>;

const userInfo: UserInfoFetcher = {
  id: 1,
  firstName: "Tom",
  lastName: "Jerry",
  age: 18
};

type A = Awaited<Promise<string>>;  // string
type B = Awaited<Promise<Promise<number>>>;  // number
type C = Awaited<Promise<number> | boolean>;  // number | boolean
type D = Awaited<number>; // number
type E = Awaited<null>; // null

type MyAwaited<T extends PromiseLike<any>> = Awaited<T>;

// type F = MyAwaited<number>; // 类型“number”不满足约束“PromiseLike<any>”
// type G = MyAwaited<null>; // 类型“null”不满足约束“PromiseLike<any>”
type H = MyAwaited<Promise<number>>;
// type I = MyAwaited<{ id: 1 }>;