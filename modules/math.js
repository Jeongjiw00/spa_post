// 기본형
// function add(a, b) {
//     return a + b;
// }
// module.exports = add; // 모듈 그 자체를 바로 add함수 할당.

// add가 객체로 됨. 따라서 run.js도 고쳐줘야함 { add : [function ()]}
// exports.add = function add(a, b) {
//   return a + b;  // 모듈을 호출했을때, add키값에는 (a,b){return a+b;} 익명함수가 할당됨.
// };

// 내보낼떄 객체형식으로 내보낼수도 있다.
// function add(a, b) {
//     return a + b;
// }
// module.exports = {add: add}; // 모듈을 호출했을때, add키값에는 add함수가 할당됨.

// 화살표함수 이용
const add = (a, b) => {
    return a + b;
}
exports.add = add; // 모듈을 호출했을떄, add키 값에는 add변수 함수가 가지고 있는 값이 할당된다.