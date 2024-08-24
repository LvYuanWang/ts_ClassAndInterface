type Bar = {
  a: number;
  b: number;
}

type Foo = {
  // bar: () => Bar;
  foo: () => number;
  // 指定 this 的类型, 当调用 foo 方法时, this 的类型为 { a: number, b: number }
} & ThisType<Bar>

const foo: Foo = {
  // bar: () => ({ a: 1, b: 2 }),
  foo() {
    return this.a + this.b;
  }
}


type ObjectDescriptor<D, M> = {
  data?: D;
  methods?: M & ThisType<D & M>; // 方法中 'this' 的类型是 D & M
};

function makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M {
  let data: object = desc.data || {};
  let methods: object = desc.methods || {};
  return { ...data, ...methods } as D & M;
}

let obj = makeObject({
  data: {
    x: 0,
    y: 0,
    getPoint() {
      // this 能找到自身的x和y, 但是不能找到 methods 里面的方法
      console.log(this.x, this.y);
    }
  },
  methods: {
    moveBy(dx: number, dy: number) {
      this.x += dx; // 强类型的 this
      this.y += dy; // 强类型的 this
    },
    moveTo() {
      console.log(this.x);
    }
  },
});


// 类型体操: 可串联构造器
type Chainable<T = {}> = {
  option<K extends string, V>(key: Exclude<K, keyof T>, value: V): Chainable<Omit<T, K> & { [key in K]: V }>
  get(): T
}


declare const a: Chainable

const result1 = a
  .option('foo', 123)
  .option('bar', { value: 'Hello World' })
  .option('name', 'type-challenges')
  .get()

const result2 = a
  .option('name', 'another name')
  // @ts-expect-error
  .option('name', 'last name')
  .get()

const result3 = a
  .option('name', 'another name')
  // @ts-expect-error
  .option('name', 123)
  .get()


// 类型体操: Simple Vue
declare function SimpleVue<D, C, M>(options: {
  data: (this: never) => D,
  computed: C & ThisType<D>,
  methods: M & ThisType<D & getComputed<C> & M>
}): any

type getComputed<T> = {
  [key in keyof T]: T[key] extends (...args: any) => infer R ? R : never;
}


SimpleVue({
  data() {
    // @ts-expect-error
    this.firstName
    // @ts-expect-error
    this.getRandom()
    // @ts-expect-error
    this.data()

    return {
      firstName: 'Type',
      lastName: 'Challenges',
      amount: 10,
    }
  },
  computed: {
    fullName() {
      return `${this.firstName} ${this.lastName}`
    },
  },
  methods: {
    getRandom() {
      return Math.random()
    },
    hi() {
      alert(this.amount)
      alert(this.fullName.toLowerCase())
      alert(this.getRandom())
    },
  }
})