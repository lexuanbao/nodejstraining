//Tạo class Person với 2 thuộc tính là age, name
function Person( _name, _adress) {
    this.age = 10;
    this.name = _name;
    this.adress = _adress;
}

//Thêm phương thức shout cho class Person
Person.prototype.shout = (msg) => console.log(msg);

//Tạo 1 class Runner
function Runner(){};

//Kế thừa person
Runner.prototype = new Person();
//Runner.prototype = Object.create(Person.prototype); cùi

//Thêm phương thức run cho class Person
Runner.prototype.run = () => console.log("haha run");

//Khởi tạo object
var runner = new Runner();

//Gọi phương thức
console.log(runner.age);
runner.shout("haha shout");
runner.run();