## 接口

面向对象中，另外一个非常重要的概念当然就是接口，按照面向对象的说法来说，接口是比抽象类还要抽象的概念，在接口中就只能有抽象的方法和属性，相当于就只能声明结构，不能有具体的实现。

比如上面的代码，我们改为interface实现：

```typescript
interface Foo {
  name: string;
  get nameGetter(): string;
  method(name: string): string
}

interface Bar {
  show(addr: string): string
}

class Baz implements Foo, Bar {
  name = 'baz';
  get nameGetter(): string {
    return this.name;
  }
  method(name: string): string {
    return name;
  }
  show(addr: string): string {
    return addr;
  }
}
```

在面向对象的语法特性中，接口主要是几点点：

1、类和接口的实现使用`implements`关键字

2、可以多实现

3、在接口中不能使用访问修饰符

4、接口和接口之间使用extends继承，而且可以多继承

其实通过编译之后，你会发现，抽象类至少还有一个空的类在那里，而`interface`的声明在编译之后的js文件夹中就直接删掉了

在我们不考虑面向对象这些特性的时候，纯前端程序员在使用接口的时候，是直接和类型别名`type`进行类比的。虽然继承，实现等也是表示类型关系。但是对于初学者来说，当我们需要一种类型的时候，用`interface`或者类型别名`type`来表示一种类型结构，可以减少很多心智负担。

```typescript
interface User{
  readonly id: number
  name: string
  show: (addr: string) => void
}
// 对比类型别名的声明
type Person = {
  readonly id: number
  name: string
  show: (addr: string) => void
}

const u: User = {
  id: 1,
  name: 'ruby',
  show(addr: string): void {
    console.log(addr)
  }
}
u.id = 2; // error
```



### 声明合并

interface还有一种很重要的特性就是声明合并，就是typescript自动的把多个同名的`interface`接口声明组合在一起，当然这个特性不单单是接口有，枚举和namespace命名空间也有

```typescript
interface User{
  readonly id: number
  name: string
  show: (addr: string) => void
}
interface User { 
  age: number
}

const u: User = {
  id: 1,
  name: 'ruby',
  show(addr: string): void {
    console.log(addr)
  },
  age: 13
}
```

> 注意：虽然可以合并，但是并不能有冲突，如果**出现键同名但是值不同类型的情况会报错**

```typescript
interface User{
  readonly id: number
  name: string
  show: (addr: string) => void
  age: string
}
interface User { 
  age: number // error
}
```

当然，接口和接口，接口和类型别名之间也能有继承关系，使用`extends`关键字。接口要继承类型别名，类型别名代码的类型应该是一个结构类型

```typescript
interface User { 
  id: number
  name: string
}

interface Person extends User{
  age: number
}

type Action = {
  type: string
  get(): string
  set(v: string): void
}

interface Person extends Action { 
  sex: "男" | "女"
}

const p: Person = {
  id: 1,
  age: 13,
  name: 'ruby',
  sex: "男",
  type: 'person',
  get(): string {
    return 'hello'
  },
  set(v: string): void {
    console.log(v)
  }
}
```

其实反过来，我们用type来实现也行：

```typescript
type PA = Person & Action & { sex: "男" | "女" }

const p: PA = {
  id: 1,
  age: 13,
  name: 'ruby',
  sex: "男",
  type: 'person',
  get(): string {
    return 'hello'
  },
  set(v: string): void {
    console.log(v)
  }
}
```
