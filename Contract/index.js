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
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// route
const file = require("./routes/file");
const nft = require("./routes/nft");
const address = require("./routes/address");
app.use("/file", file);
app.use("/nft", nft);
app.use("/address", address);

app.get("/", (req, res) => {
    res.send("This is Json Generator server!");
});

app.listen(PORT, () => {
    console.log(`우리 서버 ${PORT}에서 도는 중, 화이팅!`);
});

module.exports = app;