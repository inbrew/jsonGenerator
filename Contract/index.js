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

///////////////
const path = require("path");
const basePath = __dirname;
let base = path.join(basePath, "/nftData");
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, base)
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname)
    }
})

const upload = multer({ storage: storage });
app.post('/upload', upload.array('img'), (req, res) => {
    console.log("파일업로드했습니다")
    console.log(req.files);
    res.end()
})
//////////////

// route
const file = require("./routes/file");
app.use("/file", file);

app.get("/", (req, res) => {
    res.send("This is Json Generator server!");
});

app.listen(PORT, () => {
    console.log(`우리 서버 ${PORT}에서 도는 중, 화이팅!`);
});

module.exports = app;