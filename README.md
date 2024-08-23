## 继承

有面向对象，那么肯定就有继承，和JavaScript一样，使用`extends`关键字来实现继承，当然类的继承还是具有单根性的特点

```typescript
class Father { 
  constructor(public name: string) { }
  info(): void { 
    console.log('Father Info');
  }
}

class Child extends Father { 
  constructor(public name: string, public age: number) { 
    super(name);
  }
  override info(): string {
    console.log("Child Info");
    super.info();
    return "";
  }
}
```

父类和子类的概念相信大家已经不在陌生了，上面主要用到了几个关键字`extends`，`super`和`override`

**`super`：**在构造方法中调用使用`super()`,而且这种写法只能在构造方法中使用，如果子类有构造方法，那么必须调用`super()`,无论构造方法有没有参数，这样才可以把父子关系连接起来。不用担心你会忘记，你不写的话会报错！

在一般方法中调用使用`super.xxx()`的形式，表示调用的是父类的方法，特别是在子类重写父类的方法中（子类方法和父类方法同名的情况，其实就是覆盖父类的同名方法），这样可以很明显的区分调用的是父类的方法还是子类的方法。**super只能调用父类的方法，不能访问父类的属性**

**`override`：** Typescript4.x新增的关键字，这是一个提醒关键字。使用`override`修饰的方法就表明该方法就是一个重写的覆盖父类的方法。如果子类中的方法没有在父类中出现过，那么不能使用`override`