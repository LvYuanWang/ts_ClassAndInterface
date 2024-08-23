// 关键字: extends(继承) super(父类的构造函数) override(重写)

// 继承是具有单根性的，也就是说一个子类只能继承一个父类
class Father {
  constructor(public name: string) { }

  info() {
    console.log("Father Info");
  }
}

class Child extends Father {
  constructor(public name: string, public age: number) {
    super(name);
  }

  // 重写父类的 info 方法, override 关键字可以让编译器检查是否真的重写了父类的方法, 如果父类中没有 info 方法, 则会报错
  override info(): string {
    console.log("Child Info");
    super.info(); // 调用父类的 info 方法
    return "Child Info";
  }
}

const f = new Father('father');
f.info();

const c = new Child('child', 20);
c.info();