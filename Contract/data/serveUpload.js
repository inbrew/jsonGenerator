const fs = require("fs");
const multer = require("multer");
const path = require("path");
const basePath = __dirname;
let base = path.join(basePath, "../../nftData");

// 폴더가 없으면 생성
try {
  fs.readdirSync(base);
} catch (err) {
  console.error("폴더가 없어서 생성합니다.");
  fs.mkdirSync(base);
}

const upload = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, base);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const multerUpload = multer({
  storage: upload,
});

module.exports = { multerUpload };
