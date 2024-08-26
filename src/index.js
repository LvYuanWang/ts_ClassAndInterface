"use strict";
class Foo {
    show() {
        console.log('show');
    }
    static info() {
        console.log('info');
    }
}
class Baz {
    name = 'Baz';
    get nameGetter() {
        return this.name;
    }
    method(name) {
        return name;
    }
    show(add) {
        return add;
    }
}
class UserClass {
    id = 1;
    name = 'Jack';
    age = 18;
    get nameGetter() {
        return this.name;
    }
    ;
    method(name) {
        return name;
    }
    show(add) {
        return add;
    }
    type = 'User';
    get() {
        return this.type;
    }
    set(v) {
        this.type = v;
    }
}
class AdminUser {
    id = 1;
    name = 'Jack';
    age = 18;
    gender = "男";
    get nameGetter() {
        return this.name;
    }
    ;
    method(name) {
        return name;
    }
    show(add) {
        return add;
    }
    type = 'User';
    get() {
        return this.type;
    }
    set(v) {
        this.type = v;
    }
}
const user = new AdminUser();
console.log(user.nameGetter);
