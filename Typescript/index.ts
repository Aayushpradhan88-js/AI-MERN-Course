//INSTALLATION STEPTS
/*
STEP1: npm init -y
STEP2: npm i typescript
STEP3: npx tsc --init
*/

//BASIC OF TYPES

//Yo chai already reserved types haru hunxa
/*
let userName: string = "aayush"
let phoneNumber: number = 9800000
let isAuthenticated: boolean = false
let skills: string[] = ["React", "Postgresql", "Nodejs", "GO"]
let skill: number[] = [367, 48945785, 93845]
*/




//type alias & interface - these work is to make our custom types of object values or shape of object 

/*
type User = {
    name: string;
    email: string;
    password: string;
    address?: string
}

const customer: User = {
    name: "aayush",
    email: "aayush@gmail.com",
    password: "aayush12345#"
}

console.log(customer)
*/




//interface-object ko shape define garnu hooooooo........

//EXAMPLE1
/*
interface User {
    name: string;
    email: string;
    password: string;
    address?: string;
    age: number
}

const customer: User = {
    name: "aayush",
    email: "aayush@gmail.com",
    password: "aayush12345#",
    age: 40
}

console.log(customer)
*/

//EXAMPLE-2
/*
interface Person {
    name: string;
}

interface Student1 extends Person {
    age: number
}
interface Student2 extends Student1 {
    address: string
}

const student: Student2 = {
    name: "Typescript",
    address: "kathmandu",
    age: 55
}

*/


//GENERICS

//EXAMPLE1

/*
function getName<T>(str: T): T{
    return str
}

console.log(getName("aayush"))
console.log(getName(["aayush", "kiran"]))
console.log(getName([475645, 123]))
console.log(getName(23))
*/


/*
function getValue(num1: number, num2: number): number {
    return num1 + num2
}

console.log(getValue(2, 3))
console.log(getValue(["2", "3"]))
console.log(getValue("aayush"))
*/

//Example 2

interface Box<kushal> {
    value: kushal
}

const numberBox: Box<number> = {
    value: 100
}
console.log(numberBox)

const stringBox: Box<string> = {
    value: "200"
}

const booleanBox: Box<boolean> = {
    value: false
}