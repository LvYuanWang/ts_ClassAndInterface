## 类的类型理解升级

在typescript中的类有两个点必须要理解

**1、在typescript中，类是结构化类型**

**2、在typescript中，类即声明值也声明类型，而且类的类型有两种：实例化对象类型与类构造函数类型**

### 类是结构化类型

与typescript中的其他类型一样，typescript根据结构比较类，与类的名称无关。

**类与其他类型是否兼容，要看结构**

如果一个常规对象定义了同样的属性和方法，那么也与类兼容

```typescript
class User {
  constructor(public id: number, public name: string) { }
  show(addr: string) { 
    console.log(addr)
  }
}
class Person {
  constructor(public id: number, public name: string) { }
  show(addr: string) { 
    console.log(this.id + "---" + this.name + "---" + addr)
  }
}

function desc(user: User) { 
  user.show("成都")
}

const u = new User(1, 'ruby');
const p = new Person(2, 'jack');

const a = {
  id: 1,
  name: 'ruby',
  show(addr: string): void {
    console.log("hello " + addr)
  },
}

desc(u);
desc(p);
desc(a);
```

> 不过稍微要注意的是，如果类中有private或者protected修饰的字段，情况就不一样了，typescript会触发检查

### 类即是值也是类型

```typescript
class MyMap { 
  state: Record<string, string> = {}

  get(key: string): string | undefined {
    return this.state[key]
  }
  set(key: string, value: string): void {
    this.state[key] = value
  }
  values(): string[] {
    return Object.values(this.state)
  }
  keys(): string[] {
    return Object.keys(this.state)
  }
  static of(...entries: [string, string][]): MyMap { 
    const map = new MyMap();
    entries.forEach(entry => map.set(entry[0], entry[1]))
    return map;
  }
}

const m1 = new MyMap();
m1.set("id","1")
m1.set("name", "jack")
console.log(m1.get("name"));
console.log(m1.values());

const m2 = MyMap.of(["name", "rose"], ["sex", "女"]);
console.log(m2.keys());
```

注意这句代码：

```typescript
const m1:MyMap = new MyMap();
```

按照上面的写法`m1:MyMap`中的`MyMap`很明显是类型，`new MyMap()`既然已经在操作了，那明显应该是个值。

但是，如果仅仅是这样的话，中间缺失了一环

上面的代码中，**m1指MyMap类的一个实例。这个是实例化类型**。我们可以通过`m1.xxx`调用对应的属性和方法

而`new MyMap()`这里既然表示是个值，那么他就应该有值所对应的类型，而且，对于静态方法和静态属性，我们不是还可以通过`MyMap.xxx`去调用吗？

所以，还有一个类型，表示的是`MyMap()`这个**构造函数的类型**

如果你觉得这么描述你不太清楚，我们换一种描述方式：

如果我现在有两个方法，其中一个方法需要的是对象，一个方法是类本身，那这个应该怎么限定？

```typescript
class User{
  constructor(public id: number, public name: string) { }
  show() {
    console.log(this.id, this.name);
  }
}

function method1(target:User) { 
  console.log(target.id);
  console.log(target.name);
  target.show();
}

function method2(target: new (...args: [number, string]) => User) {
  const t = new target(1, "jack");
}

method1(new User(1, "jack"));
method2(User);
```

**构造函数类型的表示:**

```typescript
new (...args:any[]) => any;
```

但是，我们怎么**表示MyMap类自身的构造函数类型**呢？**可以使用`typeof`关键字**

```typescript
type MyMapConstructorType = typeof MyMap;
```

甚至可以通过typescript给我们预留的工具，通过构造器类型再得到实例化类型：

```typescript
type MyMapInstanceType = InstanceType<MyMapConstructorType>;
```



当然，我们并看不见这个类型中具体有哪些，我们可以模仿着ES关于类的处理，来模拟一下，比如String，Map这些类，大家可以看一下`lib.es5.d.ts`中的源代码

**实例化类型的MyMap类型**

```typescript
interface MyMap {
  state: Record<string, string>
  get(key: string): string | undefined
  set(key: string, value: string): void
  values(): string[]
  keys(): string[]
}
```

**构造方法类型`typeof MyMap`**

```typescript
interface MyMapConstructor {
  new(): MyMap
  of(...entries: [string, string][]): MyMap
  readonly prototype:MyMap
}
```

所以，对于构造函数类型，我们反过来推导一样成立：

```typescript
var m: MyMapConstructor;
type M1 = typeof m;
type M2 = InstanceType<M1>;
```

如果你觉得MyMap复杂了一些，我们简化一下：

```typescript
class Person {
	constructor(public name: string) {}
}
type PersonInstance = InstanceType<typeof Person>
const person: PersonInstance = new Person('jack')

interface User {
	new (name: string): User
}
type UserInstance = InstanceType<User> // User
```

其实这就对应着我们在vue的代码中，为[模板标注类型](https://cn.vuejs.org/guide/typescript/composition-api.html#typing-component-template-refs)，可以看到有这样的写法：

```typescript
<script>
import {ref} from "vue"
import MyComp from "./components/MyComp.vue";

type MyCompConstructor = typeof MyComp;
type MyCompInstance = InstanceType<MyCompConstructor>;
const myComp = ref<MyCompInstance | null>(null)
// 简写
// const myComp = ref<InstanceType<typeof MyComp> | null>(null)

const openModal = () => {
  myComp.value?.open();
}
</script>

<template>
  <MyComp ref="myComp"/>
</template>  
```

`MyComp`实际得到的是vue的配置对象，其实就相当于`MyComp.vue.vue`文件中，我们所写在`script`中的内容，包括data，methods，生命周期函数等等。

通过`typeof MyComp`其实得到了vue组件的构造函数类型，然后再通过`InstanceType<MyCompConstructor>`得到真正的vue实例对象类型，有了这样的类型之后，我们才能在声明的变量中访问到`MyComp`暴露出来的方法