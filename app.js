const express = require("express"); // express 라이브러리를 가지고 와서 변수에 넣음
const app = express(); // express를 실행해서 앱객체를 만들어줌.
const port = 3000;

// goods.js에서 router가져옴
const goodsRouter = require("./routes/goods.js");
const cartsRouter = require("./routes/carts.js");
const connect = require("./schemas"); //index.js있어도 상관없음
connect();

//전역미들웨어(app.use) - express.json()를 써야 request 객체 안에있는 req.body를 사용할 수 있음.(모든 코드에서 body-parser등록해서)
app.use(express.json());
app.use("/api", [goodsRouter, cartsRouter]);

app.get("/", (req, res) => {
  res.send("hello world!");
});

// 실제로 앱을 실행하는 부분(3000번 포트로 접속했을 경우만 서버실행)
app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});

//req.body
// app.post("/", (req, res) => {
//   console.log(req.body);

//   res.send("기본 URI에 POST 메서드가 정상적으로 반환되었습니다.");
// });

// //API확인 -req.query
// app.get("/", (req, res) => {
//   console.log(req.query);

//   //   res.send("정상적으로 반환되었습니다.");

//   const obj = {
//     keykey: "value입니다.",
//     "이름입니다.": "이름일까요?",
//   };
//   res.json(obj); // 바로 객체넣어줘도 무관
//   // res.status(400).json(obj); // 400에러가 난 것처럼 코드가 전달됨
// });

// //req.params
// app.get("/:id", (req, res) => {
//   console.log(req.params);

//   res.send(":id URI정상적으로 반환되었습니다.");
// });
