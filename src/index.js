"use strict";
class Animal {
    name;
    color;
    _age;
    #type;
    constructor(name, color, age, type) {
        this.name = name;
        this.color = color;
        this._age = age;
        this.#type = type;
    }
    show() {
        console.log(this.name, this.color, this._age, this.#type);
    }
}
class Cat extends Animal {
    info() {
        console.log(this.name);
        this.show();
        console.log(this.color);
        this.show();
    }
}
const a = new Animal("小丑", "white", 3, "Dog");
console.log(a.name);
const cat = new Cat("小黑", "咖啡色", 8, "Cat");
console.log(cat.name);
cat.info();
