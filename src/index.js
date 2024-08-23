"use strict";
class Father {
    name;
    constructor(name) {
        this.name = name;
    }
    info() {
        console.log("Father Info");
    }
}
class Child extends Father {
    name;
    age;
    constructor(name, age) {
        super(name);
        this.name = name;
        this.age = age;
    }
    info() {
        console.log("Child Info");
        super.info();
        return "Child Info";
    }
}
const f = new Father('father');
f.info();
const c = new Child('child', 20);
c.info();
