// 기본형
// const add = require("./math.js");
// console.log(add(10, 30));

// 객체형식으로 내보내진것을 받을떄
// const add = require("./math.js");
// console.log(add.add(10, 30));

// 간단히(객체형식으로 내보내진것을 받을떄)
const {add} = require("./math.js");
console.log(add(10, 30));
