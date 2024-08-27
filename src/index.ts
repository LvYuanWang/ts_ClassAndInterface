// 混入
// 构造函数类型
type ClassConstructor = new (...args: any[]) => any;

// 使用泛型
type Constructor<T = {}> = new (...args: any[]) => T;

// 基础类
class MyClass {
  constructor(public name: string) { }
}

// 通过闭包实现混入
function TimesTamped<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    timestamp = Date.now();
  }
}

function Printable<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    print() {
      console.log(this);
    }
  }
}

const TimeAndPrintMyClass = Printable(TimesTamped(MyClass));
const example = new TimeAndPrintMyClass('example');
console.log(example.timestamp);
console.log(example.name);
example.print();