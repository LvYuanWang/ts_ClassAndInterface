## 静态成员

在typescript中，你可以使用static关键字来表示一个成员为静态成员

```typescript
class Animal { 
  
  // 静态属性
  static kingdom = "Animal"; 

  // 静态方法
  static showKingdom(): string {
    console.log(Animal.kingdom);
    console.log(this.kingdom);
    return `The kingdom is ${Animal.kingdom}.`;
  }
  ......
}
const s = Animal.showKingdom();
console.log(s)  
```

在静态方法中虽然也能使用this，但是静态方法中的`this` 指的不是类的实例，而是类本身。这意味着在静态方法内部，`this` 指向的是类的构造函数，而不是类的实例。

其实如果我们把target降低到ES5以下(**注意**：降低target，如果没有lib的话，默认支持的语法同样也会降级，`#`这种写法肯定就不支持了)，观察编译之后的js文件，你就会发现**静态成员直接被挂载在函数体上**，而**实例成员挂载在原型上**

```typescript
// 静态方法
Animal.showKingdom = function () {
  console.log(Animal.kingdom);
  console.log(this.kingdom);
  return "The kingdom is ".concat(Animal.kingdom);
};
// 实例方法
Animal.prototype.show = function () {
  console.log(this.name, this.color, this._age);
};
```

## 