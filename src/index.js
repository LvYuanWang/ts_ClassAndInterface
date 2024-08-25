"use strict";
class Foo {
    show() {
        console.log('show');
    }
    static info() {
        console.log('static info function');
    }
}
class Baz extends Foo {
    name = 'Baz';
    get nameGetter() {
        return this.name;
    }
    method(name) {
        return name;
    }
}
const baz = new Baz();
baz.show();
Baz.info();
Foo.info();
class Person {
}
class Student {
    name = 'Tom';
    age = 18;
    say() {
        return `Hello, my name is ${this.name}, I'm ${this.age} years old.`;
    }
    ;
    eat() {
        console.log('eat');
    }
}
