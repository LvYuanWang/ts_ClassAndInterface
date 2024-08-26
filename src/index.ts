type ParamsType = {
  id: string
}

interface ParamsInterface {
  id: string
}

let t: ParamsType = { id: '1' };
type T = typeof t;  // { id: string }
let i: ParamsInterface = { id: '1' };
type I = typeof i;  // ParamsInterface  因为Interface有声明合并的特性，所以这里是ParamsInterface

// interface ParamsInterface {
//   name: string
// }


type MyRecord = {
  [key: string]: string
  // age: number  // error
}

// const record: MyRecord = {
//   name: 'Joker',
//   type: 'person',
//   sex: '男',
//   age: 20
// }


interface MyInterface {
  name: string
}

type MyType = {
  name: string
}

const example1: MyInterface = { name: 'example1' };
const example2: MyType = { name: 'example2' };

let record: MyRecord = {};
// record = example1;  // error: 因为interface有声明合并的特性, TS不确定你后面会不会再加属性, 所以不允许赋值
record = example2;
// interface MyInterface {
//   age: number
// }

function useParams<ParamsOrKey extends string | Record<string, string | undefined>>() { }

useParams<MyType>();
// useParams<MyInterface>();