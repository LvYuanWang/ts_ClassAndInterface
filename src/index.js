"use strict";
class Animal {
    name;
    color;
    _age;
    #type;
    constructor(name, color, _age, type) {
        this.name = name;
        this.color = color;
        this._age = _age;
        this.#type = type;
    }
    get age() {
        return this._age;
    }
    set age(value) {
        if (value < 0 || value > 150)
            throw new Error("年龄不符合规范...");
        this._age = value;
    }
    get type() {
        return this.#type;
    }
    set type(value) {
        this.#type = value;
    }
    static kingdom = "Animal";
    static showKingdom() {
        console.log(Animal.kingdom);
        return `The kingdom is ${Animal.kingdom}`;
    }
    show() {
        console.log(this.name, this.color, this._age);
    }
}
const cat = new Animal("Joker", "black", 3, "Dog");
cat.age = 5;
cat.type = "Cat";
const k = Animal.showKingdom();
console.log(k);
