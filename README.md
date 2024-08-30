## 构造函数相关类型工具

[`ConstructorParameters<Type>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#constructorparameterstype)从构造函数类型中获取构造函数参数的元组类型

```typescript
class User{
  constructor(public id:number, public name: string){}
}

type ConstructorParamsType1 = ConstructorParameters<typeof User>; // [id: number, name: string]
```

对于`ConstructorParameters`的实现其实和之前的[`ReturnType`](https://www.typescriptlang.org/docs/handbook/utility-types.html#returntypetype)十分类似，只不过现在我们需要构造函数类型去进行处理

```typescript
type MyConstructorParams<T extends abstract new (...args: any[]) => any> = T extends abstract new (...args: infer R) => any ? R : never;

type ConstructorParamsType2 = MyConstructorParams<typeof User>;
```

我们可以扩展一个场景实现一下效果：

```typescript
class Book {
  title: string;
  content?: string;
  constructor(title: string) {
    this.title = title;
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
const book = instanceCreator.getInstance("Typescript类型全解");
```

另外和构造函数类型直接相关的就是[`InstanceType<Type>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#instancetypetype)类型工具了，这个我们之前就用过了，可以通过构造函数类型得到实例对象类型。

```typescript
class User{
  constructor(public id:number, public name: string){}
}

type U = InstanceType<typeof User>;
```

要去实现这个类型工具也非常简单：

```typescript
type MyInstanceType<T extends abstract new (...args: any[]) => any> = T extends abstract new (...args: any[]) => infer R ? R : never;

type InstanceUser = MyInstanceType<typeof User>;
```

再强调一句：**typeof User，这里的User代表的是值**

当然，可能会有些同学会思考，那么在TS中，可以直接写构造函数吗？

有这个思考，说明你对类型系统的认知还不够明确！

函数是具有二义性的，因此ES6中才有了箭头函数和类的区分，那我们TS中，如果你要使用类，别再考虑什么构造函数的写法，这是不正确的。要使用类，我们就应该使用class。要使用函数，那么这个函数就是一个普通函数。

不过这个思考非常有趣，我们可以接着这个错误思考，再来认知一下类的类型

```typescript
function Person(id: number, name: string, age: number) {
  this.id = id;
  this.name = name;
  this.age = age;
}
```

首先你这么写，在TS中就会直接报错，至少我们先把`this`的严格检查去掉`noImplicitThis`设置为`false`

但是这个我们在js中认知的构造函数，还不能直接`new`

```typescript
const person = new Person(1, 'John Doe', 30); // error
```

会告知你：**其目标缺少构造签名的 "new" 表达式隐式具有 "any" 类型**

因为不知道new的到底是什么，我们可以使用简单的断言

```typescript
const person = new (Person as any)(1, 'John Doe', 30);
```

来屏蔽这个错误，也能去掉严格检查的`noImplicitAny`设置为`false`

但是就算如此，我们得到的person，也仅仅是一个`any`类型的值，所以是没有任何TS提示的。

而且最关键的，如果我们使用InstanceType，试图通过这个工具帮我们找到实例对象类型也是徒劳的。

```typescript
type PersonInstance = InstanceType<typeof Person>; // error
```

会告知你：**类型“(id: number, name: string, age: number) => void”提供的内容与签名“new (...args: any): any”不匹配**

**因为typeof Person获取的仅仅就只是一个函数类型，而不会是一个构造函数类型**

我们只能人为的构造类型去填补这些缺陷：

```typescript
function Person(id: number, name: string, age: number) {
  this.id = id;
  this.name = name;
  this.age = age;
}

interface Person {
  id: number;
  name: string;
  age: number;
}
type PersonConstructor = new (id: number, name: string, age: number) => Person;
//当然也能写成接口形式：
// interface PersonConstructor {
//   new(id: number, name: string, age: number): Person;
//   readonly prototype:Person
// }

type PersonInstance = InstanceType<PersonConstructor>;

const person:PersonInstance = new (Person as any)(1, 'John Doe', 30);
```

除了[`ConstructorParameters<Type>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#constructorparameterstype)和[`InstanceType<Type>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#instancetypetype) 这两个类型工具之外，再给大家介绍一个常用的类型工具[`Awaited<Type>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#awaitedtype)

[`Awaited<Type>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#awaitedtype)可以用来获取`Promise`中的类型(如await、then方法返回的被Promise包裹的数据的类型)。

其中Promise是我们常用的异步类，本身就有`Promise`类型和`PromiseConstructor`类型

```typescript
type T = Awaited<Promise<Person>>; // Person
```

`Awaited`在我们处理异步场景的时候非常有用。

比如有时候我们从第三方库就仅仅能获取接口，并且这个接口可能还返回的是一个Promise类型，那么我们就可以通过`Awaited`帮我们获取具体函数返回的`Promise`类型的泛型，也就是真正的数据类型：

```typescript
interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
}
async function fetchUser(): Promise<User> {
  const data = await fetch(
    "https://mock.mengxuegu.com/mock/65b1f3d1c4cd67421b34cd0c/mock_ts/user"
  ).then((res) => {
    return res.json();
  });
  return data;
}
```

比如上面的`fetchUser()`是一个第三方库的函数，如果我们希望获取真正返回的数据`User`的类型，就可以使用`Awaited`

```typescript
type UserFetch = Awaited<ReturnType<typeof fetchUser>>

const user: UserFetch = {
  id: 1,
  firstName: "yuan",
  lastName: "jin",
  age: 18,
}
```

```typescript
type Awaited<T> = T extends null | undefined ? T : // 当T是null | undefined时就直接取值
    T extends object & { then(onfulfilled: infer F, ...args: infer _): any; } ? // `await` 仅使用可调用的 `then` 来解包对象类型。 非对象类型不会被解包
        F extends ((value: infer V, ...args: infer _) => any) ? // 如果“then”的参数是可调用的，则提取第一个参数
            Awaited<V> : // 递归调用Awaited，将解开的类型V传入
        never : // `then` 的参数不可调用获取never
    T; // 不是对象类型或者没有then的时候直接获取T类型
```

也就是说，Awaited可以深层嵌套，如果没有Promise的话，就直接返回类型：

```typescript
type A = Awaited<Promise<string>>; // string
  
type B = Awaited<Promise<Promise<number>>>; // number
    
type C = Awaited<boolean | Promise<number>>; // number | boolean

type D = Awaited<number>; // number 

type E = Awaited<null>; // null
```

那如果，我希望传入的如果不是`Promise`类型就直接报错呢？我们完全可以将`Awaited`再封装一下，使用`PromiseLike`

```typescript
type MyAwaited<T extends PromiseLike<any>> = Awaited<T>;

//......

type F = MyAwaited<number>; // error 类型“number”不满足约束“PromiseLike<any>”。 

type G = MyAwaited<null>; // error 类型“null”不满足约束“PromiseLike<any>”。
```
