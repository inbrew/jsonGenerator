const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = 4000;

// 로컬에서만 사용(origin)
app.use(
    cors({
        origin: true,
        credentials: true,
        methods: ["GET", "PUT", "POST", "OPTIONS"],
    })
);

app.use(express.json());
app.use(cookieParser());

// route
const aws = require("./routes/aws");
app.use("/aws", aws);

app.get("/", (req, res) => {
    res.send("This is Json Generator server!");
});

app.listen(PORT, () => {
    console.log(`우리 서버 ${PORT}에서 도는 중, 화이팅!`);
});

module.exports = app;