const express = require("express"); // express 라이브러리를 가지고 와서 변수에 넣음
const app = express(); // express를 실행해서 앱객체를 만들어줌.
const port = 3000;

// goods.js에서 router가져옴
const boardsRouter = require("./routes/boards.js");
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
