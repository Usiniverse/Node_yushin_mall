// express 패키지 불러옴
const express = require("express");
const connectDB = require("./database/db");
const goodsRouter = require("./router/goods");
// const cartRouter = require("./router/cart");
const userRouter = require("./router/user");
const port = 3000;
const requestMiddleware = require("./middleware/request-log-middleware");

// ===============================
// DB 연결
connectDB();
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));

// Server Application
const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware
app.use(requestMiddleware);

// Router
app.use("/goods", goodsRouter);
app.use("/", userRouter);
// app.use("/cart", cartRouter);s

// ssr 엔진
app.set('view engine', 'ejs'); // ejs 사용을 위해 view engine 에 ejs set
// app.use(express.static(__dirname + '/public'));

app.listen(port, () => {
    console.log(port, "포트로 서버가 켜졌어요!");
});