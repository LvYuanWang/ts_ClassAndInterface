## 有关`this`的类型体操

### [`ThisType<Type>`](https://www.typescriptlang.org/docs/handbook/utility-types.html)

`ThisType<Type>` 可以让`Type`充当上下文类型的标记[`this`](https://www.typescriptlang.org/docs/handbook/functions.html#this)

```typescript
type ObjectDescriptor<D, M> = {
  data?: D;
  methods?: M & ThisType<D & M>; // Type of 'this' in methods is D & M
};
 
function makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M {
  let data: object = desc.data || {};
  let methods: object = desc.methods || {};
  return { ...data, ...methods } as D & M;
}
 
let obj = makeObject({
  data: { x: 0, y: 0 },
  methods: {
    moveBy(dx: number, dy: number) {
      this.x += dx; // Strongly typed this
      this.y += dy; // Strongly typed this
    },
  },
});
 
obj.x = 10;
obj.y = 20;
obj.moveBy(5, 5);
```

如果你觉得这个例子比较复杂，简单一点你可能更容易理解：

```typescript
type Foo = {
  foo: () => number
} & ThisType<{
  a: number,
  b: number
}>

const f: Foo = {
  foo() { 
    return this.a + this.b
  }
}
```

```typescript
type Bar = {
  a: number;
  b: number;
}
type Foo = {
  // bar: () => Bar;
  foo: () => number;
} & ThisType<Bar>

const foo: Foo = {
  // bar: () => ({
  //   a: 10,
  //   b: 20,
  // }),
  foo() { 
    return this.a + this.b
  }
}
```



### [SimpleVue](https://typehero.dev/challenge/simple-vue)

实现类似 Vue 的类型支持的简化版本。

其实就是实现Vue中的` data`，`computed`和`methods`的类型标注

如果你没有写过Vue也无所谓，简单来说，遵循下面的规则：

- `data`是一个简单的函数，它返回一个提供上下文`this`的对象，但是你无法在`data`中获取其他的计算属性或方法。而且在`data`中也不能访问`this`对象

- `computed`是一个对象，将`this`作为上下文的函数的对象，进行一些计算并返回结果。在computed中可以访问`data`中的属性与`computed`自身的函数。并且在调用的时候只能使用属性的调用方式，不能用函数的调用方式

- `methods`是一个对象，其上下文也为`this`。函数中可以访问`data`，`computed`以及其他`methods`中的暴露的字段。 `computed`与`methods`的不同之处在于`methods`在上下文中按原样暴露为函数。

这个题看起来很难，实际上非常简单：

只需要掌握四个关键知识点即可：

1.函数中声明this

2.ThisType工具的使用

3.映射类型重映射

4.infer推断

```typescript
declare function SimpleVue<D,C,M>(options: {
	data:(this:void) => D,
	computed: C & ThisType<D>,
	methods: M & ThisType<D & getComputed<C> & M>
}): any

type getComputed<T> = {
	readonly [P in keyof T] : T[P] extends (...args:any[]) => infer R ? R : never
}
```



### 实现可链接选项

这是TS类型体操中的一个挑战[Chainable options](https://typehero.dev/challenge/chainable-options)

```typescript
declare const config: Chainable;

const result = config
  .option('foo', 123)
  .option('name', 'type-challenges')
  .option('bar', { value: 'Hello World' })
  .get();

// 期望 result 的类型是：
interface Result {
  foo: number;
  name: string;
  bar: {
    value: string;
  };
}
```

简单来说，就是每次option链式调用的函数会将属性添加到对象中，而且属性名不能重复，如果重复了就取后面那一次的属性和值的类型

一开始我们这样思考，option每次返回的类型肯定是之前的T类型与option调用之后的对象字面量类型的交叉

```typescript
type Chainable<T={}> = {
  option<K extends string, V>(key: K, value: V): Chainable<T & {[P in K]:V}>
  get(): T
}
```

然后如果出现同名的key，将其排除

```typescript
type Chainable<T={}> = {
  option<K extends string, V>(key: Exclude<K, keyof T>, value: V): Chainable<T & {[P in K]:V}>
  get(): T
}
```

最后，每次返回的T，应该忽略当然的K，当然如果没有同名的就没有任何影响，如果出现同名的才会触发

```typescript
type Chainable<T={}> = {
  option<K extends string, V>(key: Exclude<K, keyof T>, value: V): Chainable<Omit<T,K> & {[P in K]:V}>
  get(): T
}
```

