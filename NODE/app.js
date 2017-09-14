// console.time('a')
// var fs = require("fs");
// fs.stat('./hh.txt', (e, s) => {
//     if (e) throw e;
//     fs.unlink('./hh.txt', (e) => {

//     })
// })
// console.timeEnd('a')
// let calc = require("./model/calc");
// let input = process.argv.slice(2);
// let num1 = parseFloat(input[0]);
// let symbol = input[1];
// let num2 = parseFloat(input[2]);
// let count;
// switch (symbol) {
//     case '+':
//         count = calc.add(num1, num2)
//         break;
//     case '-':
//         count = calc.subtract(num1, num2)
//         break;
//     case '*':
//         count = calc.multiply(num1, num2)
//         break;
//     case '/':
//         count = calc.divide(num1, num2)
//         break;
//     default:
//         throw new Error("输入的运算符有误");
//         break;
// }
// console.log(count);

// const fs = require("fs");
// fs.readFile(__dirname + "/model/help.txt", (err, data) => {
//     console.log(data.toString());
// })

// const path = require('path');
// const temp = path.join(__dirname, './model/help.txt');
// console.log(path.basename(temp))
// console.log(path.extname(temp))
// console.log(path.dirname);

const fs = require("fs");
const path = require("path");

// fs.readFile(__dirname + "/gc/万水千山总是情.lrc", (err, data) => {
//     console.log(data.toString())
// })


console.log(path.relative("../", "/../ga/help"))
console.log(path.isAbsolute("c://../appdemo/build"))
console.log(path.join("c://", "haha"))