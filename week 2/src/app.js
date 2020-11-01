class Person {
    name;
    age;

    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    getLegal() {
        return this.age > 18;
    }
}

console.log("If person is over 18, it is true: " + new Person('David', 28).getLegal());

