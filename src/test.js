// 对象的混入: 可以直接通过扩展运算符 ... 或者 Object.assign() 方法将两个对象混入一个对象中
// 通过原型的混入
// 通过闭包实现混入

const canEat = {
  eat: function () {
    console.log('eating');
  }
}

const canWalk = {
  walk: function () {
    console.log('walking');
  }
}

const person = { ...canEat, ...canWalk }; // 使用展开运算符将两个对象混入
const person2 = Object.assign({}, canEat, canWalk); // 使用Object.assign()方法将两个对象混入
person.eat(); // eating
person2.walk(); // walking


// 通过原型的混入
class Person {
  constructor(name) {
    this.name = name;
  }
}

Object.assign(Person.prototype, canEat, canWalk);
const person3 = new Person('Joker');
Person.prototype.eat(); // eating
person3.walk(); // walking


// 通过闭包实现混入
function withEating(Class) {
  return class extends Class {
    eat() {
      console.log('eating');
    }
  }
}

function withWalking(Class) {
  return class extends Class {
    walk() {
      console.log('walking');
    }
  }
}

class Dog {
  constructor(name) {
    this.name = name;
  }
}

const EatingAndWalkingPerson = withEating(withWalking(Dog));
const person4 = new EatingAndWalkingPerson('Joker');
person4.eat(); // eating
person4.walk(); // walking
