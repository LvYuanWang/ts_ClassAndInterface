## 存取器(访问器)属性

访问器属性的写法几乎和JS一样，大家只需要注意一些小细节就行了

```typescript
class Animal {
  public name: string;
  protected color: string;
  private _age: number;
  #type: string;
  constructor(name: string, color: string, _age: number, type: string) {
    this.name = name;
    this.color = color;
    this._age = _age;
    this.#type = type;
  }

  get age() {
    return this._age;
  }

  set age(value: number) {
    if (value < 0 || value > 150) throw new Error("年龄不符合规范...");
    this._age = value;
  }

  get type(): string {
    return this.#type;
  }

  set type(value: "Cat" | "Dog") {
    this.#type = value;
  }

  show() {
    console.log(this.name, this.color, this._age);
  }
}

/* class Animal{
  
  #type: string;
  constructor(
    public name: string,
    protected color: string,
    private _age: number,
    type: string) { 
    this.#type = type;
  }

  show() { 
    console.log(this.name, this.color, this._age)
  }
} */

class Cat extends Animal {
  info() {
    // 父类中public修饰的属性和方法在子类中都能访问
    console.log(this.name);
    this.show();
    // 父类中protected修饰的属性和方法在子类中都能访问
    console.log(this.name);
    this.show();

    // 父类中private修饰的属性和方法在子类中 不能访问
    // console.log(this._age);
  }
}

const a = new Animal("小白", "白色", 3, "Dog");
console.log(a.name);
a.show();
a.age = -1;
a.type = "Cat";

// console.log(a.color);
// console.log(a._age);

const c = new Cat("小猫", "花色", 2, "Cat");
console.log(c.name);
c.info();

```

访问器属性 如果有set，那么默认get返回具体的类型。

所以本身可选属性这种写法和访问器属性get,set一起写就有逻辑上的冲突。

```typescript
class Animal { 
  private _age?: number;
  // ......其他省略
  get age() {
    return this._age;
  }
  set age(value:number) {
    if (value < 0) throw new Error('年龄不能为负数')
    this._age = value;
  }
}
```

上面的代码就会直接报错：

```shell
不能将类型“number | undefined”分配给类型“number”。
不能将类型“undefined”分配给类型“number”。ts(2322)
```

**修改方式一：**当然就是**去掉`private _age: number;`的可选属性**，因为这本来就是和访问器属性冲突

**修改方式二：** **删除set属性访问器**，如果set不是必要的，去掉set，当然也能避免这种逻辑冲突

**修改方式三：** **在get方法中加入对`undefined`的判断**

```typescript
get age() {
  if(this._age === undefined) throw new Error('年龄未知')
  return this._age;
}
```

**修改方式四：非空断言**

```typescript
get age() {
  return this._age!;
}
```

**修改方式五：**

一般我们都会默认打开`tsconfig.json`的配置属性`"strict": true`，`"strictNullChecks": true`当然也随之开启。既然上面报错**不能将类型“undefined”分配给类型“number”**，其实就是因为把`undefined`作为了单独类型严格检查，当然不能赋值给`number`类型。如果不把`undefined`和`null`作为单独的类型严格检查，当然也就不会报这种错误了。`"strictNullChecks": fasle`即可。不过一般不建议随便修改工程配置项