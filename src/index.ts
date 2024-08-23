// 访问器(存取器)属性如果有set, 那么默认get返回具体的类型
// 所以将本身属性可选这种写法和访问器属性get,set一起写就有逻辑冲突

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
    // if (this._age === undefined) throw new Error("年龄未知");
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

const cat = new Animal("Joker", "black", 3, "Dog");
cat.age = 5;
cat.type = "Cat";